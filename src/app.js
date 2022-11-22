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
    let wins = 0
    return ({symbol, wins, getDiv})
}

const player1 = Player('X', 'Player1')
const player2 = Player('O', 'Player2')
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
                counter+=1
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

    const clearEventsOnBoard =(() => {
        const board = document.querySelectorAll('.tictac')
        board.forEach( (square) => {
            let newSquare = square.cloneNode(true)
            square.parentNode.replaceChild(newSquare, square)
        })
    })

    const addToArray = (square) => {
        if ((counter % 2) === 0) {
            Gameboard.board[parseInt(square.dataset.id)] = true
        } else {
            Gameboard.board[parseInt(square.dataset.id)] = false
        }
    }

    const checkforTrue = (array) => {
        for (let i = 0; i < array.length; i++) {
            if (array[i] === true) {
                return true
            }
        }
    }
    const check = () => {
        if ((counter % 2) === 0) {
            let o1 = Gameboard.board[0] && Gameboard.board[1] && Gameboard.board[2]
            let o2 = Gameboard.board[3] && Gameboard.board[4] && Gameboard.board[5]
            let o3 = Gameboard.board[6] && Gameboard.board[7] && Gameboard.board[8]
            let o4 = Gameboard.board[0] && Gameboard.board[3] && Gameboard.board[6]
            let o5 = Gameboard.board[1] && Gameboard.board[4] && Gameboard.board[7]
            let o6 = Gameboard.board[2] && Gameboard.board[5] && Gameboard.board[8]
            let o7 = Gameboard.board[2] && Gameboard.board[4] && Gameboard.board[6]
            let o8 = Gameboard.board[0] && Gameboard.board[4] && Gameboard.board[8]
            let checkArray = [o1, o2, o3, o4, o5, o6, o7, o8]
            if (checkforTrue(checkArray)) {
                winDiv.textContent = 'Player 1 Won!'
                clearEventsOnBoard()
            }
        } else if ((counter % 2) != 0) {
            let o1 = !Gameboard.board[0] && !Gameboard.board[1] && !Gameboard.board[2]
            let o2 = !Gameboard.board[3] && !Gameboard.board[4] && !Gameboard.board[5]
            let o3 = !Gameboard.board[6] && !Gameboard.board[7] && !Gameboard.board[8]
            let o4 = !Gameboard.board[0] && !Gameboard.board[3] && !Gameboard.board[6]
            let o5 = !Gameboard.board[1] && !Gameboard.board[4] && !Gameboard.board[7]
            let o6 = !Gameboard.board[2] && !Gameboard.board[5] && !Gameboard.board[8]
            let o7 = !Gameboard.board[2] && !Gameboard.board[4] && !Gameboard.board[6]
            let o8 = !Gameboard.board[0] && !Gameboard.board[4] && !Gameboard.board[8]
            let checkArray = [o1, o2, o3, o4, o5, o6, o7, o8]
            if (checkforTrue(checkArray)) {
                winDiv.textContent = 'Player 2 Won!'
                clearEventsOnBoard()
            }
        }
        // else if (counter === 9) {
        //     clearEventsOnBoard()
        // }
    }

    return {start, clearEventsOnBoard}
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
    ControlGame.start()
}

// MAIN
ControlGame.start()
