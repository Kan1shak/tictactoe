const makePlayer = (symbol) => {
    const getSymbol = () => symbol;
    return {getSymbol}
}

const gameBoard = (() => {
    let _boardEntries = ['','','','','','','','',''];
    const updateBoard = (index,symbol) => {
        _boardEntries[index] = symbol;
        displayController.updateBoardDOM();
    }
    const getBoardStatus = () => {
        return _boardEntries;
    }
    const reset = () => {
        _boardEntries = ['','','','','','','','',''];
        gameController.resetCurrentPlayerSymbol();
        displayController.setResultContainer(`Its Player ${gameController.getCurrentPlayerSymbol()}'s Turn`);
        displayController.updateBoardDOM();
        displayController.setResultCSS(gameController.getFinalWinner());
        gameController.resetFinalWinner();
    }
    return {getBoardStatus, updateBoard,reset};
})();

const displayController = (() => {
    const _boxes = document.querySelectorAll('.box');
    const _resultContainer = document.querySelector('.result');
    const _resetButton = document.getElementById('reset');
    _boxes.forEach((box,index) => box.addEventListener('click', () => gameController.playTurn(index)));
    _resetButton.addEventListener('click', () => gameBoard.reset());
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
    setTimeout(() => setResultContainer(`Its Player ${gameController.getCurrentPlayerSymbol()}'s Turn`), 0);
    const setResultCSS = (winningArr) => {
        _boxes.forEach((box,index)=> {
            if (index === winningArr[0] || index === winningArr[1] || index === winningArr[2]) {
                box.classList.toggle('win-combination');
            }
        });
    }
    return {updateBoardDOM, getResultContainer, setResultContainer,setResultCSS}
})();

const gameController = (() => {
    const _player1 = makePlayer('X');
    const _player2 = makePlayer('O');
    let _currentPlayer = _player1;
    let finalWinner;
    const _changeTurn = () => {
        if (_currentPlayer === _player1){
            _currentPlayer = _player2;
        }
        else {
            _currentPlayer = _player1;
        }
    }
    const playTurn = (index) => {
        if (gameBoard.getBoardStatus()[index] === '' && !displayController.getResultContainer().includes('Won!')) {
            gameBoard.updateBoard(index, _currentPlayer.getSymbol());
            _changeTurn();
            const gameStatus = _checkWinner(gameBoard.getBoardStatus());
            displayController.setResultContainer(gameStatus[0]);
            if (gameStatus[0] !='Result Pending!') {
                const winningCombination = gameStatus[1];
                finalWinner = winningCombination;
                displayController.setResultCSS(winningCombination);
            }
        }
    }
    const getFinalWinner = () => finalWinner;
    const resetFinalWinner = () => finalWinner = '';
    const getCurrentPlayerSymbol = () => _currentPlayer.getSymbol();
    const resetCurrentPlayerSymbol = () => _currentPlayer = _player1
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
        if (boardEntries.join('').length >= 5) {
                    //check horizontal
        for (let i = 0; i < boardEntries.length; i = i + 3) {
            const tempString = boardEntries.slice(i, i+3).join('');
            if (_sameCharacters(tempString) && tempString.length === 3) {
                return [`Player ${tempString[0]} Won!`,[i,i+1,i+2]];
            };
        }
        //check vertical
        for (let i = 0; i < 3; i++) {
            let tempString = '';
            for (let j = i; j < boardEntries.length; j = j + 3) {
                tempString += boardEntries[j];
            }
            if (_sameCharacters(tempString) && tempString.length === 3) {
                return [`Player ${tempString[0]} Won!`, [i,i+3,i+6]];
            };
        }
        //check diagonally left-right
        {
            let tempString = '';
            for (let j = 0; j < boardEntries.length; j = j + 4) {
                tempString += boardEntries[j];
            }
            if (_sameCharacters(tempString) && tempString.length === 3) {
                return [`Player ${tempString[0]} Won!`,[0,4,8]];
            };
        }
        //check diagonally right-left
        {
            let tempString = '';
            for (let j = 2; j < boardEntries.length - 1; j = j + 2) {
                tempString += boardEntries[j];
            }
            if (_sameCharacters(tempString) && tempString.length === 3) {
                return [`Player ${tempString[0]} Won!`,[2,4,6]];
            };
        }
        if (boardEntries.join('').length === 9){
            return ["Its a tie!",0];
        } else return [`Its Player ${_currentPlayer.getSymbol()}'s Turn`,''];
        }
        else return [`Its Player ${_currentPlayer.getSymbol()}'s Turn`,''];
    }
    return {playTurn,getFinalWinner,resetFinalWinner,getCurrentPlayerSymbol,resetCurrentPlayerSymbol}
})();