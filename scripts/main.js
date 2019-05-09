// Tic Tac Toe v2
var clickCount = 2;
var winnerFound = false;
var selectedTiles = [];
var matrix = document.getElementById('matrix');
var restart = document.getElementById('restart');
var newGame = document.getElementById('new-game');
var start = document.getElementById('start');
var playerOneData = {
    name: null,
    checkList: []
};
var playerTwoData = {
    name: null,
    checkList: []
};
var resultsList = [[0, 1, 2],
[3, 4, 5],
[6, 7, 8],
[0, 3, 6],
[1, 4, 7],
[2, 5, 8],
[0, 4, 8],
[2, 4, 6]];
var setHTMLContent = function setHTMLContent(selector, value) {
    document.querySelector(selector).innerHTML = value;
}
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
    setHTMLContent('#p1-info span', playerOneData.name);
    setHTMLContent('#p2-info span', playerTwoData.name);
};

start.addEventListener('click', startGame);

var isTileChecked = function (index, tile) {
    var i = 0;
    while (i < tile.length) {
        if (index == tile[i]) {
            return false;
        }
        i++;
    }
    return true;
};
var showWinner = function showWinner(playersData) {
    matrix.removeEventListener('click', startMatrix);
    setHTMLContent('#result', "Winner is " + playersData.name);
    winnerFound = true;
    return true;
}

var compareWithResultList = function compareWithResultList(playerCheckList, resultsList, playersData) {
    resultsList.forEach(function (resultsListItem) {
        var elementsMatchCount = 0;
        // compare players array with ResultList sub array and check if any result matched
        playerCheckList.filter(function (playerCheckListItem) {

            if (resultsListItem.indexOf(playerCheckListItem) >= 0) {
                elementsMatchCount++;
            }
        });
        if (elementsMatchCount == resultsListItem.length) {
            showWinner(playersData);
        }
    });
};

var winnerFinder = function (playersData) {
    if (playersData.checkList.length < 2) return false;
    var playerCheckList = playersData.checkList;
    compareWithResultList(playerCheckList, resultsList, playersData);

};
var startMatrix = function ($event) {
    var target = $event.target;
    var tileIndex = +target.getAttribute('tile-index');
    var IsAlreadyChecked = isTileChecked(tileIndex, selectedTiles);
    if (target.className === 'tile' && IsAlreadyChecked === true) {
        selectedTiles.push(tileIndex);


        if (clickCount % 2 === 0) {
            playerOneData.checkList.push(tileIndex);
            target.className = 'tile red';

            if (winnerFinder(playerOneData, resultsList) === true) {
                matrix.removeEventListener('click', startMatrix);
            }
        } else {
            playerTwoData.checkList.push(tileIndex);
            target.className = 'tile blue';
            if (winnerFinder(playerTwoData, resultsList) === true) {
                matrix.removeEventListener('click', startMatrix);
            }
        }

        clickCount++;
        if (clickCount === 11 && winnerFound === false) {
            setHTMLContent('#result', 'Match drawn');
        }
    }
}
matrix.addEventListener('click', startMatrix);
var resetBoard = function () {
    winnerFound = false;
    clickCount = 2;
    matrix.addEventListener('click', startMatrix);
    // remove match result and reset it to blank
    setHTMLContent('#result', '');
    selectedTiles = [];
    var tile = document.querySelectorAll('.tile');
    tile.forEach(function (ele, index) {
        tile[index].className = 'tile';
    });
    playerOneData.checkList = [];
    playerTwoData.checkList = [];
};

restart.addEventListener('click', function () {

    resetBoard();
});
newGame.addEventListener('click', function () {
    //     show user info form
    hideShowElement('user', 'block');
    //     hide game board
    hideShowElement('game-board', 'none');
    resetBoard();
});
