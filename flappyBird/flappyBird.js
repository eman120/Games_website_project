var move_speed = 3 , gravity = 0.5;
var bird = $(".bird");
var img = $("#bird-1");
let sound_point = new Audio('sounds effect/point.mp3');
let sound_die = new Audio('sounds effect/die.mp3');

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
img.attr("style" ,"display : none");
message.addClass('messageStyle');

document.addEventListener('keydown' , (e)=>{
    if(e.key == 'Enter' && game_state != 'Play'){
        $('.pipe_sprite').each((index,element) => {
            element.remove();
        });
        img.attr("style" ,"display : block");
        bird.attr("style" ,"top : 40vh");
        game_state ='Play';
        message.html('');
        score_title.html( 'Score : ');
        score_val.html('0');
        message.removeClass('messageStyle'); //message.classList.remove('messageStyle')
        Play();
    }
});


function Play()
{
    function move()
    {
        if(game_state != 'Play') return;
        var pipe_sprite = $('.pipe_sprite');
        //var pipe_sprite = document.querySelectorAll('.pipe_sprite');
        // pipe_sprite.forEach((element) => {
        //     let pipe_sprite_props = element.getBoundingClientRect();
        //     bird_props = bird.get(0).getBoundingClientRect();
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
                    game_state ='End';
                    // message.html('GameOver'.css("color" , "red" ) + '<br>Press Enter To Restart');
                    message.html('GameOver' + '<br>Press Enter To Restart');
                    message.addClass('messageStyle');
                    img.attr("style" ,"display : none");
                    sound_die.play();
                    return;
                }
                else{
                    if(pipe_sprite_props.right < bird_props.left && pipe_sprite_props.right + move_speed >= bird_props.left && element.increase_score =='1')
                    {
                        score_val.html(parseInt(score_val.html()) +1);
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
            //message.attr("style" , "left : 28vw");
            window.location.reload();
            message.removeClass('messageStyle');
            return;
        }
        //bird.offset().top = bird_props.top + bird_dy + 'px';
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
            var pipe_posi = Math.floor(Math.random() * 43) +8;
            var pipe_sprite_inv = document.createElement('div');
            pipe_sprite_inv.className = 'pipe_sprite';
            // pipe_sprite_inv.css('top' ,  pipe_posi - 70 + 'vh');
            // pipe_sprite_inv.css('left' , '100vw');
            pipe_sprite_inv.style.top = pipe_posi - 70 + 'vh';
            pipe_sprite_inv.style.left = '100vw';

            $(document.body).append(pipe_sprite_inv);
            var pipe_sprite = document.createElement('div');
            pipe_sprite.className = 'pipe_sprite';
            // pipe_sprite.css('top' , pipe_posi + pipe_gap + 'vh');
            // pipe_sprite.css('left' , '100vw');
            pipe_sprite.style.top = pipe_posi + pipe_gap + 'vh';
            pipe_sprite.style.left = '100vw';
            pipe_sprite.increase_score = '1';

            $(document.body).append(pipe_sprite);
        }
        pipe_seperation ++;
        requestAnimationFrame(create_pipe);
    }
    requestAnimationFrame(create_pipe);
}
