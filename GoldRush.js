class GoldRush{
    constructor(rows,cols){
        this.row = rows,this.col = cols
        this.gameBoard = new Matrix(rows,cols)
        this.availableEntries = new Matrix(rows,cols)
        this.fillAvailableEntries(rows,cols)
        this.coins = 0
        this.playersLocation = {}
        this.playersCoins = {}
    }

    cellEntries(row,col){
        const top = this.availableEntries.get(row-1,col) ? 1 : 0
        const right = this.availableEntries.get(row,col+1) ? 1 : 0
        const bottom = this.availableEntries.get(row+1,col) ? 1 : 0
        const left = this.availableEntries.get(row,col-1) ? 1 : 0
        const sum = top + right + bottom + left
        return sum
    }
    fillAvailableEntries(rows,cols){
        for (let r = 0; r < rows; r++) 
            for (let c = 0; c < cols; c++) 
                this.availableEntries.alter(r,c,this.cellEntries(r,c))
    }

    getRandom = () => Math.floor(Math.random() * 100) + 1; 
    doesntBlock(r,c){
        const threshold = 1

        const top = this.availableEntries.get(r-1,c)
        const right = this.availableEntries.get(r,c+1)
        const bottom = this.availableEntries.get(r+1,c)
        const left = this.availableEntries.get(r,c-1)

        // console.log(r,c,top,right,bottom,left)

        const topBool = (top === threshold || !top) ? false : true
        const rightBool = (right === threshold || !right) ? false : true
        const bottomBool = (bottom === threshold || !bottom) ? false : true
        const leftBool = (left === threshold || !left) ? false : true

        // console.log(topBool,rightBool,bottomBool,leftBool)

        const ifDoesntBlock = topBool && rightBool && bottomBool && leftBool

        if(ifDoesntBlock){
            top ? this.availableEntries.alter(r-1,c,top-1) : {}
            right ? this.availableEntries.alter(r,c+1,right-1) : {}
            bottom ? this.availableEntries.alter(r+1,c,bottom-1) : {}
            left ? this.availableEntries.alter(r,c-1,left-1) : {}
            this.availableEntries.alter(r,c,false)
        }

        return ifDoesntBlock
    }
    addBlock(r,c){
        if(this.doesntBlock(r,c))
            this.gameBoard.alter(r,c,'B')
    }

    fillCell(r,c){
        const rand = this.getRandom()
        if(rand < 65){
            this.coins++
            this.gameBoard.alter(r,c,'C')
        }
        else if(rand < 90){
            this.addBlock(r,c)
        }
    }
    loadGame(){
        this.playersLocation['1'] = {r: 0, c:0}
        this.playersLocation['2'] = {r: this.row-1, c: this.col-1}

        this.playersCoins['1'] = 0
        this.playersCoins['2'] = 0

        this.gameBoard.alter(0,0,'1')
        this.gameBoard.alter(this.row-1,this.col-1,'2')
        
        for (let r = 0; r < this.row; r++) 
            for (let c = 0; c < this.col; c++) 
                if(!(r == 0 && c== 0) && !(r == this.row-1 && c == this.col-1))
                    this.fillCell(r,c)
        
    }

    getGameBoard = () => this.gameBoard
    getGameBoardForRender = () => { return {board: this.gameBoard.getMatric() } }
    getCoins = () => this.playersCoins

    newLocation(r,c,direction){
        if(direction == "left")
            --c
        else if(direction == "right")
            ++c
        else if(direction == "up")
            --r
        else
            ++r
        const newLocation = this.gameBoard.get(r,c)
        if(newLocation && newLocation !== '1' && newLocation !== '2' && newLocation !== 'B')
            return {r,c}
        return false
    }
    movePlayer(player,direction){
        if(this.coins > 0){
            const r = this.playersLocation[player].r
            const c = this.playersLocation[player].c
            const newL = this.newLocation(r,c,direction)
            if(newL){
                const newLVal = this.gameBoard.get(newL.r,newL.c)
                newLVal === 'C' ? this.coins-- : {}
                newLVal === 'C' ? this.playersCoins[player]++ : {}
                this.gameBoard.alter(r,c,'E')
                this.gameBoard.alter(newL.r,newL.c,player)
                this.playersLocation[player].r = newL.r
                this.playersLocation[player].c = newL.c
            }
        }
        return this.coins === 0 ? true : false
    }
}