//Sections ocultos
document.querySelector(".insideFirstPage").style.display = "none";
document.querySelector(".createAccountPage").style.display = "none";
document.querySelector(".logInPage").style.display = "none";
document.querySelector(".aboutUs").style.display = "none";

//Función que llama al formulario para crear una nueva cuenta
function newAccount(){
  document.querySelector(".createAccountPage").style.display = "block";
  document.querySelector(".welcomePage").style.display = "none";
}

document.querySelector(".createAccount").addEventListener("click", newAccount);

//Función que llama al formulario para ingresar a la cuenta
function logIn (){
  document.querySelector(".logInPage").style.display = "block";
  document.querySelector(".welcomePage").style.display = "none";
}
document.querySelector(".logIn").addEventListener("click", logIn);

//Función que se ejecuta al dar click en crear una nueva cuenta
function createNewAccount(){
const email = document.querySelector(".createAccountEmail").value;
const password = document.querySelector(".createAccountPassword").value;
if(email === ""){
  alert("Ingresa un email");
 return false;
 }else if (password === ""){
  alert("Ingresa una contraseña");
 }else if (document.querySelector(".createAccountName").value === ""){
  alert("Ingresa un nombre de usuario");
 }else{
  //Las validaciones que necesitas hacer
firebase.auth().createUserWithEmailAndPassword(email, password).then (function(){
  verify();
    })
.catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  alert("Ingresa un email válido");
  var errorMessage = error.message;
  console.log (errorMessage);
  // ...
});
 }
}

document.querySelector(".btnCreateAccount").addEventListener("click", createNewAccount);

//Función que se ejecuta al dar click en el botón de entrar
function btnLogIn(){
 
  const email= document.querySelector(".logInEmail").value;
  const password= document.querySelector(".logInPassword").value;
  document.querySelector(".logInEmail").value = " ";
  document.querySelector(".logInPassword").value = "";
  if(email === ""){
    alert("Ingresa un email");
   return false;
   
   }else{

  firebase.auth().signInWithEmailAndPassword(email, password).then (function(){
    observer();
      })
  .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    alert("Ingresa un email  y una constraseña válidos");
    var errorMessage = error.message;
    console.log(errorMessage);
    // ...
    document.querySelector(".insideFirstPage").style.display = "none";
  });
}
}
document.querySelector(".btnLogIn").addEventListener("click", btnLogIn);

//Función que permite saber si el usurio está activo, es decir que está dentro de su cuenta y abre la pantallad e la red social
function observer(){
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      activeUser ();
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
      // ...
    } else {
      // User is signed out.
      // ...
    }
  });
}
//Función que desactiva los formularios de registro y de inicio de sesión y activa la pantalla de la red social
function activeUser (){
 document.querySelector(".insideFirstPage").style.display = "block";
 document.querySelector(".logInPage").style.display = "none";
}
//Función para cerrar sesión
function close(){
  firebase.auth().signOut()
  .then (function(){
    document.querySelector(".insideFirstPage").style.display = "none";
    document.querySelector(".logInPage").style.display = "block";
  }).catch(function(error){
    console.log (error);
  })
}

document.querySelector(".btnLogOut").addEventListener("click", close);

document.querySelector(".logInPassword").addEventListener('keypress', logKey);
//Función del enter
function logKey(e) {
  key = (document.all) ? e.keyCode : e.which;
  if (key==13) btnLogIn();
}
//Función que muestra ¿Quienes somos? y ocualta las demás pantallas
function pageInformation (){
  document.querySelector(".aboutUs").style.display = "block";
  document.querySelector(".insideFirstPage").style.display = "none";
document.querySelector(".createAccountPage").style.display = "none";
document.querySelector(".logInPage").style.display = "none";
document.querySelector(".welcomePage").style.display = "none";
}
document.querySelector(".pageInformation").addEventListener("click", pageInformation);

var user = firebase.auth().currentUser;
//Función que envía correo de verificación al usuario que se registra
function verify(){
  var user = firebase.auth().currentUser;
user.sendEmailVerification().then(function() {
  alert("Te enviamos un  correo de autentificación ");
  document.querySelector(".logInPage").style.display = "block";
  document.querySelector(".createAccountPage").style.display = "none";
}).catch(function(error) {
  console.log ("error");
});
}