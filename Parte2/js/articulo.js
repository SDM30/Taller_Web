export class Articulo {
  constructor(nombre, imagenURL, atributo1, atributo2, atributo3, precio) {
    this.nombre = nombre;
    this.atributo1 = atributo1;
    this.atributo2 = atributo2;
    this.atributo3 = atributo3;
    this.imagenURL = imagenURL;
    this.precio = precio;
  }

  static revisarURL(url) {
    // validar URL
  }

  generarArticulosHTML() {
    let html = `
      <article class="producto">
        <img src="${this.imagenURL}" class="img-producto" alt="Imagen del producto" />
        <h3 class="nombre-producto">${this.nombre}</h3>
        <ul>
          <li class="atributo1">${this.atributo1}</li>
          <li class="atributo2">${this.atributo2}</li>
          <li class="atributo3">${this.atributo3}</li>
        </ul>
        <p class="precio-producto">${this.precio}</p>
        <button class="introducir-carrito">Agregar al carrito</button>
      </article>
    `;

    return html;
  }

  equals(otherArticulo) {
    return (
      this.nombre === otherArticulo.nombre &&
      this.imagenURL === otherArticulo.imagenURL &&
      this.atributo1 === otherArticulo.atributo1 &&
      this.atributo2 === otherArticulo.atributo2 &&
      this.atributo3 === otherArticulo.atributo3 &&
      this.precio === otherArticulo.precio
    );
  }
}

export const listaArticulos = [
  new Articulo(
    "Producto 1",
    "../images/placeholder.jpg",
    "Atributo 1",
    "Atributo 2",
    "Atributo 3",
    1000
  ),
  new Articulo(
    "Producto 2",
    "../images/placeholder.jpg",
    "Atributo 1",
    "Atributo 2",
    "Atributo 3",
    2000
  ),
  new Articulo(
    "Producto 3",
    "../images/placeholder.jpg",
    "Atributo 1",
    "Atributo 2",
    "Atributo 3",
    3000
  ),
  new Articulo(
    "Producto 4",
    "../images/placeholder.jpg",
    "Atributo 1",
    "Atributo 2",
    "Atributo 3",
    4000
  ),
  new Articulo(
    "Producto 5",
    "../images/placeholder.jpg",
    "Atributo 1",
    "Atributo 2",
    "Atributo 3",
    5000
  ),
];
