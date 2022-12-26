var move_speed = 3 , gravity = 0.5;
var bird = $(".bird");
var img = $("#bird-1");

var bird_props = bird.get(0).getBoundingClientRect();
//getBoundingClientRect()

var background = $(".background")[0].getBoundingClientRect();
var message = $(".message");
var score_val = $(".score_val");
var score_title = $(".score_title");

var game_state = 'Start';
img.attr("style" ,"display : none");
message[0].classList.add('messageStyle');

document.addEventListener('keydown' , (e)=>{
    if(e.key == 'Enter' && game_state != 'Play'){
        $('.pipe_sprite').each(element => {
            element.remove();
        });
        img.attr("style" ,"display : block");
        bird.attr("style" ,"top : 40vh");
        game_state ='Play';
        message.html('');
        score_title.html( 'Score : ');
        score_val.html = '0';
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
        pipe_sprite.each((element) => {
            var pipe_sprite_props = element.getBoundingClientRect();
            bird_props = bird.getBoundingClientRect();

            if(pipe_sprite_props.right <= 0)
            {
                element.remove();
            }
            else{
                if(bird_props.left < pipe_sprite_props.width && bird_props.left + bird_props.width > pipe_sprite_props.left && bird_props.top < pipe_sprite_props.top + pipe_sprite_props.height && bird_props.top + bird_props.height > pipe_sprite_props.top)
                {
                    game_state ='End';
                    message.html('GameOver').attr("style" ,"color : red" ) + '<br>Press Enter To Restart';
                    message.addClass('messageStyle');
                    img.attr("style" ,"display : none");
                    return;
                }
                else{
                    if(pipe_sprite_props.right < bird_props.left && pipe_sprite_props.right + move_speed >= bird_props.left && element.increase_score =='1')
                    {
                        score_val.html() +=  score_val.html() +1;
                    }
                     //20:24 https://www.youtube.com/watch?v=Ltg1fl4Obgg&t=723s
                }
            }
        })
    }
}

