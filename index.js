
const gameBoard = (() => {
    const boardEntries = ['','','','','','','','',''];
    const boxes = document.querySelectorAll('.box');
    boxes.forEach((box) => {
        box.addEventListener('click', ()=> {
            console.log('clicked!');
        });
    });
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
        return {boardEntries};
    }
    return {updateBoard,getBoardStatus};
})();
