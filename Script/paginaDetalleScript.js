window.onload=function(){
  //Referencias
    document.querySelector(".navegador__atras").addEventListener("click",()=>window.location.href="pagina.html");
    

    var cuerpo = document.querySelector(".cuerpo");
      //DATOS RECUPERADOS DEL SESSIONSTORAGE
    var perfil = JSON.parse(sessionStorage.getItem("llavero"));
    pintaDatos(perfil);
  
    
//Funcion que pintará la foto y el cuerpo
    function pintaDatos(perfil){
        var imagen = document.createElement("img");
        imagen.classList.add("cuerpo__imagen");
        imagen.src=`./Imagenes/${perfil.foto}`;
        
        var contenedor = document.createElement("div");
        contenedor.classList.add("contenedor");
        var contenedor1 = document.createElement("div");
        contenedor1.classList.add("contenedor1");
        var text=`
        <h1 class="contenedor1__titulo">${perfil.nombre}</h1>
        <p class="contenedor1__precio">${perfil.precio}${perfil.moneda}</p>
        <p class="contenedor1__descripcion">${perfil.descripcion}</p>
        `;
        contenedor1.innerHTML=text;
        contenedor.appendChild(contenedor1);

        cuerpo.appendChild(imagen);
        
        var contenedor2 = document.createElement("div");
        contenedor2.classList.add("contenedor2");
        var boton = document.createElement("button");
        boton.classList.add("contenedor2__boton");
        boton.textContent="Comprar"
        var contenedorcontador= document.createElement("div");
        contenedorcontador.classList.add("contenedor2__contenedorContador");
        contenedorcontador.innerHTML+=`
        <button class="contador__decremento" >-</button>
        <input  class="contador__texto" name="cantidad" type="text" readonly value="0">
        <button class="contador__cremento"  >+</button>  
        `;
        contenedor2.appendChild(boton);
        contenedor2.appendChild(contenedorcontador);
        contenedor.appendChild(contenedor2);
        cuerpo.appendChild(contenedor);
    }

   
      
    //Eventos y funciones de los botones de decremento y aumento
    var texto = document.querySelector(".contador__texto");
    document.querySelector(".contador__cremento").addEventListener("click",inc);
    document.querySelector(".contador__decremento").addEventListener("click",dec);
      function inc() {
      texto.value = parseInt(texto.value) + 1;
      }
      function dec() {
          if (parseInt(texto.value) > 0) {
          texto.value = parseInt(texto.value) - 1;
        }
      }


       //Evento para el boton de comprar
    boton.addEventListener("click",añadeCarrito);

    function añadeCarrito(){
      //Añadire al carrito la variable perfil donde se encuentra el objeto que añado y ademas debo guardar la cantidad que se va a comprar
    }

}