 
 if(JSON.parse(localStorage.getItem('users'))!=null){

    users=JSON.parse(localStorage.getItem('users'));
}

var welcomName=document.getElementById("wname");
var logOut =document.getElementById("logout");
/** 
for(var i=0 ; i<users.length;i++){
    if(emailInput.value==users[i].email&&passwordInput.value==users[i].password){
        
welcomName.innerHTML=`Welcome ${ users[i].name}`
    }}
   */
   
  logOut.addEventListener("click",function(){

        window.open("index.html","_self","","");
       
    })
   