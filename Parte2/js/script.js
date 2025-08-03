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
// Mostrar/ocultar el carrito
const carritoContainer = document.querySelector("#carrito-container");
const tablaContainer = document.querySelector("#tabla-container");

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
const alertaCarrito = document.querySelector("#alerta-carrito");

carritoContainer.addEventListener("mouseenter", () => {
  generarTablaHTML();
  tablaContainer.style.display = "block";
});

carritoContainer.addEventListener("mouseleave", (evento) => {
  // Verificar si el ratón está sobre la tabla
  setTimeout(() => {
    if (!tablaContainer.matches(":hover")) {
      tablaContainer.style.display = "none";
    }
  }, 300);
});

tablaContainer.addEventListener("mouseleave", () => {
  tablaContainer.style.display = "none";
});

// TODO #2.1: Crear tabla de articulos (imagen, nombre, precio, cantidad, subtotal)
function generarTablaHTML() {
  tablaBody.innerHTML = "";
  for (const articulo of carrito) {
    agregarArticuloTabla(articulo);
  }

  // Manejar visibilidad de alerta
  if (carrito.length === 0) {
    alertaCarrito.style.display = "block";
    document.querySelector("#tabla-articulos").style.display = "none";
  } else {
    alertaCarrito.style.display = "none";
    document.querySelector("#tabla-articulos").style.display = "table";
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
const botonVaciar = document.querySelector("#vaciar");

botonVaciar.addEventListener("click", () => {
  carrito.length = 0;
  generarTablaHTML();
});
// Agregar un nuevo articulo a la tienda
const formulario = document.getElementById("formulario-articulo");
const alertaArticulo = document.getElementById("alerta-articulo");
const nombreProducto = document.getElementById("txtNombre");
const imagenURL = document.getElementById("urlImagen");
const atributo1 = document.getElementById("txtAtributo1");
const atributo2 = document.getElementById("txtAtributo2");
const atributo3 = document.getElementById("txtAtributo3");
const precio = document.getElementById("txtPrecio");

// TODO #4: Crear tarjeta del nuevo articulo con los datos suministrados por el usuario

const botonCrear = document.querySelector("#enviar-formulario");
formulario.addEventListener("submit", (e) => {
  e.preventDefault();

  // Validación de URL de imagen
  try {
    new URL(imagenURL.value);
  } catch {
    alertaArticulo.textContent = "La URL de la imagen no es válida";
    alertaArticulo.hidden = false;
    return;
  }

  // Convertir precio a número
  const precioNumerico = parseFloat(precio.value);

  // Validación del precio
  if (isNaN(precioNumerico)) {
    alertaArticulo.textContent = "El precio debe ser un número válido";
    alertaArticulo.hidden = false;
    return;
  }

  // TODO #4.1: Mostrar alerta si el precio es menor a 1000 y no permitir su creacion
  if (precioNumerico < 1000) {
    alertaArticulo.textContent = "El precio debe ser mayor o igual a 1000";
    alertaArticulo.hidden = false;
    return;
  }

  // Crear el artículo
  const articuloCreado = new Articulo(
    nombreProducto.value.trim(),
    imagenURL.value.trim(),
    atributo1.value.trim(),
    atributo2.value.trim(),
    atributo3.value.trim(),
    precioNumerico
  );

  // Validar artículo repetido
  if (revisarArticuloRepetido(articuloCreado)) {
    alertaArticulo.textContent = "Ya existe un artículo con ese nombre";
    alertaArticulo.hidden = false;
    return;
  }

  // Si pasa todas las validaciones
  alertaArticulo.hidden = true;
  listaArticulos.push(articuloCreado);
  actualizarArticulosDisponibles();
  formulario.reset();

  console.log("Artículo creado:", articuloCreado);
});

//Actualizar lista de articulos de la tienda
function actualizarArticulosDisponibles() {
  document.querySelector("#productos").innerHTML = "";
  for (const articulo of listaArticulos) {
    const articuloHTML = articulo.generarArticulosHTML();
    document.querySelector("#productos").innerHTML += articuloHTML;
  }
}

//Revisar creacion de articulos repetidos
function revisarArticuloRepetido(articulo) {
  return listaArticulos.some(
    (artTienda) =>
      artTienda.nombre.toLowerCase() === articulo.nombre.toLowerCase()
  );
}
