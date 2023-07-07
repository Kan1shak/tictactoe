const makePlayer = (symbol) => {
    const getSymbol = () => symbol;
    return {getSymbol}
}

const gameBoard = (() => {
    const _boardEntries = ['','','','','','','','',''];
    const updateBoard = (index,symbol) => {
        _boardEntries[index] = symbol;
        displayController.updateBoardDOM();
    }
    const getBoardStatus = () => {
        return _boardEntries;
    }
    return {getBoardStatus, updateBoard};
})();

const displayController = (() => {
    const _boxes = document.querySelectorAll('.box');
    const _resultContainer = document.querySelector('.result');
    _boxes.forEach((box,index) => box.addEventListener('click', () => gameController.playTurn(index)));
    const updateBoardDOM = () => {
        for (let i = 0; i < _boxes.length; ++i) {
            _boxes[i].textContent = gameBoard.getBoardStatus()[i];
        }
    }
    const getResultContainer = () => {
        return _resultContainer.textContent;
    }

    const setResultContainer = (content) => {
        _resultContainer.textContent = content
    }
    return {updateBoardDOM, getResultContainer, setResultContainer}
})();

const gameController = (() => {
    const _player1 = makePlayer('X');
    const _player2 = makePlayer('O');
    let _currentPlayer = _player1;
    const _changeTurn = () => {
        if (_currentPlayer === _player1){
            _currentPlayer = _player2;
        }
        else {
            _currentPlayer = _player1;
        }
    }
    const playTurn = (index) => {
        if (gameBoard.getBoardStatus()[index] === '' && !displayController.getResultContainer().includes('winner')) {
            gameBoard.updateBoard(index, _currentPlayer.getSymbol());
            _changeTurn();
            displayController.setResultContainer(_checkWinner(gameBoard.getBoardStatus()));
        }
    }
    const _checkWinner = (boardEntries) => {
        function _sameCharacters(string){
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
            if (_sameCharacters(tempString) && tempString.length === 3) {
                return `The winner is ${tempString[0]}`
            };
        }
        //check vertical
        for (let i = 0; i < 3; i++) {
            let tempString = '';
            for (let j = i; j < boardEntries.length; j = j + 3) {
                tempString += boardEntries[j];
            }
            if (_sameCharacters(tempString) && tempString.length === 3) {
                return `The winner is ${tempString[0]}`;
            };
        }
        //check diagonally left-right
        {
            let tempString = '';
            for (let j = 0; j < boardEntries.length; j = j + 4) {
                tempString += boardEntries[j];
            }
            if (_sameCharacters(tempString) && tempString.length === 3) {
                return `The winner is ${tempString[0]}`;
            };
        }
        //check diagonally right-left
        {
            let tempString = '';
            for (let j = 2; j < boardEntries.length - 1; j = j + 2) {
                tempString += boardEntries[j];
            }
            if (_sameCharacters(tempString) && tempString.length === 3) {
                return `The winner is ${tempString[0]}`;
            };
        }
        if (boardEntries.join('').length === 9){
            return "Its a tie!";
        } else return 'Result Pending!';
    }
    return {playTurn}
})();