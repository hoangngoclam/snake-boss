import {API} from './helper'
class Game{
    static boardWidth: number = 26;
    static boardHeight: number = 16;
    static board: IBoardItem[][] = [];
    static snakeX: number = 0;
    static snakeY: number = 0;
    static snakeDirection: string = 'Up';
    static snakeLength: number = 5;
    static score: number = 0;
    static isPlayGame: boolean;
    static timeInterval: any;
    constructor(){
        Game.boardWidth = 26;
        Game.boardHeight = 16;
        Game.board= [];
        Game.snakeX = 0;
        Game.snakeY = 0;
        Game.snakeDirection = 'Up';
        Game.snakeLength = 5;
        Game.score = 0;
        Game.isPlayGame = false;
    }

    public static startGame(): void {
        for (var y = 0; y < Game.boardHeight; ++y) {
            for (var x = 0; x < Game.boardWidth; ++x) {
                Game.board[y][x].snake = 0;
                Game.board[y][x].apple = 0;
            }
        }
    
        // Default position for the snake in the middle of the board.
        Game.snakeX = Math.floor(Game.boardWidth / 2);
        Game.snakeY = Math.floor(Game.boardHeight / 2);
        Game.snakeLength = 5;
        Game.snakeDirection = 'Up';
        Game.score  = 0 ;
    
        // Set the center of the board to contain a snake
        Game.board[Game.snakeY][Game.snakeX].snake = Game.snakeLength;
        Game.placeApple();

    }
    public static placeApple(): void {
        // A random coordinate for the apple
        var appleX = Math.floor(Math.random() * Game.boardWidth);
        var appleY = Math.floor(Math.random() * Game.boardHeight);
    
        Game.board[appleY][appleX].apple = 1;
    }

    public static reset(){
        clearInterval(Game.timeInterval);
    }

    public static initGame(): void {
        const boardElement: any = document.getElementById('board');
        for (var y = 0; y < Game.boardHeight; ++y) {
            var row = [];
            for (var x = 0; x < Game.boardWidth; ++x) {
                var cell: IBoardItem = {
                    snake: 0,
                    apple:0
                };
                cell.element = document.createElement('div');
                boardElement.appendChild(cell.element);
                row.push(cell);
            }
            Game.board.push(row);
        }
        Game.startGame();
        document.onkeypress = function (e) {
            console.log(e);
            // if(e.which == 32) {
            //     if(!Game.isPlay)
            //         Game.gameLoop();
            // }
        };
        document.getElementById('play')?.addEventListener('click', (e)=>{
            if(!Game.isPlayGame)
                Game.gameLoop();
        })
    }
    public static gameLoop(): any {
        let scoreDivElement = document.getElementById('score');
        scoreDivElement?scoreDivElement.innerText = Game.score.toString():console.log("Error update score");

        Game.isPlayGame = true;
        switch (Game.snakeDirection) {
            case 'Up':    Game.snakeY--; break;
            case 'Down':  Game.snakeY++; break;
            case 'Left':  Game.snakeX--; break;
            case 'Right': Game.snakeX++; break;
        }
        if (Game.snakeX < 0 || Game.snakeY < 0 || Game.snakeX >= Game.boardWidth || Game.snakeY >= Game.boardHeight) {
            let currentUser: any = JSON.parse(localStorage.getItem('user') || 'null');
            let data = {userId:currentUser.id, score: Game.score}
            API.Post('http://localhost:5000/match',data)
            .then(ressult=>{console.log(ressult)})
            .catch(error=>console.log(error))

            setTimeout(() => {
                window.location.reload();
            }, 2000);
            Game.gameLoop = ()=>{}
        }
        
        if (Game.board[Game.snakeY][Game.snakeX].snake > 0) {
            let currentUser: any = JSON.parse(localStorage.getItem('user') || 'null');
            let data = {userId:currentUser.id, score: Game.score}
            API.Post('http://localhost:5000/match',data)
            .then(ressult=>{console.log(ressult)})
            .catch(error=>console.log(error))
            setTimeout(() => {
                window.location.reload();
            }, 2000);
            Game.gameLoop = ()=>{}
        }
        // Collect apples
        if (Game.board[Game.snakeY][Game.snakeX].apple === 1) {
            Game.snakeLength++;
            Game.board[Game.snakeY][Game.snakeX].apple = 0;
            Game.placeApple()
            Game.score++;
        }
    
        // Update the board at the new snake position
        Game.board[Game.snakeY][Game.snakeX].snake = Game.snakeLength;
    
        for (var y = 0; y < Game.boardHeight; ++y) {
            for (var x = 0; x < Game.boardWidth; ++x) {
                var cell:IBoardItem = Game.board[y][x];
                if (cell.apple === 1) {
                    cell.element.className = 'apple';
                }
                else if (cell.snake > 0) {
                    cell.element.className = 'snake';
                    cell.snake -= 1;
                }
                else {
                    cell.element.className = '';
                }
                
            }
        }
        // This function calls itself, with a timeout of 1000 milliseconds
        Game.timeInterval = setTimeout(Game.gameLoop, 1000/Game.snakeLength);
        
    }
    public static enterKey(_event:any):void{
        switch (_event.key) {
            case 'ArrowUp': Game.snakeDirection = 'Up'; break;
            case 'ArrowDown': Game.snakeDirection = 'Down'; break;
            case 'ArrowLeft': Game.snakeDirection = 'Left'; break;
            case 'ArrowRight': Game.snakeDirection = 'Right'; break;
            default: return;
        }
    }
}

interface IBoardItem{
    snake: number,
    apple?: number,
    element?:any
}
export default Game