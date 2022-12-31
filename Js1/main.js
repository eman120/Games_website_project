// var result=[];
//  async function getMovies(type){
//    let resp = await fetch(`https://api.themoviedb.org/3/${type}?api_key=eba8b9a7199efdcb0ca1f96879b83c44&fbclid=IwAR32Px4_3ZTHYF-tjdSOdkN82Esd5XSCl7c0ueF0LR8urOnlJBZ4TJJdf_k`)
// resp= await resp.json()
//  result=resp.results
// console.log(result)
// display();
// }
// getMovies("movie/now_playing");

// function display(){
  
//    let mov=``
//    console.log(result);
//    for(var i=0;i< result.length;i++){
//       console.log(result[i])
   
//       mov+= 
//       `
//       <div class="col-lg-4 mb-4">
//       <div class="movie ">
//       <img src="https://image.tmdb.org/t/p/original/${result[i].poster_path}" alt="" class="w-100">
//       <diV class="layer">

//         <div class="information my-auto ">

//           <h3 class="name fw-light">
//             ${result[i].original_title}
//           </h3>


//           <p class="about">
//           ${result[i].overview}
//           </p>
//           <p class="rate">
//           rate: ${result[i].vote_average}
//           </p>
         
//           <p class="history">
//           ${result[i]. release_date}
//           </p>
//         </div>

//       </diV>
//     </div>
//     </div>
     
//       `
//    }
//    document.getElementById("displayM").innerHTML=mov;
// }
// let search1 =document.getElementById("sar1")
  
//   search1.addEventListener("keyup",function(){
//   console.log(search1.value)  
//   search();
  
//   })

//  async function search(){
// let resp = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=eba8b9a7199efdcb0ca1f96879b83c44&fbclid=IwAR32Px4_3ZTHYF-tjdSOdkN82Esd5XSCl7c0ueF0LR8urOnlJBZ4TJJdf_k&query=${search1.value}`)
//   resp= await resp.json()
//    result=resp.results
//   console.log(result)
//   display();
// }






let height =$(".side-menu ul").innerHeight();
let link=$(".side-menu li");
let width=$(".side-menu .left").outerWidth()
$(".side-menu").css("left",-width)
 link.css("top",height)
 $(".close-open").click(function(){
   if($(".side-menu").css("left")=="0px"){
  for(var i=0 ; i<link.length;i++ ){
    link.eq(i).animate({"top":height},300)
    }
    $(".side-menu").animate({"left":-width},400)
 /**  $("#close").addClass("d-none");
   $("#close").removeClass("d-none");
    */
  document.getElementById("close").classList.add("d-none")
    document.getElementById("open").classList.remove("d-none")

  }
  else{
    document.getElementById("open").classList.add("d-none")
    
    document.getElementById("close").classList.remove("d-none")
    $(".side-menu").animate({"left":"0px"},400)
    let ran=0
    for(var i=0 ; i<link.length;i++ ){
    link.eq(i).animate({"top":0},900+ran)
    ran=ran+200;
   
    }
  }
 })

//------validation

let nameEL = document.getElementById("name")
let emailEL = document.getElementById("email")
let phoneEL = document.getElementById("phone")
let ageEL = document.getElementById("age")
let passwordEL = document.getElementById("password")
let repasswordEL = document.getElementById("repassword")
let nameReg;
let emailReg;
let phonelReg;
let ageReg;
let passReg;
let repassReg;


nameEL.addEventListener("keyup",function(){
nameReg=/^[A-Z a-z]{3,9}$/
let id =document.getElementById("nameAl")
 checkValid(nameEL.value,nameReg,id )
checkAL();

})
emailEL.addEventListener("keyup",function(){
  emailReg= /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let id =document.getElementById("emailAl")
  checkValid(emailEL.value,emailReg,id )
checkAL();
  
  })
  phoneEL.addEventListener("keyup",function(){
    phonelReg=/^(010|012|011|015)[0-9]{8}$/
    let id=document.getElementById("phoneAL")
     checkValid(phoneEL.value,phonelReg,id)
    checkAL();
    })
    ageEL.addEventListener("keyup",function(){
      ageReg=/^[1-9]{1,2}$/
      let id=document.getElementById("ageAL")
      checkValid( ageEL.value,ageReg,id )
     
      checkAL();
      })
      passwordEL.addEventListener("keyup",function(){
        passReg=/(?=.*[0-9])(?=.*[a-zA-Z])(.{8,})/
      //  passReg=/^([A-Za-z]{1,10}[0-9]{1}|[0-9]{1,10}[A-Za-z]{1})[A-Za-z0-9]{6,20}$/
let id=document.getElementById("passAL")
checkValid(passwordEL.value,passReg,id );

checkAL();

})

