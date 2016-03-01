/// <reference path="../refAll.d.ts" />
var GameState = (function () {
    function GameState() {
        this.currentPlayer = null;
        this.grid = {};
        this.victoryPossibilities = null;
        this.victoryPath = null;
        this.playerChangeNotifiers = [];
        this.gameChangeNotifiers = [];
        this.availableSpaces = 0;
        this.setupRandomPlayer();
        this.setupGrid();
        this.setupVictoryPossibilities();
    }
    GameState.prototype.listenForPlayerChanges = function (callback, scope) {
        this.playerChangeNotifiers.push({
            callback: callback,
            scope: scope
        });
    };
    GameState.prototype.listenForGameChanges = function (callback, scope) {
        this.gameChangeNotifiers.push({
            callback: callback,
            scope: scope
        });
    };
    GameState.prototype.getCurrentPlayer = function () {
        return this.currentPlayer;
    };
    GameState.prototype.registerClick = function (coordinate) {
        this.grid[coordinate] = this.currentPlayer;
        this.availableSpaces--;
        this.validate();
    };
    GameState.prototype.switchPlayer = function () {
        if (this.currentPlayer === PlayerType.O_PLAYER) {
            this.currentPlayer = PlayerType.X_PLAYER;
        }
        else {
            this.currentPlayer = PlayerType.O_PLAYER;
        }
        this.notifyForPlayerChange(this.currentPlayer, false);
    };
    GameState.prototype.getVictoryPath = function () {
        if (this.victoryPath === null) {
            return null;
        }
        return this.victoryPossibilities[this.victoryPath];
    };
    GameState.prototype.resetAllData = function () {
        Players.resetPlayerScores();
        this.reset();
        this.notifyForGameChange(StateType.RESET_DATA);
    };
    GameState.prototype.newGame = function () {
        this.reset();
        this.notifyForGameChange(StateType.NEW_GAME);
    };
    GameState.prototype.notifyForPlayerChange = function (player, victor) {
        this.notify(this.playerChangeNotifiers, [player, victor]);
    };
    GameState.prototype.notifyForGameChange = function (newGameState) {
        this.notify(this.gameChangeNotifiers, [newGameState]);
    };
    GameState.prototype.notify = function (notifyList, data) {
        for (var i = 0; i < notifyList.length; i++) {
            var callbackMapping = notifyList[i];
            callbackMapping.callback.apply(callbackMapping.scope, data);
        }
    };
    GameState.prototype.setupRandomPlayer = function () {
        this.currentPlayer = PlayerType[PlayerType[Math.floor(Math.random() * Players.PLAYER_COUNT)]];
    };
    GameState.prototype.setupGrid = function () {
        this.grid["A1"] = null;
        this.grid["A2"] = null;
        this.grid["A3"] = null;
        this.grid["B1"] = null;
        this.grid["B2"] = null;
        this.grid["B3"] = null;
        this.grid["C1"] = null;
        this.grid["C2"] = null;
        this.grid["C3"] = null;
        this.availableSpaces = 9;
    };
    GameState.prototype.setupVictoryPossibilities = function () {
        this.victoryPossibilities = [[]];
        this.victoryPossibilities.push(["A1", "A2", "A3"]);
        this.victoryPossibilities.push(["B1", "B2", "B3"]);
        this.victoryPossibilities.push(["C1", "C2", "C3"]);
        this.victoryPossibilities.push(["A1", "B1", "C1"]);
        this.victoryPossibilities.push(["A2", "B2", "C2"]);
        this.victoryPossibilities.push(["A3", "B3", "C3"]);
        this.victoryPossibilities.push(["A1", "B2", "C3"]);
        this.victoryPossibilities.push(["A3", "B2", "C1"]);
    };
    GameState.prototype.validate = function () {
        var victor = null;
        var victoryPath = -1;
        for (var i = 0; i < this.victoryPossibilities.length; i++) {
            var victoryCondition = this.victoryPossibilities[i];
            var oCount = 0;
            var xCount = 0;
            for (var cond = 0; cond < victoryCondition.length; cond++) {
                var coordinate = victoryCondition[cond];
                if (this.grid[coordinate] === PlayerType.O_PLAYER) {
                    oCount++;
                }
                if (this.grid[coordinate] === PlayerType.X_PLAYER) {
                    xCount++;
                }
            }
            if (oCount === 3) {
                victor = PlayerType.O_PLAYER;
                victoryPath = i;
            }
            if (xCount === 3) {
                victor = PlayerType.X_PLAYER;
                victoryPath = i;
            }
        }
        if (victor !== null) {
            console.warn("Victor Determined: " + PlayerType[victor]);
            this.victoryPath = victoryPath;
            this.notifyForPlayerChange(victor, true);
        }
        else if (this.availableSpaces <= 0) {
            console.warn("Victor Determined: No One");
            this.victoryPath = null;
            this.notifyForPlayerChange(null, true);
        }
    };
    GameState.prototype.reset = function () {
        this.victoryPath = null;
        this.setupGrid();
        this.setupRandomPlayer();
    };
    return GameState;
})();
/// <reference path="../refAll.d.ts" />
var Main = (function () {
    function Main() {
        console.log("App started");
        Players.init();
        var gameState = new GameState();
        new CellWatcher(gameState);
        new GameDetails(gameState);
    }
    return Main;
})();
window.addEventListener('load', function () {
    new Main();
});
/// <reference path="../refAll.d.ts" />
var Players = (function () {
    function Players() {
    }
    Players.init = function () {
        Players.playerMapping = {};
        Players.playerMapping[PlayerType.O_PLAYER] = 'certificate';
        Players.playerMapping[PlayerType.X_PLAYER] = 'remove';
        Players.score = {};
        Players.score[PlayerType.O_PLAYER] = 0;
        Players.score[PlayerType.X_PLAYER] = 0;
        Players.score[PlayerType.TIE_PLAYER] = 0;
    };
    Players.getPlayerSymbol = function (player) {
        return Players.playerMapping[player];
    };
    Players.getPlayerScore = function (player) {
        return Players.score[player];
    };
    Players.playerWon = function (player) {
        if (player === null) {
            Players.score[PlayerType.TIE_PLAYER]++;
        }
        else {
            Players.score[player]++;
        }
    };
    Players.resetPlayerScores = function () {
        Players.score[PlayerType.O_PLAYER] = 0;
        Players.score[PlayerType.X_PLAYER] = 0;
    };
    Players.PLAYER_COUNT = 2;
    return Players;
})();
/// <reference path="../refAll.d.ts" />
var PlayerType;
(function (PlayerType) {
    PlayerType[PlayerType["X_PLAYER"] = 0] = "X_PLAYER";
    PlayerType[PlayerType["O_PLAYER"] = 1] = "O_PLAYER";
    PlayerType[PlayerType["TIE_PLAYER"] = 2] = "TIE_PLAYER";
})(PlayerType || (PlayerType = {}));
/// <reference path="../refAll.d.ts" />
var StateType;
(function (StateType) {
    StateType[StateType["NEW_GAME"] = 0] = "NEW_GAME";
    StateType[StateType["RESET_DATA"] = 1] = "RESET_DATA";
})(StateType || (StateType = {}));
/// <reference path="../refAll.d.ts" />
var AbstractDomTicTacToe = (function () {
    function AbstractDomTicTacToe() {
        this.setupContentDefault();
    }
    AbstractDomTicTacToe.prototype.getSelectionContent = function (glyphiconName) {
        var thisContent = this.defaultContent.clone();
        thisContent.addClass('glyphicon-' + glyphiconName);
        return thisContent;
    };
    AbstractDomTicTacToe.prototype.setupContentDefault = function () {
        this.defaultContent = $('<span></span>');
        this.defaultContent.addClass('glyphicon');
    };
    return AbstractDomTicTacToe;
})();
/// <reference path="../refAll.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CellWatcher = (function (_super) {
    __extends(CellWatcher, _super);
    function CellWatcher(gameState) {
        _super.call(this);
        this.gameState = gameState;
        this.gameSquares = $('.gameSquare');
        this.setupListeners();
    }
    CellWatcher.prototype.setupListeners = function () {
        var _this = this;
        this.gameSquares.on('click', function (e) {
            var thisSquare = $(e.currentTarget);
            _this.handleSquareClick(thisSquare);
        });
        this.gameState.listenForPlayerChanges(this.playerStateChanged, this);
        this.gameState.listenForGameChanges(this.gameStateChanged, this);
    };
    CellWatcher.prototype.playerStateChanged = function (player, victor) {
        if (victor) {
            if (player != null) {
                this.disable(this.gameSquares);
                var victoryPath = this.gameState.getVictoryPath();
                this.highlightVictoryPath(victoryPath);
            }
            else {
            }
        }
        else {
        }
    };
    CellWatcher.prototype.gameStateChanged = function (gameStateType) {
        switch (gameStateType) {
            case StateType.NEW_GAME:
                this.resetSquares();
                break;
            case StateType.RESET_DATA:
                this.resetSquares();
                break;
            default:
                console.error("Missing state setting: " + gameStateType);
        }
    };
    CellWatcher.prototype.highlightVictoryPath = function (victoryPath) {
        if (victoryPath == null) {
            console.error("Victory path is null; no winner, cannot highlight path");
            return;
        }
        for (var i = 0; i < victoryPath.length; i++) {
            var selector = '[data-coordinate=' + victoryPath[i] + ']';
            this.gameSquares.find(selector).addBack(selector).addClass('winningSquare');
        }
    };
    CellWatcher.prototype.handleSquareClick = function (domSquare) {
        var currentPlayer = this.gameState.getCurrentPlayer();
        domSquare.empty();
        domSquare.append(this.getSelectionContent(Players.getPlayerSymbol(currentPlayer)));
        this.gameState.registerClick(domSquare.attr('data-coordinate'));
        this.disable(domSquare);
        this.gameState.switchPlayer();
    };
    CellWatcher.prototype.disable = function (domValue) {
        domValue.addClass('disabled');
        domValue.prop('disabled', true);
    };
    CellWatcher.prototype.resetSquares = function () {
        this.gameSquares.html('&nbsp;');
        this.gameSquares.removeClass('disabled');
        this.gameSquares.prop('disabled', false);
        this.gameSquares.removeClass('winningSquare');
    };
    return CellWatcher;
})(AbstractDomTicTacToe);
/// <reference path="../refAll.d.ts" />
var GameDetails = (function (_super) {
    __extends(GameDetails, _super);
    function GameDetails(gameState) {
        _super.call(this);
        this.gameState = gameState;
        this.currentPlayerPane = $('#currentPlayer');
        this.newGameBtn = $('#newGameBtn');
        this.resetDataBtn = $('#resetDataBtn');
        this.totalGamesPlayed = $('#totalGames').find('.value');
        this.oPlayerScore = $('#oPlayer').find('.value');
        this.xPlayerScore = $('#xPlayer').find('.value');
        this.tiesScore = $('#ties').find('.value');
        this.setupListeners();
        this.updatePlayer(this.gameState.getCurrentPlayer());
    }
    GameDetails.prototype.setupListeners = function () {
        var _this = this;
        this.gameState.listenForPlayerChanges(this.playerDataChanged, this);
        this.gameState.listenForGameChanges(this.gameDataChanged, this);
        this.newGameBtn.on('click', function () {
            _this.gameState.newGame();
        });
        this.resetDataBtn.on('click', function () {
            _this.gameState.resetAllData();
        });
    };
    GameDetails.prototype.playerDataChanged = function (player, victor) {
        if (victor) {
            Players.playerWon(player);
            this.updateScore();
        }
        else {
            this.updatePlayer(player);
        }
    };
    GameDetails.prototype.gameDataChanged = function (gameStateType) {
        switch (gameStateType) {
            case StateType.NEW_GAME:
                this.updatePlayer(this.gameState.getCurrentPlayer());
                break;
            case StateType.RESET_DATA:
                this.updatePlayer(this.gameState.getCurrentPlayer());
                this.updateScore();
                break;
            default:
                console.error("Missing state setting: " + gameStateType);
        }
    };
    GameDetails.prototype.updatePlayer = function (player) {
        this.currentPlayerPane.empty();
        this.currentPlayerPane.append(this.getSelectionContent(Players.getPlayerSymbol(player)));
    };
    GameDetails.prototype.updateScore = function () {
        var oScore = Players.getPlayerScore(PlayerType.O_PLAYER);
        var xScore = Players.getPlayerScore(PlayerType.X_PLAYER);
        var tied = Players.getPlayerScore(PlayerType.TIE_PLAYER);
        var total = oScore + xScore + tied;
        this.totalGamesPlayed.text(total);
        this.oPlayerScore.text(oScore);
        this.xPlayerScore.text(xScore);
        this.tiesScore.text(tied);
    };
    return GameDetails;
})(AbstractDomTicTacToe);
//# sourceMappingURL=internal.js.map