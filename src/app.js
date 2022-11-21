// This is where we store the gameboard and its state, using an array
const Gameboard = (() => {
    const board = []
    return({board})
})();

// this is where we have the players information stored, as an object
const Player = (symbol, id) => {
    const getDiv = () => {
        let div = document.getElementById(id)
        return div
    }
    let wins = 0
    return ({symbol, wins, getDiv})
}

const player1 = Player('X', 'Player1')
const player2 = Player('O', 'Player2')

// ControlGame module, that controls the flow of the game
const ControlGame = ((player1, player2, Gameboard) => {
    const start = () => {
        const board = document.querySelectorAll('.tictac')
        board.forEach( (square) => {
            square.addEventListener('click', () => {
                doStart(square)
            })
        })
    }
    const doStart = (square) => {
        square.textContent = player1.symbol
    }

    const clearEventBoard =(() => {
        const board = document.querySelectorAll('.tictac')
        board.forEach( (square) => {
            let newSquare = square.cloneNode(true)
            newSquare.textContent = ''
            square.parentNode.replaceChild(newSquare, square)
        })
    })
    return {start, clearEventBoard}
})(player1, player2, Gameboard)

ControlGame.start()
