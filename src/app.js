// This is where we store the gameboard and its state, using an array
const Gameboard = (() => {
    let board = new Array(9)
    return{board}
})();

// this is where we have the players information stored, as an object
const Player = (symbol, id) => {
    const getDiv = () => {
        let div = document.getElementById(id)
        return div
    }
    let won = [true]
    return ({symbol, won, getDiv})
}

const player1 = Player('X', 'Player1')
const player2 = Player('O', 'Player2') // make the player objects
let counter = 0

// ControlGame module, that controls the flow of the game
const ControlGame = ((player1, player2, Gameboard) => {
    const winDiv = document.getElementById('Results')
    const start = () => {
        const board = document.querySelectorAll('.tictac')
        board.forEach( (square) => {
            square.addEventListener('click', () => {
                addToArray(square)
                doStart(square)
                check()
            })
        })
    }
    const doStart = (square) => {
        if (square.textContent === '') {
            if ((counter % 2) === 0) {
                square.textContent = player1.symbol
    
            } else {
                square.textContent = player2.symbol
            } player1.getDiv().classList.toggle('toggle')
            player2.getDiv().classList.toggle('toggle')
        } 
    }
    
    const clearEventsOnBoard =(() => { // clears events on the board so that every click does not trigger according to the amount of games there has been played
        const board = document.querySelectorAll('.tictac')
        board.forEach( (square) => {
            let newSquare = square.cloneNode(true)
            square.parentNode.replaceChild(newSquare, square)
        })
    })

    const addToArray = (square) => { // adds to the array at the index of the dataset of the board!
        if ((counter % 2) === 0) {
            Gameboard.board[parseInt(square.dataset.id)] = player1.symbol
        } else {
            Gameboard.board[parseInt(square.dataset.id)] = player2.symbol
        }
    }

    const checkforTrue = (array) => { // checks if an array is true
        for (let i = 0; i < array.length; i++) {
            if (array[i] === true) {
                return true
            }
        }
    }

    const makeCheckedArray1 = () => { // strict comparison for each slot
        const array = []
        if (Gameboard.board[0] === player1.symbol && Gameboard.board[1] === player1.symbol  && Gameboard.board[2] === player1.symbol) {
            array.push(true)
        } else if (Gameboard.board[3] === player1.symbol && Gameboard.board[4] === player1.symbol && Gameboard.board[5] === player1.symbol) {
            array.push(true)
        } else if (Gameboard.board[6] === player1.symbol && Gameboard.board[7] === player1.symbol && Gameboard.board[8] === player1.symbol) {
            array.push(true)
        } else if (Gameboard.board[0] === player1.symbol && Gameboard.board[3] === player1.symbol && Gameboard.board[6] === player1.symbol) {
            array.push(true)
        } else if (Gameboard.board[1] === player1.symbol && Gameboard.board[4] === player1.symbol && Gameboard.board[7] === player1.symbol) {
            array.push(true)
        } else if (Gameboard.board[2] === player1.symbol && Gameboard.board[5] === player1.symbol && Gameboard.board[8] === player1.symbol) {
            array.push(true)
        } else if (Gameboard.board[0] === player1.symbol && Gameboard.board[4] === player1.symbol && Gameboard.board[8] === player1.symbol) {
            array.push(true)
        } else if (Gameboard.board[2] === player1.symbol && Gameboard.board[4] === player1.symbol && Gameboard.board[6] === player1.symbol) {
            array.push(true)
        } return array
    }
    const makeCheckedArray2 = () => {
        const array = []
        if (Gameboard.board[0] === player2.symbol && Gameboard.board[1] === player2.symbol  && Gameboard.board[2] === player2.symbol) {
            array.push(true)
        } else if (Gameboard.board[3] === player2.symbol && Gameboard.board[4] === player2.symbol && Gameboard.board[5] === player2.symbol) {
            array.push(true)
        } else if (Gameboard.board[6] === player2.symbol && Gameboard.board[7] === player2.symbol && Gameboard.board[8] === player2.symbol) {
            array.push(true)
        } else if (Gameboard.board[0] === player2.symbol && Gameboard.board[3] === player2.symbol && Gameboard.board[6] === player2.symbol) {
            array.push(true)
        } else if (Gameboard.board[1] === player2.symbol && Gameboard.board[4] === player2.symbol && Gameboard.board[7] === player2.symbol) {
            array.push(true)
        } else if (Gameboard.board[2] === player2.symbol && Gameboard.board[5] === player2.symbol && Gameboard.board[8] === player2.symbol) {
            array.push(true)
        } else if (Gameboard.board[0] === player2.symbol && Gameboard.board[4] === player2.symbol && Gameboard.board[8] === player2.symbol) {
            array.push(true)
        } else if (Gameboard.board[2] === player2.symbol && Gameboard.board[4] === player2.symbol && Gameboard.board[6] === player2.symbol) {
            array.push(true)
        } return array
    }

    const check = () => { // check if the player has won at every point of the game
        counter += 1
        if ((counter % 2) != 0) {
            if ( checkforTrue(makeCheckedArray1()) ) {
                winDiv.textContent = 'You Won, X!~'
                player1.won[0] = false
                clearEventsOnBoard()
            } 
        } else if ((counter % 2) === 0) {
            if ( checkforTrue(makeCheckedArray2()) ) {
                winDiv.textContent = 'You Won, O!~'
                player2.won[0] = false
                clearEventsOnBoard()
            } 
        } else if (counter === 9) {
            console.log('You tied! Reset the game')
            clearEventsOnBoard()
        }
    }

    return {start, clearEventsOnBoard, winDiv}
})(player1, player2, Gameboard)

// reset function button call
const reset = () => {
    const board = document.querySelectorAll('.tictac')
    board.forEach( btn => {
        btn.textContent = ''
        if ((counter % 2) != 0) {
            player1.getDiv().classList.toggle('toggle')
            player2.getDiv().classList.toggle('toggle')
        }
        counter = 0
    })
    ControlGame.winDiv.textContent  = ''
    player1.won[0] = true
    player2.won[0] = true
    Gameboard.board = new Array(9)
    ControlGame.clearEventsOnBoard()
    ControlGame.start()
}

// MAIN
ControlGame.start()
