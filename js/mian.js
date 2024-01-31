//localStorage.clear();

var uname = document.getElementById("username");
var uemail = document.getElementById("useremail");
var upass = document.getElementById("userpassword");
var logemail = document.getElementById("logemail");
var logpass = document.getElementById("logpass");
var signup = document.getElementById("signup");
var login = document.getElementById("login");
var loginpage = document.getElementById("loginpage");
var homePage = document.getElementById("homePage");

var users ;

if (localStorage.getItem("users") == null) {
  users = [];
} else {
  users = JSON.parse(localStorage.getItem("users"));
}
console.log(users);

function showSignUp(){
    login.classList.add("d-none")
    signup.classList.remove("d-none")
}
function showLogin(){
    login.classList.remove("d-none")
    signup.classList.add("d-none")
}

function validateLoginInputs(){
     for (var i=0;i<users.length;i++){
        if (users[i].email==logemail.value && users[i].password==logpass.value){
          return   users[i].name  ;
        }
}
  return false; 
}

function loginOperation(){
  var holder = "";
  document.getElementById("loginwarning").innerText = holder;

  if(logemail.value == "" || logpass.value == "" ){

    //if the inputs are empty 
      holder ="Please Enter All Inputs"; 
     document.getElementById("loginwarning").innerText = holder;
       
    }
  else{
      //if the user enters the correct email and pass
      var name = validateLoginInputs();
    
        if(name)
         {
      loginpage.classList.add("d-none");
      homePage.classList.remove("d-none");
      document.getElementById("homeContent").innerText = `Welcome ${name}`;
  }
        else{
      holder = "Incorrect email or password";
      document.getElementById("loginwarning").innerText = holder;
   }
    }
clear();
   
}
   
function discoverDuplicateEmail(){

  for (var i=0; i<users.length ;i++ ){
    if(uemail.value == users[i].email){

      console.log(uemail.value, "is  in the array ");
      return false;
    }
    }
    console.log(uemail.value, "is not in the array ");
     return true;  
}


function adduser() {

  var holder ="";
  document.getElementById("signwarning").innerText = holder;
  var teta = discoverDuplicateEmail();
  console.log(teta);

     if (reviewEmail()) {
       if (teta) {
         var userinfo = {
           name: uname.value,
           email: uemail.value,
           password: upass.value,
         };
         users.push(userinfo);
         localStorage.setItem("users", JSON.stringify(users));
        showLogin();
       }
        else {
        holder = "This Email is registered before ! try another one ";
        document.getElementById("signwarning").innerText = holder ; 

         return false;
       }
     } else {
      holder = "Enter a valid Email"; 
    document.getElementById("signwarning").innerText =  holder ;

       console.log(users);
     }
    clear();
    

}


function reviewEmail(){

var regex = /[a-zA-Z0-9]{3,}@[a-zA-Z]{3,}.com$/;
if(regex.test(uemail.value)){
return true;
}
else{
    return false ;
}
}

function clear (){
  uname.value="";
  upass.value="";
  uemail.value="";
  logemail.value="";
  logpass.value="";
}

function logout (){

  loginpage.classList.remove("d-none");   
  homePage.classList.add("d-none");

}