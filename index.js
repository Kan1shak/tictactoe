const makePlayer = (symbol) => {
    const getSymbol = () => symbol;
    return {getSymbol}
}

const gameBoard = (() => {
    const boardEntries = ['','','','','','','','',''];
    const updateBoard = (index,symbol) => {
        boardEntries[index] = symbol;
        displayController.updateBoardDOM();
    }
    const getBoardStatus = () => {
        return boardEntries;
    }
    return {getBoardStatus, updateBoard};
})();

const displayController = (() => {
    const boxes = document.querySelectorAll('.box');
    const resultContainer = document.querySelector('.result');
    boxes.forEach((box,index) => box.addEventListener('click', () => gameController.playTurn(index)));
    const updateBoardDOM = () => {
        for (let i = 0; i < boxes.length; ++i) {
            boxes[i].textContent = gameBoard.getBoardStatus()[i];
        }
    }
    const getResultContainer = () => {
        return resultContainer.textContent;
    }

    const setResultContainer = (content) => {
        resultContainer.textContent = content
    }
    return {updateBoardDOM, getResultContainer, setResultContainer}
})();

const gameController = (() => {
    const player1 = makePlayer('X');
    const player2 = makePlayer('O');
    let currentPlayer = player1;
    const changeTurn = () => {
        if (currentPlayer === player1){
            currentPlayer = player2;
        }
        else {
            currentPlayer = player1;
        }
    }
    const playTurn = (index) => {
        if (gameBoard.getBoardStatus()[index] === '' && !displayController.getResultContainer().includes('winner')) {
            gameBoard.updateBoard(index, currentPlayer.getSymbol());
            changeTurn();
            displayController.setResultContainer(checkWinner(gameBoard.getBoardStatus()));
        }
    }
    const checkWinner = (boardEntries) => {
        function sameCharacters(string){
            for (let i = 0; i < string.length; i++) {
                if (string[i] != string[0]){
                    return false;
                }
            }
            return true;
        }
        const winner = '';
        //check horizontal
        for (let i = 0; i < boardEntries.length; i = i + 3) {
            const tempString = boardEntries.slice(i, i+3).join('');
            if (sameCharacters(tempString) && tempString.length === 3) {
                return `The winner is ${tempString[0]}`
            };
        }
        //check vertical
        for (let i = 0; i < 3; i++) {
            let tempString = '';
            for (let j = i; j < boardEntries.length; j = j + 3) {
                tempString += boardEntries[j];
            }
            if (sameCharacters(tempString) && tempString.length === 3) {
                return `The winner is ${tempString[0]}`;
            };
        }
        //check diagonally left-right
        {
            let tempString = '';
            for (let j = 0; j < boardEntries.length; j = j + 4) {
                tempString += boardEntries[j];
            }
            if (sameCharacters(tempString) && tempString.length === 3) {
                return `The winner is ${tempString[0]}`;
            };
        }
        //check diagonally right-left
        {
            let tempString = '';
            for (let j = 2; j < boardEntries.length - 1; j = j + 2) {
                tempString += boardEntries[j];
            }
            if (sameCharacters(tempString) && tempString.length === 3) {
                return `The winner is ${tempString[0]}`;
            };
        }
        if (boardEntries.join('').length === 9){
            return "Its a tie!";
        } else return 'Result Pending!';
    }
    return {playTurn}
})();