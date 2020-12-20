class Renderer{
    constructor(){
        const source = $('#board-template').html();
        this._boardTemplate = Handlebars.compile(source);
        
        this.hostContainer = $('#board')

        Handlebars.registerHelper('populate', val => {
            if(val === 'B')
                return this.block_el('btn-small orange darken-4 transparent-text')
            if(val === '1')
                return this.el('btn-floating  waves-effect waves-light blue darken-3')
            if(val === '2')
                return this.el('btn-floating waves-effect waves-light red darken-3')
            if(val === 'C')
                return this.el('btn-floating btn-small yellow ')
            return this.el('btn-floating transparent btn-medium z-depth-0')
        })
    }
    
    el = classs => new Handlebars.SafeString(`<div class="${classs}"></div>`)
    block_el = classs => new Handlebars.SafeString(`<div class="${classs}">-------------</div>`)

    _handleBarAppender = (elementToAppendTo, Template, data) => {
        let newHTML = Template(data);
        elementToAppendTo.empty().append(newHTML);
    }

    renderBoard = (board) => this._handleBarAppender(this.hostContainer, this._boardTemplate, board)

    renderPlayerCoins = playerCoins => {
        $('#player1-score').html(` ${playerCoins['1']*20}`)
        $('#player2-score').html(` ${playerCoins['2']*20}`)
    }
}