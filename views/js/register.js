/*
var name = $("#uname").val();
var correo = $("#umail").val();
var matricula = $("#uid").val();
var carrera = $("#umajor").val();
var contrasena = $("#password").val();
var ccontrasena = $("#cpassword").val();

$("#Benviar").on("click",sender(name,correo,matricula,carrera,contrasena,ccontrasena));

function incompletevalues(){
    alert("Existen campos incompletos o incorrectos");
}

function sender(e,name,correo,matricula,carrera,contrasena,ccontrasena){
    e.preventDefault();
   // var name = $("#uname").val();
    if(name ===""){
        incompletevalues();
    }
    //var correo = $("#umail").val();
    if(correo ===""){
        incompletevalues();
    }    
    //var matricula = $("#uid").val();
    if(matricula ==="" || matricula.length <8){
        incompletevalues();
    }
    //var carrera = $("#umajor").val();
    //var contrasena = $("#password").val();
    //var ccontrasena = $("#cpassword").val();
    if(contrasena!=ccontrasena){
        alert("Las contraseñas no coinciden");
    }
    else{
        alert("El formulario se ha enviado correctamente")
    }

}
*/


