import { Libro } from "./Libro.module";
import { Usuario } from "./Usuario.module";

/**
 * Clase que representa un préstamo de un libro por un usuario.
 */
export class Prestamo {
  prestamoId?: number;
  libro: Libro;
  usuario: Usuario;
  fechaPrestamo: string;
  fechaDevolucion: string;

  /**
   * Constructor de la clase Prestamo.
   * @param prestamoId - El ID del préstamo.
   * @param libro - El libro que ha sido prestado.
   * @param usuario - El usuario que realiza el préstamo.
   * @param fechaPrestamo - La fecha en la que se realizó el préstamo.
   * @param fechaDevolucion - La fecha en la que se debe devolver el libro.
   */
  constructor(prestamoId: number, libro: Libro, usuario: Usuario, fechaPrestamo: string, fechaDevolucion: string) {
    this.prestamoId = prestamoId;
    this.libro = libro;
    this.usuario = usuario;
    this.fechaPrestamo = fechaPrestamo;
    this.fechaDevolucion = fechaDevolucion;
  }
}
