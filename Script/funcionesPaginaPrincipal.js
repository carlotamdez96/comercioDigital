window.onload=function(){

    const cuerpo = document.querySelector(".cuerpo");
    const map = new Map();
        //MIRAR AQUI!!!!!!!!!!!!!!
    var miCesta = new Map();
    var divcarrito = document.querySelector(".carrito");
    const carrito =document.querySelector(".encabezado__carrito");
    carrito.addEventListener("click",function(){
      pintaCarrito(miCesta);
    });
    // localStorage.clear();
    if(localStorage.key!=null){
     
        for (let i =0, len = localStorage.length; i<len; i++) {
            var key = localStorage.key(i);
            var value =JSON.parse( localStorage[key]);
            miCesta.set(key,value);
        }
    };
    
    async function recuperaDatos(){
        const response = await fetch("../Datos/productos.json");
        const productos = await response.json();
        trataDatos(productos);
        var imagenes= document.querySelectorAll(".ficha__imagen");
        for (let imagen of imagenes) {
            imagen.addEventListener("click",abreProductoDetalle);
        }
    }

    //Funcion que pintara los datos en la pantalla
    function trataDatos(productos){
        
        for (const producto of productos) {
            map.set(producto.nombre, producto);

            var cuerpo_ficha = document.createElement("div");
            cuerpo_ficha.classList.add("cuerpo__ficha");
            var contenedorImagen= document.createElement("div");
            contenedorImagen.classList.add("ficha__contenedor__imagen");
            var imagen = document.createElement("img");
            
            imagen.classList.add("ficha__imagen");
            let img=producto.foto;
            imagen.src=`./Imagenes/${img}`;
            imagen.alt=producto.nombre;
            contenedorImagen.appendChild(imagen);
            var ficha_contenido = document.createElement("div");
            ficha_contenido.classList.add("ficha__contenido");
            
          if(producto.promocion>0){

            var promocion = document.createElement("span");
            promocion.classList.add("ficha__promocion");
            promocion.textContent=producto.promocion+"%";
            ficha_contenido.innerHTML+=`
            <h3 class="contenido__nombre">${producto.nombre}</h3>`
            var contenidoprecio = document.createElement("p");
            contenidoprecio.classList.add("contenido__precio");
            contenidoprecio.innerHTML=`
            <span class="precio__promocion">${producto.promocion}%</span>
                <span class="precio__precio">${producto.precio}${producto.moneda}</span>`;
            var nuevoPrecio = document.createElement("span");
            nuevoPrecio.classList.add("precio__nuevo");
            nuevoPrecio.textContent= calculaNuevoPrecio(producto.precio,producto.promocion)+producto.moneda;   
            contenidoprecio.appendChild(nuevoPrecio);
            contenedorImagen.appendChild(promocion);

            ficha_contenido.appendChild(contenidoprecio);
            
            
          }else{

            ficha_contenido.innerHTML+=`
            <h3 class="contenido__nombre">${producto.nombre}</h3>
            <p class="contenido__precio">${producto.precio}${producto.moneda}</p>
            `;
            
          }
            cuerpo_ficha.appendChild(contenedorImagen);
            cuerpo_ficha.appendChild(ficha_contenido);
            cuerpo.appendChild(cuerpo_ficha);
           
        }
    }
    function calculaNuevoPrecio(precio,promocion){
        var dinero = parseFloat(precio,10);
        var descuento = parseFloat(promocion,10);
        return dinero*(1-(descuento/100));
    }
   

    recuperaDatos();

    //Redigire a la pagina de detalle de ese producto Y ADEMAS cargare la informacion de ese producto en un SessionStorage
    function abreProductoDetalle(even){
        
        var imagenPasada = even.target;
        let alt = imagenPasada.alt;
        const obj =map.get(alt);
        sessionStorage.setItem("llavero",JSON.stringify(obj));
        
        // let contador =0;
        for (let [nombre,objeto] of miCesta) {
            localStorage.setItem(nombre,JSON.stringify(objeto));
        }
        window.location.href="paginaDetalle.html";
    }




    function pintaCarrito(miCesta){

        //Primero lo vacio
        divcarrito.innerHTML="";
        
        console.log(miCesta);
        
        //Recorro el mapa donde estan los productos
        for (let [nombre,llavero] of miCesta) {
            let contenedor = document.createElement("div");
            contenedor.classList.add("carrito__contenedor");
            contenedor.innerHTML=`
              <div class="contenedor__imagen" >
                  <img src=./Imagenes/${llavero.imagen} width="100">
              </div>
              <div class="contenedor__texto">
                  <p class="texto__titulo">${nombre}</p>
                  <p class="texto__precio">${llavero.precio}${llavero.moneda}</p>
                  <div class="texto__unidades">
                    <button class="contador__decremento">-</button>
                    <span class="contador__texto ">${llavero.cantidad}</span>
                    <button class="contador__cremento">+</button>
                </div>
              </div>
            `;
            
            divcarrito.appendChild(contenedor);
            divcarrito.classList.toggle("carritoA");
           
            
        }
        
    
      }
}