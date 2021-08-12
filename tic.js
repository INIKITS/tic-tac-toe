
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
        // if marker exists, do nothing //
        if (playerIcon[steps] != ''){
            return null;
        }
        else{
        playerIcon.splice(steps, 1, Player);
        generateBoard();
        user.turn = !user.turn;
        }
    }
    return {
        generateBoard : generateBoard,
        addMove: addMove
    };
})();

const Player = (name) => {
    const getName = () => name;
    const turn = () => true;
    const move = (steps) => createGameboard.addMove(name, steps);
    return {getName, move, turn};
}

var displayController = (() => {
    document.addEventListener('click', function(e){

        // getting grid element from target click // 
        var gridItem = document.querySelectorAll('[id^="grid"]');
        for (i=0; i<gridItem.length; i++){
            // retrieving amount of steps for placing player marker in next function //
            var steps = gridItem[i].id.substr(5) - 1;
            if (e.target.id == gridItem[i].id){
                if (user.turn){
                    user.move(steps);
                }
                else {
                    user2.move(steps);
                }
            }
        }
    })
})();

createGameboard.generateBoard();
const user = Player('x');
const user2 = Player('o');