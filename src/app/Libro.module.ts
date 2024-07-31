/**
 * Clase que representa un libro en el sistema.
 */
export class Libro {
  libroId?: number;
  titulo: string;
  autor: string;
  descripcion: string;
  genero: string;
  editorial: string;
  portada: string;
  disponibilidad: boolean;
  reservado: boolean; // Indica si el libro está reservado

  /**
   * Constructor de la clase Libro.
   * @param libroId - El ID del libro (opcional).
   * @param titulo - El título del libro.
   * @param autor - El autor del libro.
   * @param descripcion - Una breve descripción del libro.
   * @param genero - El género del libro.
   * @param editorial - La editorial del libro.
   * @param portada - La URL de la imagen de portada del libro.
   * @param disponibilidad - Indica si el libro está disponible para préstamo.
   * @param reservado - Indica si el libro está reservado.
   */
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
