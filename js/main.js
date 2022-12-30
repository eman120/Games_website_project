  var emailInput =document.getElementById("Email");
 var passwordInput =document.getElementById("pass");
var login =document.getElementById("login");
var Sec = document.getElementById("home");
var spSign = document.getElementById("psign");

var welcomName=document.getElementById("wname");
var empty=document.getElementById("empty");
 
if(JSON.parse(localStorage.getItem('users'))!=null){

    users=JSON.parse(localStorage.getItem('users'));
}
login.addEventListener("click",function(){
 first();
 if(first()!=true){
    second();
 }
})
function second(){
    if(emailInput.value==""||passwordInput.value==""){
        empty.classList.remove("d-none");
      
        
    }
    else {
        empty.classList.remove("d-none");
        empty.innerHTML="incorrect email or password"
    }
}
function first(){
for(var i=0 ; i<users.length;i++){
    if(emailInput.value==users[i].email&&passwordInput.value==users[i].password){
        
       window.open("home.html","_self","","");
      
       return true;

    } }}

