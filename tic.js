
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
        displayController.checkForDraw();
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
    const hasWon = () => false;
    const move = (steps) => createGameboard.addMarker(name, steps);
    return {getName, move, hasWon, turn};
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
    function win(name){
        console.log(name + " Wins!");
    }

    function draw(){
        console.log('Nobody wins!');
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
            var x = 0;
            var o = 0;

            for (var j=0; j<winConditions[i].length; j++){
                // debugger;
                var markerIndex = winConditions[i][j];
                var checkSquare = createGameboard.playerIcon[markerIndex];
                if (checkSquare === ''){
                    continue;
                }
                else if (checkSquare == 'x' ? x += 1 : o += 1){
                    if (x === 3){
                        user.hasWon = !user.hasWon;
                        win(user.getName());
                    }
                    else if (o === 3) {
                        user2.hasWon = !user2.hasWon;
                        win(user2.getName());
                    }
                }
            }
        }    
    }

    function checkForDraw() {
        var boardFull = 0;
        // debugger;
        for (var i = 0; i<createGameboard.playerIcon.length; i++){
            if (createGameboard.playerIcon[i] === '') {
                continue;
            }
            else if (user.hasWon || user2.hasWon){
                break;
            }
            else {
                boardFull +=1;
                if (boardFull == 9){
                    draw();
                }
            }
        }
    }

    return {
        checkForWin : checkForWin,
        checkForDraw : checkForDraw
    };
})();

createGameboard.generateBoard();
const user = Player('x');
const user2 = Player('o');