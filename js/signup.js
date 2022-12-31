var signName=document.getElementById("sName");
var signEmail=document.getElementById("SEmail");
var signPass=document.getElementById("Spassword");
var sucses=document.getElementById("suc");
var bottun1=document.getElementById("btn1");
var emailExite =document.getElementById("exit");
var users =[];
if(JSON.parse(localStorage.getItem('users'))!=null){

    users=JSON.parse(localStorage.getItem('users'));
}

bottun1.addEventListener("click",function(){
   check()
if(check()!=true){
    store();
}
});
function check(){
    for(var i=0;i<users.length;i++){
        if(  users[i].email==signEmail.value){
            emailExite.classList.remove("d-none");
            sucses.classList.add("d-none");
            return true;
        }
    }
   
}

function store(){

  
     if(signName.value!=""&&signEmail.value!=""&&signPass.value!=""){
            var user={
                name:signName.value,
                email:signEmail.value,
                password:signPass.value,

            
            }
            users.push(user);
            localStorage.setItem("users",JSON.stringify(users));
            sucses.classList.remove("d-none");
            emailExite.classList.add("d-none");
        } 
        else if(signName.value==""||signEmail.value==""||signPass.value=="") {
            emailExite.innerHTML="all input is requird"
            
            emailExite.classList.remove("d-none");
           
        }
        
    }
    function dd(){
        users=[];
             localStorage.setItem("users",JSON.stringify(users));
         }
 
  /**
    function check2 (){
        if(store()==true){
       
        }
    else{
      
    }

}
*/

