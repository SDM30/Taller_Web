export class Articulo {
  constructor(nombre, imagenURL, CPU, RAM, ROM, Graficos, Año, precio) {
    this.nombre = nombre;
    this.CPU = CPU;
    this.RAM = RAM;
    this.ROM = ROM;
    this.Graficos = Graficos;
    this.Año = Año;
    this.imagenURL = imagenURL;
    this.precio = precio;
  }

  generarArticulosHTML() {
    let html = `
      <article class="producto">
        <img src="${this.imagenURL}" class="img-producto" alt="Imagen del producto" />
        <h3 class="nombre-producto">${this.nombre}</h3>
        <ul class="atributos-producto">
          <li class="CPU"><strong>CPU:</strong> ${this.CPU}</li>
          <li class="RAM"><strong>RAM:</strong> ${this.RAM}</li>
          <li class="ROM"><strong>ROM:</strong> ${this.ROM}</li>
          <li class="Graficos"><strong>Gráficos:</strong> ${this.Graficos}</li>
          <li class="Año"><strong>Año:</strong> ${this.Año}</li>
        </ul>
        <p class="precio-producto">$${this.precio}</p>
        <button class="introducir-carrito">Agregar al carrito</button>
      </article>
    `;

    return html;
  }

  equals(otherArticulo) {
    return (
      this.nombre === otherArticulo.nombre &&
      this.imagenURL === otherArticulo.imagenURL &&
      this.CPU === otherArticulo.CPU &&
      this.RAM === otherArticulo.RAM &&
      this.ROM === otherArticulo.ROM &&
      this.Graficos === otherArticulo.Graficos &&
      this.Año === otherArticulo.Año &&
      this.precio === otherArticulo.precio
    );
  }
}

export const listaArticulos = [
  new Articulo(
    "Producto 1",
    "../images/placeholder.jpg",
    "Intel i5",
    "8GB",
    "256GB",
    "Intel UHD",
    "2022",
    1000
  ),
  new Articulo(
    "Producto 2",
    "../images/placeholder.jpg",
    "AMD Ryzen 5",
    "16GB",
    "512GB",
    "AMD Radeon",
    "2023",
    2000
  ),
  new Articulo(
    "Producto 3",
    "../images/placeholder.jpg",
    "Intel i7",
    "32GB",
    "1TB",
    "NVIDIA GTX 1650",
    "2021",
    3000
  ),
  new Articulo(
    "Producto 4",
    "../images/placeholder.jpg",
    "AMD Ryzen 7",
    "16GB",
    "1TB",
    "NVIDIA RTX 3060",
    "2023",
    4000
  ),
  new Articulo(
    "Producto 5",
    "../images/placeholder.jpg",
    "Intel i9",
    "64GB",
    "2TB",
    "NVIDIA RTX 4090",
    "2024",
    5000
  ),
];