repasswordEL.addEventListener("keyup",function(){
  repassReg=passwordEL.value
  let id=document.getElementById("repassAL")
if(repasswordEL.value==repassReg){
  id.classList.add("d-none")

}
else{
  id.classList.remove("d-none")

}
checkAL();
  })
  

 
 function checkValid(inputValue,Re,id){
  if (!Re.test(inputValue)) {
  id.classList.remove("d-none")
    


  }
  else{
    
    id.classList.add("d-none")
  
  }

 }
 function checkAL(){
  if (nameReg.test(nameEL.value)&&emailReg.test(emailEL.value)&& phonelReg.test(phoneEL.value)&&ageReg.test( ageEL.value)&&passReg.test( passwordEL.value)&&(repasswordEL.value==repassReg)) {
document.getElementById("submit").removeAttribute("disabled");
  }
  else{
    document.getElementById("submit").disabled = "true";

  }
 }
 //..................
//  let search2=document.getElementById("sar2");
//  search2.addEventListener("keyup",function(){
  
//   display2();


  
//   })
 

//   function display2(){
  
//     let mov2=``
  
//     for(var i=0;i< result.length;i++){
//       if( result[i].title.toLowerCase().includes(search2.value.toLowerCase())){
    
//        mov2+= 
//        `
//        <div class="col-lg-4 mb-5">
//        <div class="movie ">
//        <img src="https://image.tmdb.org/t/p/original/${result[i].poster_path}" alt="" class="w-100">
//        <diV class="layer">
 
//          <div class="information my-auto ">
 
//            <h3 class="name fw-light">
//              ${result[i].original_title}
//            </h3>
 
 
//            <p class="about">
//            ${result[i].overview}
//            </p>
//            <p class="rate">
//            rate: ${result[i].vote_average}
//            </p>
          
//            <p class="history">
//            ${result[i]. release_date}
//            </p>
//          </div>
 
//        </diV>
//      </div>
//      </div>
      
//        `
    
//   }
//     document.getElementById("displayM2").innerHTML=mov2;
//  }
// }

// console.log($(".link2"));

// $(".link1").click(function(){
//   getMovies("movie/now_playing")
//   })
  $(".link2").click(function(){
   window.open("../HTML/index.html","_self","",""); 
    })

    $(".link3").click(function(){
     window.open("../SnakeGame/HTML/index.html","_self","","");
      })
     
  $(".link4").click(function(){
    window.open("../flappyBird/flappyBird.html","_self","","");
  })

  $(".link5").click(function(){
    window.open("Menja.html","_self","","");
  })


      // console.log(sara);
      // sara = "sad and makmosa";
     
      
function slide(){
  $("#logoAnimate").fadeToggle("slow");
  //$("#txt1").slideToggle("slow");
}
setInterval( slide, 2000)

$("#flappy").mouseover(function(){
  $("#gameHover1").css("display" , "block");
})
$("#flappy").mouseout(function(){
  $("#gameHover1").css("display" , "none");
})
   
$("#menja").mouseover(function(){
  $("#gameHover2").css("display" , "block");
})
$("#menja").mouseout(function(){
  $("#gameHover2").css("display" , "none");
})

$("#snake").mouseover(function(){
  $("#gameHover3").css("display" , "block");
})
$("#snake").mouseout(function(){
  $("#gameHover3").css("display" , "none");
})

$("#car").mouseover(function(){
  $("#gameHover4").css("display" , "block");
})
$("#car").mouseout(function(){
  $("#gameHover4").css("display" , "none");
})



