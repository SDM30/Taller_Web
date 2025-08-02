import { Articulo, listaArticulos } from "./articulo.js";

// Seleccionar articulo
//const articulo = document.querySelector(".producto");
const tabla = document.querySelector("#tabla-articulos");
const tablaBody = document.querySelector("#tabla-body");

// Cargar Articulos
listaArticulos.forEach((articulo) => {
  const articuloHTML = articulo.generarArticulosHTML();
  document.querySelector("#productos").innerHTML += articuloHTML;
});

// TODO #0: Crear carrito de compras (lista vacia de articulos)
class ArticuloCarrito {
  constructor(articulo, cantidad) {
    this.articulo = articulo;
    this.cantidad = cantidad;
  }
}

const carrito = [];

// TODO #1: Cuando el usuario haga click sobre el artículo de la tienda se debe agregar al carro de compras
const articulos = document.querySelectorAll(".producto");
articulos.forEach((articulo) => {
  //console.log(articulo.innerHTML);
  articulo.addEventListener("mouseenter", (evento) => {
    evento.target.style.background = "gray";
  });
});

articulos.forEach((articulo) => {
  //console.log(articulo);
  articulo.addEventListener("mouseleave", (evento) => {
    evento.target.style.background = "white";
  });
});

const botonesAgregarCar = document.querySelectorAll(".introducir-carrito");

botonesAgregarCar.forEach((boton) => {
  boton.addEventListener("click", (evento) => {
    const articulo = evento.target.parentElement;
    //console.log(articulo.innerHTML);

    // Cargar sus atributos a partir de la clase
    const nombreArticulo = articulo.querySelector(".nombre-producto").innerHTML;
    const atributo1 = articulo.querySelector(".atributo1").innerHTML;
    const atributo2 = articulo.querySelector(".atributo2").innerHTML;
    const atributo3 = articulo.querySelector(".atributo3").innerHTML;
    const precioArticulo = articulo.querySelector(".precio-producto").innerHTML;
    const imagenArticulo = articulo.querySelector(".img-producto").src;

    const articuloElegido = new Articulo(
      nombreArticulo,
      imagenArticulo,
      atributo1,
      atributo2,
      atributo3,
      precioArticulo
    );

    // Obtener la instancia del articulo o indefinido
    const articuloExistente = carrito.find((articuloInCarrito) => {
      return articuloElegido.equals(articuloInCarrito.articulo);
    });

    if (articuloExistente != undefined) {
      articuloExistente.cantidad += 1;
    } else {
      const articuloCar = new ArticuloCarrito(articuloElegido, 1);
      carrito.push(articuloCar);
    }

    console.log(carrito);
  });
});

// TODO #2: Al hacer hover sobre el logo del carro se debe mostrar la tabla/lista con los articulos seleccionados

const carro = document.querySelector("#carrito");
carro.addEventListener("mouseenter", (evento) => {
  console.log("Hover sobre el carro");
  generarTablaHTML();
});

// TODO #2.1: Crear tabla de articulos (imagen, nombre, precio, cantidad, subtotal)
function generarTablaHTML() {
  tablaBody.innerHTML = "";
  for (const articulo of carrito) {
    agregarArticuloTabla(articulo);
  }
}
// TODO #2.2: Logica de agregar articulos al carro y actualizar la tablas

function agregarArticuloTabla(articulo) {
  const articuloCarHTML = document.createElement("tr");

  articuloCarHTML.innerHTML = `
    <td><img src="${articulo.articulo.imagenURL}" alt="Imagen del producto" /></td>
    <td>${articulo.articulo.nombre}</td>
    <td>${articulo.articulo.precio}</td>
    <td>${articulo.cantidad}</td>
  `;

  tablaBody.appendChild(articuloCarHTML);
}

// TODO #3: Agregar boton vaciar carro

// Agregar un nuevo articulo a la tienda

// TODO #4: Crear tarjeta del nuevo articulo con los datos suministrados por el usuario

// TODO #4.1: Mostrar alerta si el precio es menor a 1000 y no permitir su creacion
