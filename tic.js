
var createGameboard = (() => {
    var playerIcon = ['','','','','','','','',''];
    var gameBoard = document.getElementsByClassName('gameboard');

    function generateBoard(){
        for (var i = 0; i < gameBoard.length; i++){
            if (!playerIcon[i]){
                gameBoard[i].innerHTML = '';
            } 
            else{
                gameBoard[i].innerHTML = playerIcon[i];
            }
        }
    }
    function addMove(Player,steps) {
        // debugger;
        playerIcon.splice(steps-1, 1, Player);
        generateBoard();
    }
    return {
        generateBoard : generateBoard,
        addMove: addMove
    };

})();

const Player = (name) => {
    const getName = () => name;
    const move = (steps) => createGameboard.addMove(name, steps);
    return {getName, move};
}




var displayController = (() => {
    document.addEventListener('click', function(e){
        var gridItem = document.querySelectorAll('[id^="grid"]');
        console.log(gridItem);
        console.log(e.target.id);
        for (i=0; i<gridItem.length; i++){
            var steps = gridItem[i].id.substr(5);
            if (e.target.id == gridItem[i].id){
                // debugger;
                console.log(e.target);
                user.move(steps);
            }
        }
    })
})();

createGameboard.generateBoard();
const user = Player('x');
const user2 = Player('o');