
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

    function addMarker(Player,steps) {
        // if marker exists, do nothing //
        if (playerIcon[steps] != ''){
            return null;
        }
        else{
        playerIcon.splice(steps, 1, Player);
        generateBoard();
        user.turn = !user.turn;
        displayController.checkForWin();
        }
    }
    return {
        playerIcon:playerIcon,
        generateBoard : generateBoard,
        addMarker: addMarker
    };
})();

const Player = (name) => {
    const getName = () => name;
    const turn = () => true;
    const move = (steps) => createGameboard.addMarker(name, steps);
    return {getName, move, turn};
}

var displayController = (() => {
    var gridItem = document.querySelectorAll('[id^="grid"]');

    document.addEventListener('click', function(e){
        // getting grid element from target click // 
        for (i=0; i<gridItem.length; i++){
            // retrieving amount of steps for placing player marker in addMarker function //
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
    function win(){
        console.log("Win!")
    }

    function checkForWin() {

        var winConditions = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ];
        for (var i=0; i<winConditions.length; i++){

            for (var j=0; j<winConditions[i].length-1; j++){
                var markerIndex = winConditions[i][j];
                var checkSquare = createGameboard.playerIcon[markerIndex];
                if (checkSquare === ''){
                    continue;
                }
                else if (checkSquare == createGameboard.playerIcon[markerIndex+1] &&
                    createGameboard.playerIcon[markerIndex+1] == createGameboard.playerIcon[markerIndex-1]){
                    win();
                }
            }
        }
        // if (gridItem[0].innerHTML == gridItem[1].innerHTML && gridItem[1].innerHTML == gridItem[2].innerHTML){
        //     win();
        // }
        // else if (gridItem[3].innerHTML == gridItem[4].innerHTML && gridItem[4].innerHTML == gridItem[5].innerHTML){
        //     win();
        // }
        // else if (gridItem[6].innerHTML == gridItem[7].innerHTML && gridItem[7].innerHTML == gridItem[8].innerHTML){
        //     win();
        // }
        // else if (gridItem[0].innerHTML == gridItem[3].innerHTML && gridItem[6].innerHTML == gridItem[6].innerHTML){
        //     win();
        // }
        // else if (gridItem[1].innerHTML == gridItem[4].innerHTML && gridItem[4].innerHTML == gridItem[7].innerHTML){
        //     win();
        // }
        // else if (gridItem[2].innerHTML == gridItem[5].innerHTML && gridItem[5].innerHTML == gridItem[8].innerHTML){
        //     win();
        // }
        // else if (gridItem[0].innerHTML == gridItem[4].innerHTML && gridItem[4].innerHTML == gridItem[8].innerHTML){
        //     win();
        // }
        // else if (gridItem[2].innerHTML == gridItem[4].innerHTML && gridItem[4].innerHTML == gridItem[6].innerHTML){
        //     win();
        // }

    }
    return {checkForWin : checkForWin};
})();

createGameboard.generateBoard();
const user = Player('x');
const user2 = Player('o');