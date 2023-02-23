window.onload=function(){

    const cuerpo = document.querySelector(".cuerpo");

    
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
            var cuerpo_ficha = document.createElement("div");
            cuerpo_ficha.classList.add("cuerpo__ficha");
            var contenedorImagen= document.createElement("div");
            contenedorImagen.classList.add("ficha__contenedor__imagen");
            var imagen = document.createElement("img");
            
            imagen.classList.add("ficha__imagen");
            let img=producto.foto;
            imagen.src=`./Imagenes/${img}`;
            imagen.alt="llavero de letra"+producto.nombre;
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
    function abreProductoDetalle(){
        window.location.href="paginaDetalle.html";
    }
}