export class Libro {
  libroId?: number;
  titulo: string;
  autor: string;
  descripcion: string;
  genero: string;
  editorial: string;
  portada: string;
  disponibilidad: boolean;
  reservado: boolean; // Nueva propiedad añadida

  constructor(
    libroId: number,
    titulo: string,
    autor: string,
    descripcion: string,
    genero: string,
    editorial: string,
    portada: string,
    disponibilidad: boolean,
    reservado: boolean 
  ) {
    this.libroId = libroId;
    this.titulo = titulo;
    this.autor = autor;
    this.descripcion = descripcion;
    this.genero = genero;
    this.editorial = editorial;
    this.portada = portada;
    this.disponibilidad = disponibilidad;
    this.reservado = reservado; 
  }
}
