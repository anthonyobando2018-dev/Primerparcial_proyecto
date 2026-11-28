const btnEnviar = document.querySelector("#enviar");
const btnOtro = document.querySelector(".otro");


//seleccionar elementos y asociarles un evento
/*btnEnviar.addEventListener("click", function(evento){
    console.log(evento);
    evento.preventDefault();//por defecto recarga

})*/

//Eventos de teclado
const nombre = document.querySelector("#nombre");
const correo = document.querySelector("#correo");
const telefono = document.querySelector("#telefono");
const asunto  = document.querySelector("#asunto");
const mensaje = document.querySelector("#mensaje");
const acepto = document.querySelector("#acepto");

nombre.addEventListener("input", leerTexto);
correo.addEventListener("input", leerTexto);
telefono.addEventListener("input", leerTexto);
asunto.addEventListener("change", leerTexto);
mensaje.addEventListener("input", leerTexto);
acepto.addEventListener("change", leerTexto);

function leerTexto(e) {
  if (e.target.type === "checkbox") {
    datos[e.target.id] = e.target.checked;
  } else {
    datos[e.target.id] = e.target.value;
  }
  console.log(datos);
}
const datos = {
    nombre: "",
    correo: "",
    telefono: "",
    asunto: "",
    mensaje: "",
    acepto: false
}


//Eventos de formulario
const formulario = document.querySelector("#form-contacto");
formulario.addEventListener("submit", function(evento){
    evento.preventDefault();
    //validar formulario
    const {nombre, correo, asunto, mensaje, acepto} = datos // Destructuring 
    if(nombre.trim() === "" || correo.trim() === "" || asunto.trim() === "" || mensaje.trim() === "" || !acepto){
        console.log("Faltan campos obligatorios")
        mostrarError("FALTAN CAMPOS OBLIGATORIOS");
        return;
    }
    //Enviar formulario
    console.log("Enviando Formulario.....");
    mostrarError("Formulario enviado Correctamente");
    mostrarOk(exito);
})
function mostrarError(mensaje) {
    const error = document.createElement("P");
    error.textContent = mensaje;
    error.classList.add("error");
    formulario.appendChild(error);
    
    
}
function mostrarOk(mensaje){
    const exito = document.querySelector("#exito");
}