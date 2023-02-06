/* Arshad Muhammed */
$(function() {

    var anim_id;

    var container = $('#container');
    var car = $('#car');
    var car_1 = $('#car_1');
    var car_2 = $('#car_2');
    var car_3 = $('#car_3');
    var car_4 = $('#car_4');
    var car_5 = $('#car_5');
    var line_1 = $('#line_1');
    var line_2 = $('#line_2');
    var line_3 = $('#line_3');
    var restart_div = $('#restart_div');
    var restart_btn = $('#restart');
    var score = $('#score');
    var high_score = localStorage.getItem('high_score');
    $('#high_score').text(high_score);
    var container_left = parseInt(container.css('left'));
    var container_width = parseInt(container.width());
    var container_height = parseInt(container.height());
    var car_width = parseInt(car.width());
    var car_height = parseInt(car.height());

   

    var game_over = false;

    var score_counter = 1;

    var speed = 4;
    var line_speed = 6;

    var move_right = false;
    var move_left = false;
    var move_up = false;
    var move_down = false;

   

    // $(document).on('keydown' , function(e){
    //     if(game_over === true){
    //         var key = e.keyCode ;
    //          if(key == 37 && game_over === false)
    //          game_over = false ;
    //      }
    // })




    $(document).on('keydown' , function(e){
        if(game_over === false){
            var key = e.keyCode ;
             if(key == 37 && game_over === false)
               move_left = requestAnimationFrame(left)  ;  
             else if(key == 39 && game_over === false)
               move_right = requestAnimationFrame(right) ;  
         }
    })

    $(document).on('keyup' , function(e){
        if(game_over === false){
            var key = e.keyCode ;
            if(key == 37){
            cancelAnimationFrame(move_left) 
            move_left = false
            }
            else if(key == 39){
                cancelAnimationFrame(move_right) 
                move_right = false
                }
         }

    })

    function left(){
        if(game_over === false && parseInt(car.css('left')) > 10 ){
            car.css('left' ,parseInt(car.css('left'))-5)
            move_left = requestAnimationFrame(left) ;  
        }
    }

    function right(){
        if(game_over === false && parseInt(car.css('right')) > 10){
            car.css('left' ,parseInt(car.css('left'))+5)
            move_right = requestAnimationFrame(right) ;  
        }
    }

    anim_id = requestAnimationFrame(repeat);
    
    function repeat(){
        if(game_over === false){

            if (collision(car , car_1) || collision(car , car_2) || collision(car , car_3)  ) 
            {stop_the_game()} ;

            score_counter++ ;
            if(score_counter %10 == 0){
               score.text(parseInt(score.text())+1)
            }

            if(score_counter %300 == 0){
                speed++;
             }
            car_down(car_1);
            car_down(car_2);
            car_down(car_3);   
            
            line_down(line_1);
            line_down(line_2);
            line_down(line_3);
            anim_id = requestAnimationFrame(repeat);
        }
        
        else{
            Start_the_game()
        }
    } 

console.log(container_width);
    function car_down(car){
        var current_top = parseInt(car.css('top'))
      
        if(current_top > container_height){
            current_top  = 0;
            var car_left = parseInt(Math.random() * (container_width -car_width))
            
          
            console.log( parseInt(Math.random() *container_width))
            car.css('left',car_left);
        }
        car.css('top' , current_top + speed)
    }

    function line_down(line) {
        var line_current_top = parseInt(line.css('top'));
        if (line_current_top > container_height) {
            line_current_top = -300;
        }
        line.css('top', line_current_top + line_speed);
    }

    function stop_the_game(){
        game_over = true ; 
        cancelAnimationFrame(anim_id); 
        // cancelAnimationFrame(move_left); 
        // cancelAnimationFrame(move_right); 
        restart_div.slideDown();
        restart_btn.foucs()
    }

    

    restart_btn.click(function(){
        location.reload();
    })

    function collision($div1, $div2) {
        var x1 = $div1.offset().left;
        var y1 = $div1.offset().top;
        var h1 = $div1.outerHeight(true);
        var w1 = $div1.outerWidth(true);
        var b1 = y1 + h1;
        var r1 = x1 + w1;
        var x2 = $div2.offset().left;
        var y2 = $div2.offset().top;
        var h2 = $div2.outerHeight(true);
        var w2 = $div2.outerWidth(true);
        var b2 = y2 + h2;
        var r2 = x2 + w2;

        if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
        return true;
    }

    $(".second").click(function(){
        window.open("../home.html","_self","","");

    })

});