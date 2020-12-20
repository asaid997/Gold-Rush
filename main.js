const renderer = new Renderer()

let goldRush
let board


const render = () => {
    renderer.renderBoard(goldRush.getGameBoardForRender())
    renderer.renderPlayerCoins(goldRush.getCoins())
}
$('#generate').on('click', function () {
    const rows = $('#rows').val()
    const cols = $('#cols').val()

    goldRush = new GoldRush(rows, cols)
    goldRush.loadGame()
    render()

})

const movePlayer = (player, direction) => {
    if (goldRush) {
        const ifFinished = goldRush.movePlayer(player, direction)
        render()
        ifFinished ? $('.btn-floating').addClass('pulse') : {}
    }
}

$('body').keypress(function (event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '119')
        movePlayer('1', 'up')
    if (keycode == '115')
        movePlayer('1', 'down')
    if (keycode == '100')
        movePlayer('1', 'right')
    if (keycode == '97')
        movePlayer('1', 'left')


    if (keycode == '105')
        movePlayer('2', 'up')
    if (keycode == '107')
        movePlayer('2', 'down')
    if (keycode == '108')
        movePlayer('2', 'right')
    if (keycode == '106')
        movePlayer('2', 'left')

})