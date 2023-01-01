var move_speed = 3 , gravity = 0.5;
var bird = $(".bird");
var img = $("#bird-1");
let sound_point = new Audio('sounds effect/point.mp3');
let sound_die = new Audio('sounds effect/die.mp3');
var currentScore = 0;
var localScore;

// getting bird element properties
var bird_props = bird.get(0).getBoundingClientRect();
//console.log(bird_props);

// This method returns DOMReact -> top, right, bottom, left, x, y, width and height
var background = $(".background")[0].getBoundingClientRect();
//console.log(background);

var message = $(".message");
var score_val = $(".score_val");
var score_title = $(".score_title");

var game_state = 'Start';
img.attr("style" ,"display : none"); //vanish the bird
message.addClass('messageStyle');

if(!isFinite(window.localStorage.getItem('ScoreKey')))
{
    window.localStorage.setItem('ScoreKey' , 0); // store the max score in local storage
}

    document.addEventListener('keydown' , (e)=>{
        if(e.key == 'Enter' && game_state != 'Play'){
            $('.pipe_sprite').each((index,element) => {
                element.remove();
            });
            img.attr("style" ,"display : block"); //show the bird
            bird.attr("style" ,"top : 40vh");
            game_state ='Play';
            message.html('');
            score_title.html( 'Score : ');
            score_val.html('0'); //score : 0
            message.removeClass('messageStyle'); //remove style from the message 
            Play();
        }
    });

function Play()
{
    function move()
    {
        if(game_state != 'Play') return;
        var pipe_sprite = $('.pipe_sprite');
        $('.pipe_sprite').each((index , element) =>{
            var pipe_sprite_props = element.getBoundingClientRect();
            bird_props = bird[0].getBoundingClientRect();

            if(pipe_sprite_props.right <= 0)
            {
                element.remove();
            }
            else{
                if(bird_props.left < pipe_sprite_props.left + pipe_sprite_props.width && bird_props.left + bird_props.width > pipe_sprite_props.left && bird_props.top < pipe_sprite_props.top + pipe_sprite_props.height && bird_props.top + bird_props.height > pipe_sprite_props.top)
                {
                    localScore = window.localStorage.getItem('ScoreKey');
                    game_state ='End';
                    if(localScore > currentScore){
                        message.html(`GameOver <br> Your score is ${currentScore} <br> Max Score ${localScore}`);
                    }
                    else{ // current > local
                        localScore = currentScore;
                        window.localStorage.setItem('ScoreKey' , localScore);
                        message.html(`GameOver Your score is ${localScore}`);
                    }
                    message.addClass('messageStyle');
                    img.attr("style" ,"display : none");
                    sound_die.play();
                    return;
                }
                else{
                    if(pipe_sprite_props.right < bird_props.left && pipe_sprite_props.right + move_speed >= bird_props.left && element.increase_score =='1')
                    {
                        score_val.html(parseInt(score_val.html()) +1);
                        currentScore = parseInt(score_val.html());
                        if(currentScore > localScore)
                        {
                            localScore = currentScore;
                            window.localStorage.setItem('ScoreKey' , localScore);
                        }
                        
                        sound_point.play();
                    }
                    element.style.left = pipe_sprite_props.left - move_speed + 'px';
                }
            }
        });
        requestAnimationFrame(move);
    }
    requestAnimationFrame(move);

    var bird_dy = 0;
    function apply_gravity(){
        if(game_state != 'Play') return;
        bird_dy = bird_dy + gravity;

        $(document).keydown((element) => {
            if(element.key == 'ArrowUp' || element.key == ' '){
                img.attr('src' , 'Images/flappy-bird-wing-down.png');
                bird_dy = -7.6;
            }
        });
        $(document).keyup((e) => {
            if(e.key == 'ArrowUp' || e.key == ' '){
                img.attr('src' , 'Images/flappy-bird-wing-up.png');
            }
        });
        
        if(bird_props.top <= 0 || bird_props.bottom >= background.bottom){
            game_state ='End';
            message.css('left', '28vw');
            window.location.reload();
            message.removeClass('messageStyle');
            return;
        }
        bird.css('top' ,  bird_props.top + bird_dy + 'px')
        bird_props = bird[0].getBoundingClientRect();
        requestAnimationFrame(apply_gravity);
    }
    requestAnimationFrame(apply_gravity);

    var pipe_seperation = 0;
    var pipe_gap = 35;
    

    function create_pipe (){
        if(game_state != 'Play') return;

        if (pipe_seperation > 115){
            pipe_seperation = 0;
            //Top pipe
            var pipe_posi = Math.floor(Math.random() * 43) +8; //position => 0.4 * 43 = floor(17.2) = 17 + 8 = 25
            var pipe_sprite_inv = document.createElement('div'); //create top pipe div //onverse
            pipe_sprite_inv.className = 'pipe_sprite';
            pipe_sprite_inv.style.top = pipe_posi - 70 + 'vh'; //25-70 = -45 vh
            pipe_sprite_inv.style.left = '100vw';

            $(document.body).append(pipe_sprite_inv); //append the top div

            var pipe_sprite = document.createElement('div'); //create bottom pipe div
            pipe_sprite.className = 'pipe_sprite';
            pipe_sprite.style.top = pipe_posi + pipe_gap + 'vh'; // 25 + 35 = 60
            pipe_sprite.style.left = '100vw';

            pipe_sprite.increase_score = '1'; //increase score 

            $(document.body).append(pipe_sprite); //append the bottom div
        }
        pipe_seperation ++;
        requestAnimationFrame(create_pipe);
    }
    requestAnimationFrame(create_pipe);
}

$(".second").click(function(){
    window.open("../home.html","_self","","");

})