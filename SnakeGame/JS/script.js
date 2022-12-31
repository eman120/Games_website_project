//Canvas Shape 
var blockSize = 25;
var rows = 20;
var cols = 20;
var board;
var context; 

//snake head
var snakex=blockSize * 5;
var snakey=blockSize * 5;


//Snake Movement
var speedx=0;
var speedy=0;

//Score 
var score=0;

//Snake Length 
var snakeBody = [];

//food
var foodx;
var foody;

var interv;

var gameOver=false;

var start_btn=document.getElementById("btn");
var popup=$("#popup");
window.onload = function() {
    window.localStorage.setItem('scorekey',score);
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d"); 
}
start_btn.onclick=function(){
    //localStorage.clear();
    popup.css("display", "none");
    clearInterval(interv);
        gameOver=false;
        snakex=blockSize * 5;
        snakey=blockSize * 5;
        speedx=0;
        speedy=0;
        score=0;
        snakeBody=[];
    placeFood();
    interv= setInterval(update,1000/10);//call the update function to move the snake to the next position every 100 millsec
    
    document.addEventListener("keyup",changeDirection);
}


function update() {
    if(gameOver){
        //initalize the vars to zero again to start a new round
        
        clearInterval(interv);
        gameOver=false;
        snakex=blockSize * 5;
        snakey=blockSize * 5;
        speedx=0;
        speedy=0;
        snakeBody=[];
        score=0;
        
        return;
    }
    //board color /size
    context.fillStyle="black";
    context.fillRect(0, 0, board.width, board.height);

    //Score Title inside the board
    Draw_score();

    //food element
    context.fillStyle="red";
    context.fillRect(foodx, foody, blockSize, blockSize);
    
    //snake condition for eating the food
    if(snakex == foodx && snakey == foody){
        snakeBody.push([foodx,foody]);
        score++;
        //function to place the food randomly
        placeFood();
    }
    //loop for handle snakeDirection function
    for(let i=snakeBody.length-1;i>0;i--){
        snakeBody[i]=snakeBody[i-1];
        
    }
      //update the Head of the snake 
      if(snakeBody.length){
        snakeBody[0]=[snakex,snakey];
      }
   
    
    context.fillStyle="#b1cbbe";
    
    //change the snake position every 100 millsec while calling the update function
    snakex+=speedx * blockSize;
    snakey+=speedy * blockSize;
    
    //Drawing the new snake head again every 100 mil sec
    context.fillRect(snakex, snakey, blockSize, blockSize);

    //continue drawing the snake tail and add it to the snake head
    for(let i=0;i<snakeBody.length;i++){
        context.fillRect(snakeBody[i][0],snakeBody[i][1],blockSize,blockSize);
    }
    //game over conditions
    if(snakex<0||snakex>cols*blockSize||snakey<0||snakey>rows*blockSize){
        gameOver=true;
        
        //to set a max score for the player
        var getscore=window.localStorage.getItem('scorekey');
        if(getscore<=score){
            window.localStorage.setItem('scorekey',score);
            popup.html(`<h1>Game Over (your max score is ${score} )</h1>`)
            popup.css("display", "block");
        }
        else if(getscore>score){
            popup.html(`<h1>Game Over (your max score is ${getscore} )</h1>`)
            popup.css("display", "block");
        }
        
    }
    for(let i=0;i<snakeBody.length;i++){
        if(snakex==snakeBody[i][0] && snakey==snakeBody[i][1]){
            gameOver=true;
            var getscore=window.localStorage.getItem('scorekey');
        if(getscore<=score){
            window.localStorage.setItem('scorekey',score);
            popup.html(`<h1>Game Over (your max score is ${score} )</h1>`)
            popup.css("display", "block");
        }
        else if(getscore>score){
            popup.html(`<h1>Game Over (your max score is ${getscore} )</h1>`)
            popup.css("display", "block");
        }
        }
    }
    
}
//Score title
function Draw_score(){
    context.fillStyle="white";
    context.font="20px Verdana";
    context.fillText("Score "+ score, board.width-100,30);
}

//chnage snkae Direction
function changeDirection(e){
    if(e.code=="ArrowUp" && speedy != 1){
        speedx=0;
        speedy=-1;
    }
    else if(e.code=="ArrowDown" && speedy != -1){
        speedx=0;
        speedy=+1;
    }
    else if(e.code=="ArrowLeft" && speedx != 1){
        speedx=-1;
        speedy=0;
    }
    if(e.code=="ArrowRight" && speedx != -1){
        speedx=+1;
        speedy=0;
    }
}
//place Food randomly
function placeFood(){
    foodx=Math.floor(Math.random()*cols)*blockSize;
    foody=Math.floor(Math.random()*rows)*blockSize;
}


$(".second").click(function(){
    window.open("/home.html","_self","","");

})