const gameBoard = (() => {
    const boardEntries = ['','','','','','','','',''];
    const boxes = document.querySelectorAll('.box');
    const resultContainer = document.querySelector('.result');
    const makePlayer = (playerName, playerSymbol) => {
        return {name:playerName, symbol:playerSymbol}
    }
    const player1 = makePlayer('You', 'X');
    const player2 = makePlayer('Computer', 'O');
    let currentPlayer = player1;
    const updateBoardDOM = () => {
        for (let i = 0; i < boxes.length; ++i) {
            boxes[i].textContent = boardEntries[i];
        }
    }
    const updateBoard = (index,symbol) => {
        boardEntries[index] = symbol;
        updateBoardDOM();
    }
    const getBoardStatus = () => {
        return boardEntries;
    }
    const changeTurn = () => {
        if (currentPlayer === player1){
            currentPlayer = player2;
        }
        else {
            currentPlayer = player1;
        }
    }
    const playTurn = (index) => {
        if (boardEntries[index] === '' && !resultContainer.textContent.includes('winner')) {
            updateBoard(index, currentPlayer.symbol);
            changeTurn();
            resultContainer.textContent = (checkWinner(boardEntries));
        }
    }
    boxes.forEach((box,index) => box.addEventListener('click', () => playTurn(index)));
    return {getBoardStatus};
})();


function checkWinner(boardEntries) {
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
    //check diagonally
    {
        let tempString = '';
        for (let j = 0; j < boardEntries.length; j = j + 4) {
            tempString += boardEntries[j];
        }
        if (sameCharacters(tempString) && tempString.length === 3) {
            return `The winner is ${tempString[0]}`;
        };
    }
    //check diagonally
    {
        let tempString = '';
        for (let j = 2; j < boardEntries.length - 1; j = j + 2) {
            tempString += boardEntries[j];
        }
        console.log(tempString);
        if (sameCharacters(tempString) && tempString.length === 3) {
            return `The winner is ${tempString[0]}`;
        };
    }
    if (boardEntries.join('').length === 9){
        return "Its a tie!";
    } else return 'Result Pending!';
}