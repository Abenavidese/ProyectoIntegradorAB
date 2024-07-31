import { Libro } from "./Libro.module";
import { Usuario } from "./Usuario.module";

/**
 * Clase que representa una reserva de un libro por un usuario.
 */
export class Reserva {
  reservaId?: number;
  libro: Libro;
  usuario: Usuario;
  fechaReserva: string;
  reservado: boolean;

  /**
   * Constructor de la clase Reserva.
   * @param reservaId - El ID de la reserva (opcional).
   * @param libro - El libro reservado.
   * @param usuario - El usuario que realizó la reserva.
   * @param fechaReserva - La fecha en que se realizó la reserva.
   * @param reservado - Indica si el libro está actualmente reservado.
   */
  constructor(reservaId: number, libro: Libro, usuario: Usuario, fechaReserva: string, reservado: boolean) {
    this.reservaId = reservaId;
    this.libro = libro;
    this.usuario = usuario;
    this.fechaReserva = fechaReserva;
    this.reservado = reservado;
  }
}
