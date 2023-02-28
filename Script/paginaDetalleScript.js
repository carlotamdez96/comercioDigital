window.onload=function(){
  //Referencias
    document.querySelector(".navegador__atras").addEventListener("click",vuelveatras);
    var cantidad=0;
    var divcarrito = document.querySelector(".carrito");
    var miMap = new Map();
    const carrito =document.querySelector(".navegador__carrito");
    carrito.addEventListener("click",function(){
      pintaCarrito(miMap);
    });
    var cuerpo = document.querySelector(".cuerpo");
      //DATOS RECUPERADOS DEL SESSIONSTORAGE
    var perfil = JSON.parse(sessionStorage.getItem("llavero"));
// localStorage.clear();
    //MIRAR AQUI!!!!!!!!!!!!!!
    if(localStorage.key!=null){
     
      for (let i =0, len = localStorage.length; i<len; i++) {
          var key = localStorage.key(i);
          var value = JSON.parse(localStorage[key]);
          miMap.set(key,value);
      }
  };
    // let cont =0;
    // if(localStorage.getItem(cont)!=null){
    //   for (const iterator of JSON.parse(localStorage.getItem(cont))) {
    //     miMap.set(cont,iterator);
    //   }
      
    // }
    
   
    pintaDatos(perfil);
  
    function vuelveatras(){
      for (let [nombre,objeto] of miMap) {
        localStorage.setItem(nombre,JSON.stringify(objeto));
    }

      window.location.href="pagina.html"
    }
//Funcion que pintará la foto y el cuerpo
    function pintaDatos(perfil){
        var imagen = document.createElement("img");
        imagen.classList.add("cuerpo__imagen");
        imagen.src=`./Imagenes/${perfil.foto}`;
        if(perfil.promocion>0){
          var promocion=true;
        }
        var contenedor = document.createElement("div");
        contenedor.classList.add("contenedor");
        var contenedor1 = document.createElement("div");
        contenedor1.classList.add("contenedor1");
        
          
      
        if(promocion){
          let nuevoPrecio= calculaNuevoPrecio(perfil.precio,perfil.promocion);
          var text=`
          <h1 class="contenedor1__titulo">${perfil.nombre}</h1>
          <p class="contenedor1__precio">${perfil.precio}${perfil.moneda}  <span> ${nuevoPrecio}0${perfil.moneda}</span></p>
          <p class="contenedor1__promocion">${perfil.promocion}%</p>
          <p class="contenedor1__descripcion">${perfil.descripcion}</p>
          `;
          contenedor1.innerHTML=text;
        }else{
          var text=`
          <h1 class="contenedor1__titulo">${perfil.nombre}</h1>
          <p class="contenedor1__precio">${perfil.precio}${perfil.moneda}</p>
          <p class="contenedor1__descripcion">${perfil.descripcion}</p>
          `;
          contenedor1.innerHTML=text;
        }
        
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
        <input  class="contador__texto" name="cantidad" type="text" readonly value="1">
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

    document.querySelector(".contenedor2__boton").addEventListener("click",añadeCarrito);

    //Function para añadir llaveros al carrito
    function añadeCarrito(){
   
      if(divcarrito.classList.contains("carritoA")){
        divcarrito.classList.remove("carritoA");
      }
      //Añadire al carrito la variable perfil donde se encuentra el objeto que añado y ademas debo guardar la cantidad que se va a comprar
      if(texto.value>=1){
        var imagenMini = perfil.foto;
        var nombreMini = perfil.nombre;
        var precioMini = parseFloat(perfil.precio.replace(",","."));
        var monedaMini = perfil.moneda;
        var promocionMini = perfil.promocion;

      }
      //Guardo informacion en mi map

      //Si no esta ya guardado
      if(!(miMap.has(nombreMini)) && promocionMini!=0){
        miMap.set(nombreMini,{
          nombre: nombreMini,
          imagen: imagenMini,
          moneda: monedaMini,
          cantidad: texto.value,
          promocion:promocionMini,
          precio: precioMini*parseFloat(texto.value)*(1-promocionMini/100),

        });
      }else if(!(miMap.has(nombreMini)) && promocionMini==0){
        miMap.set(nombreMini,{
          nombre: nombreMini,
          imagen: imagenMini,
          moneda: monedaMini,
          cantidad: parseFloat(texto.value),
          promocion:promocionMini,
          precio: precioMini*parseFloat(texto.value),
        });
      
      }else{
        //Si ya esta guardado entonces modifico la cantidad que tiene
        let llavero = miMap.get(nombreMini);
        llavero.cantidad=parseFloat(llavero.cantidad)+parseFloat(texto.value);
        llavero.precio = precioMini*(llavero.cantidad);

      }



      //Funcion sumar cantidad al carrito
      
     sumacarrito(carrito);
      
     
      
    }
    //Referencias que necesitare para añadir el numero al carrito
    var suma=0;
    var productoañadido = document.createElement("span");
      productoañadido.classList.add("productoañadido");

    function sumacarrito(carrito){
      var cantidad = texto.value;
      if(cantidad!=0){

        suma=parseInt(suma)+parseInt(cantidad);
        productoañadido.innerText="";
        productoañadido.textContent=suma;
        
        carrito.appendChild(productoañadido);
      }
       
    }

    function calculaNuevoPrecio(precio,promocion){
      var dinero = parseFloat(precio,10);
      var descuento = parseFloat(promocion,10);
      return dinero*(1-(descuento/100));
  }
 
  //Function de pintar carrito
  function pintaCarrito(miMap){
    let contador=0;
    //Primero lo vacio
    divcarrito.innerHTML="";
    
    console.log(miMap);
    if(miMap.size>0){

    //Recorro el mapa donde estan los productos
    for (let [nombre,llavero] of miMap) {
      contador+= llavero.precio;
        var contenedor = document.createElement("div");
        contenedor.classList.add("carrito__contenedor");
        contenedor.innerHTML=`
          <div class="contenedor__imagen" >
              <img src=./Imagenes/${llavero.imagen} width="100">
          </div>
          <div class="contenedor__texto">
              <p class="texto__titulo">${nombre}</p>
              <p class="texto__precio">${llavero.precio}${llavero.moneda}</p>
              <div class="texto__unidades">
                Cantidad:${llavero.cantidad}    
            </div>
           
          </div>
        `;
        divcarrito.appendChild(contenedor);
        var adicional=` <div class="contenedor__resumen">
        <p class="resumen__total">Total:${contador}${llavero.moneda}</p>
        <a class="resumen__factura">Generar factura</a>
      </div>`
    }
   
    divcarrito.innerHTML+=adicional;
  }else{
      divcarrito.innerHTML=`<h2>Carrito vacio</h2>`;
        divcarrito.style.height="5vh";
  }
    divcarrito.classList.toggle("carritoA");
       

  }



}