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
    // Subir al artículo principal
    const articulo = evento.target.closest(".producto");
    const nombreArticulo = articulo.querySelector(".nombre-producto").innerHTML;
    const CPU = articulo.querySelector(".CPU").innerHTML;
    const RAM = articulo.querySelector(".RAM").innerHTML;
    const ROM = articulo.querySelector(".ROM").innerHTML;
    const Graficos = articulo.querySelector(".Graficos").innerHTML;
    const Anio = articulo.querySelector(".Anio").innerHTML;
    // Convertir el precio a número eliminando cualquier formato
    const precioArticulo = parseFloat(
      articulo
        .querySelector(".precio-producto")
        .innerHTML.replace(/[^0-9.-]+/g, "")
    );
    const imagenArticulo = articulo.querySelector(".img-producto").src;

    const articuloElegido = new Articulo(
      nombreArticulo,
      imagenArticulo,
      CPU,
      RAM,
      ROM,
      Graficos,
      Anio,
      precioArticulo
    );

    // Obtener la instancia del articulo o indefinido
    const articuloExistente = carrito.find(
      (articuloInCarrito) =>
        articuloInCarrito.articulo.nombre === articuloElegido.nombre
    );

    if (articuloExistente) {
      articuloExistente.cantidad += 1;
    } else {
      const articuloCar = new ArticuloCarrito(articuloElegido, 1);
      carrito.push(articuloCar);
    }

    // Actualizar la tabla inmediatamente después de agregar
    generarTablaHTML();
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
const CPU = document.getElementById("txtCPU");
const RAM = document.getElementById("txtRAM");
const ROM = document.getElementById("txtROM");
const Graficos = document.getElementById("txtGraficos");
const Anio = document.getElementById("txtAnio");
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

  // Validar que el precio sea mayor o igual a 1000
  if (precioNumerico < 1000) {
    alertaArticulo.textContent = "El precio debe ser mayor o igual a 1000";
    alertaArticulo.hidden = false;
    return;
  }

  // Crear el artículo
  const articuloCreado = new Articulo(
    nombreProducto.value.trim(),
    imagenURL.value.trim(),
    CPU.value.trim(),
    RAM.value.trim(),
    ROM.value.trim(),
    Graficos.value.trim(),
    Anio.value.trim(),
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

  // Volver a agregar los event listeners
  const nuevosArticulos = document.querySelectorAll(".producto");
  nuevosArticulos.forEach((articulo) => {
    articulo.addEventListener("mouseenter", (evento) => {
      evento.target.style.background = "gray";
    });
    articulo.addEventListener("mouseleave", (evento) => {
      evento.target.style.background = "white";
    });
  });

  const botonAgregarArt = document.querySelectorAll(".introducir-carrito");
  botonAgregarArt.forEach((boton) => {
    boton.addEventListener("click", (evento) => {
      // Subir al artículo principal
      const articulo = evento.target.closest(".producto");
      const nombreArticulo =
        articulo.querySelector(".nombre-producto").innerHTML;
      const CPU = articulo.querySelector(".CPU").innerHTML;
      const RAM = articulo.querySelector(".RAM").innerHTML;
      const ROM = articulo.querySelector(".ROM").innerHTML;
      const Graficos = articulo.querySelector(".Graficos").innerHTML;
      const Anio = articulo.querySelector(".Anio").innerHTML;
      // Convertir el precio a número eliminando cualquier formato
      const precioArticulo = parseFloat(
        articulo
          .querySelector(".precio-producto")
          .innerHTML.replace(/[^0-9.-]+/g, "")
      );
      const imagenArticulo = articulo.querySelector(".img-producto").src;

      const articuloElegido = new Articulo(
        nombreArticulo,
        imagenArticulo,
        CPU,
        RAM,
        ROM,
        Graficos,
        Anio,
        precioArticulo
      );

      const articuloExistente = carrito.find(
        (articuloInCarrito) =>
          articuloInCarrito.articulo.nombre === articuloElegido.nombre
      );

      if (articuloExistente) {
        articuloExistente.cantidad += 1;
      } else {
        const articuloCar = new ArticuloCarrito(articuloElegido, 1);
        carrito.push(articuloCar);
      }

      console.log(carrito);
    });
  });
}

//Revisar creacion de articulos repetidos
function revisarArticuloRepetido(articulo) {
  return listaArticulos.some(
    (artTienda) =>
      artTienda.nombre.toLowerCase() === articulo.nombre.toLowerCase()
  );
}
