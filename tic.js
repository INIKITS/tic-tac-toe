
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

    function clearBoard(){
            playerIcon.splice(0);
            generateBoard();
    }

    function addMarker(Player,steps) {
        // if marker exists, do nothing //
        if (playerIcon[steps] != ''){
            if(user2.isAi){
                displayController.aiTakeTurn()
            }
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
        gameBoard:gameBoard,
        playerIcon:playerIcon,
        clearBoard:clearBoard,
        generateBoard : generateBoard,
        addMarker: addMarker
    };
})();

const Player = (name) => {
    const getName = () => name;
    const isAi = () => false;
    const turn = () => true;
    const hasWon = () => false;
    const move = (steps) => createGameboard.addMarker(name, steps);
    return {getName, isAi, move, hasWon, turn};
}

const choosePlayer = (() => {
    document.addEventListener('click', player2);
    var choosePlayerDiv = document.getElementById('p2-select');
    var gameboardBackground = document.getElementById('gameboard-background');

    function player2(e){
        if (e.target.id == 'ai-button'){
            user2.isAi = true;
            console.log(user2.isAi);
            choosePlayerDiv.style.display = 'none';
            gameboardBackground.style.display = 'grid';


        }
        else if(e.target.id == 'human-button'){
            user2.isAi=false;
            choosePlayerDiv.style.display = 'none';
            gameboardBackground.style.display = 'grid';
            console.log(user2.isAi);
        }
    }
})();

var displayController = (() => {
    var gridItem = document.querySelectorAll('[id^="grid"]');
    var canMove = true;



    document.addEventListener('click', takeTurn)

        function takeTurn(e){
        // getting grid element from target click // 
        for (i=0; i<gridItem.length; i++){
            // retrieving amount of steps for placing player marker in addMarker function //
            var steps = gridItem[i].id.substr(5) - 1;
            if (e.target.id == gridItem[i].id){
                if (user.turn){
                    user.move(steps);
                    // document.removeEventListener('click', takeTurn);
                    if (user2.isAi){
                        setTimeout(() => {aiTakeTurn();}, 500);
                    }
                }
                else {
                    user2.move(steps);
                }
            }
        }
    }

    function aiTakeTurn(){
        var randomSquare = Math.floor(Math.random() * 9);
        user2.move(randomSquare);
        console.log(randomSquare);
    }

    function win(name){
        var restartTitle = document.getElementById('restart-title');

        restartTitle.innerHTML = name + ' wins!';
        user2.isAi = false;
        gameBoardDisappear();
        restartCard(name);
        toggleMove();

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

    function gameBoardDisappear(){
        var gameboardBackground = document.getElementById('gameboard-background');

        for (var i = 0; i<createGameboard.gameBoard.length; i++){
            createGameboard.gameBoard[i].classList.add('grid-disappear');
        }
        setTimeout(() => {gameboardBackground.style.display = 'none';restartCard();}, 1200);
    }

    function restartCard(name){
        var restartButton = document.getElementById('restart-button');
        var playAgainCard = document.getElementById('play-again');

        setTimeout(()=> {
        playAgainCard.style.display = 'grid';
        playAgainCard.className = 'appear';
        restartButton.className = 'appear-button'; 
    }, 1300);

        restartButton.addEventListener('click', function(){
            debugger;
            playAgainCard.className = 'disappear';
            restartButton.className = 'disappear-button';
            setTimeout(() => {
            playAgainCard.style.display = 'none';
            gameBoardAppear();
            toggleMove();
            }, 1200);
        })
    };

    function gameBoardAppear(){
        var gameboardBackground = document.getElementById('gameboard-background');
        createGameboard.clearBoard();
        gameboardBackground.style.display ='grid';
    }

    function toggleMove(){
        canMove = !canMove;
        if (canMove){
            document.addEventListener('click', takeTurn)
        }
        else{
            document.removeEventListener('click', takeTurn);    
        }
        console.log(canMove);
    }

    return {
        checkForWin : checkForWin,
        checkForDraw : checkForDraw,
        aiTakeTurn : aiTakeTurn
    };
})();



createGameboard.generateBoard();
const user = Player('x');
const user2 = Player('o');