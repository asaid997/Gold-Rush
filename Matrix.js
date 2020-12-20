/* Write your code below */
class Matrix{
    constructor(x,y){
        this.matrix = this.generateMatrix(x,y)
    }

    generateMatrix(numRows, numColumns) {
        let matrix = []
        
        for (let r = 0; r < numRows; r++) {
            matrix.push([])
            for (let c = 0; c < numColumns; c++) {
                matrix[r].push('E')
            }
        }
        return matrix
    }
    get(x,y){
        if(x > -1 && y > -1 && x < this.matrix.length && y < this.matrix[0].length)
            return this.matrix[x][y]
        return false
    }

    alter(x, y, newValue){
        this.matrix[x][y] = newValue
    }
    printRow(rowNum) {
        for (let i = 0; i < this.matrix[rowNum].length; i++) {
            console.log(this.matrix[rowNum][i])
        }
    }
    printColumn(colNum) {
        for (let i = 0; i < this.matrix.length; i++) {
            console.log(this.matrix[i][colNum])
        }
    }
    print(){
        for(let row of this.matrix)
            console.log(row.toString())
        console.log("---------------------")
    }
    findCoordinate(value){
        for (let y = 0; y < this.matrix.length; y++) 
            for (let x = 0; x < this.matrix[y].length; x++) 
                if(this.matrix[y][x] === value) return {x,y}
    }
    getMatric = () => this.matrix
}
