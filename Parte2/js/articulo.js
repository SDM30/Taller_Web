export class Articulo {
  constructor(nombre, imagenURL, CPU, RAM, ROM, Graficos, anio, precio) {
    this.nombre = nombre;
    this.CPU = CPU;
    this.RAM = RAM;
    this.ROM = ROM;
    this.Graficos = Graficos;
    this.anio = anio;
    this.imagenURL = imagenURL;
    this.precio = precio;
  }

  generarArticulosHTML() {
    let html = `
      <article class="producto">
      <div class="imagen-contenedor">
        <img src="${this.imagenURL}" class="img-producto" alt="Imagen del producto" />
      </div>
      <div class="contenido-producto">
        <h3 class="nombre-producto">${this.nombre}</h3>
        <ul class="atributos-producto">
          <li class="CPU"><strong>CPU:</strong> ${this.CPU}</li>
          <li class="RAM"><strong>RAM:</strong> ${this.RAM}</li>
          <li class="ROM"><strong>ROM:</strong> ${this.ROM}</li>
          <li class="Graficos"><strong>Gráficos:</strong> ${this.Graficos}</li>
          <li class="Anio"><strong>Año:</strong> ${this.anio}</li>
        </ul>
        <p class="precio-producto">$${this.precio}</p>
        <button class="introducir-carrito">Agregar al carrito</button>
      </div>
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
      this.anio === otherArticulo.anio &&
      this.precio === otherArticulo.precio
    );
  }
}

export const listaArticulos = [
  new Articulo(
    "Altair 8800",
    "../images/altair8800.jpg",
    "Intel 8080 @ 2MHz",
    "256 bytes",
    "Disquetes externos",
    "Luces LED",
    "1975",
    5000
  ),
  new Articulo(
    "Apple II",
    "../images/appleii.jpg",
    "MOS 6502 @ 1MHz",
    "4KB",
    'Cassette o disquete 5.25"',
    "280x192",
    "1977",
    2500
  ),
  new Articulo(
    "IBM PC 5150",
    "../images/ibmpc5150.jpeg",
    "Intel 8088 @ 4.77MHz",
    "16KB",
    "160KB",
    "CGA",
    "1981",
    3500
  ),
  new Articulo(
    "Commodore 64",
    "../images/c64.webp",
    "MOS 6510 @ 1MHz",
    "64KB",
    'Cassette o disquete 5.25"',
    "VIC-II",
    "1982",
    800
  ),
  new Articulo(
    "Sinclair ZX Spectrum",
    "../images/zxspectrum.jpg",
    "Z80 @ 3.5MHz",
    "16KB/48KB",
    "Cassette",
    "ULA",
    "1982",
    600
  ),
  new Articulo(
    "BBC Micro",
    "../images/bbcmicro.png",
    "MOS 6502 @ 2MHz",
    "16KB (Model A)",
    'Cassette o disquete 5.25"',
    "640x256",
    "1981",
    1200
  ),
  new Articulo(
    "NEC PC-8801",
    "../images/necpc8801.jpg",
    "μPD780C @ 4MHz",
    "64KB",
    " 1MB",
    "640x400 (8 colores)",
    "1981",
    1500
  ),
  new Articulo(
    "Dragon 32",
    "../images/dragon32.jpg",
    "Motorola 6809E @ 0.89MHz",
    "32KB",
    "Cassette",
    "MC6847",
    "1982",
    700
  ),
  new Articulo(
    "Thomson TO7",
    "../images/thomsonTO7.jpg",
    "Motorola 6809 @ 1MHz",
    "8KB",
    "Cassette",
    "320x200",
    "1982",
    900
  ),
  new Articulo(
    "Electronika BK-0010",
    "../images/electronikaBK.jpg",
    "PDP-11 LSI-11 @ 3MHz",
    "32KB",
    'Disquete 5.25"',
    "512x256 (monocromo)",
    "1985",
    2000
  ),
];
