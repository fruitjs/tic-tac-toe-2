
var playerOneData = {
    name: null,
    arr: []
};
var playerTwoData = {
    name: null,
    arr: []
};
winnerFound = false;
var clickCount = 2;

var start = document.getElementById('start');
var resultsList = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];
var hideShowElement = function (screenId, display) {
    //     hide user infor form
    document.getElementById(screenId).style.display = display;
};

var startGame = function () {
    //     fetch username
    playerOneData.name = document.getElementById('player-one-name').value;
    playerTwoData.name = document.getElementById('player-two-name').value;
    //     hide user info form
    hideShowElement('user', 'none');
    //     show game board
    hideShowElement('game-board', 'block');
    //     set the player's name
    document.querySelector('#p1-info span').innerHTML = playerOneData.name;
    document.querySelector('#p2-info span').innerHTML = playerTwoData.name;
}

start.addEventListener('click', startGame);

var ifClicked = function (index, tile) {
    var i = 0;
    while (i < tile.length) {
        if (index == tile[i])
            return false;
        i++;
    }
    return true
};
var selectedTiles = [];

var winnerFinder = function (playersData, resultsList) {
    if (playersData.arr.length < 2) return true;
    var player = playersData.arr;
    var i = 0;
    resultsList.forEach(function (element) {
        i = 0;
        player.forEach(function (ele) {
            if (element.indexOf(ele) >= 0) {
                i++;
            }
        });
        if (i == element.length) {
            matrix.removeEventListener('click', startMatrix);
            document.getElementById('result').innerHTML = "Winner is " + playersData.name;
            winnerFound = true;
            return false;
        }
    });
};
var matrix = document.getElementById('matrix');
var startMatrix = function ($event) {
    var target = $event.target;
    var tileIndex = +target.getAttribute('tile-index');
    var alreadyClickedStatus = ifClicked(tileIndex, selectedTiles);
    if (target.className === 'tile' && alreadyClickedStatus === true) {
        selectedTiles.push(tileIndex);


        if (clickCount % 2 === 0) {
            playerOneData.arr.push(tileIndex);
            target.className = 'tile red';

            if (winnerFinder(playerOneData, resultsList) === false) {
                matrix.removeEventListener('click', startMatrix);
            }
        } else {
            playerTwoData.arr.push(tileIndex);
            target.className = 'tile blue';
            if (winnerFinder(playerTwoData, resultsList) === false) {
                matrix.removeEventListener('click', startMatrix);
            }
        }

        clickCount++;
        if (clickCount === 11 && winnerFound === false) {
            document.getElementById('result').innerHTML = 'Match drawn';
        }
    }
}
matrix.addEventListener('click', startMatrix);
var resetBoard = function () {
    winnerFound = false;
    clickCount = 2;
    matrix.addEventListener('click', startMatrix);
    document.getElementById('result').innerHTML = '';
    selectedTiles = [];
    var tile = document.querySelectorAll('.tile')
    tile.forEach(function (ele, index) {
        tile[index].className = 'tile';
    });
    playerOneData.arr = [];
    playerTwoData.arr = [];
};
var restart = document.getElementById('restart');
restart.addEventListener('click', function () {

    resetBoard();
});
var newGame = document.getElementById('new-game');
newGame.addEventListener('click', function () {
    //     show user info form
    hideShowElement('user', 'block');
    //     hide game board
    hideShowElement('game-board', 'none');
    resetBoard();
});
