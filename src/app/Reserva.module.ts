import { Libro } from "./Libro.module";
import { Usuario } from "./Usuario.module";

export class Reserva {
  reservaId?: number;
  libro: Libro;
  usuario: Usuario;
  fechaReserva: string;
  // Eliminar la siguiente línea si `fechaDevolucion` no es una propiedad válida
  // fechaDevolucion: string;
  reservado: boolean;

  constructor(reservaId: number, libro: Libro, usuario: Usuario, fechaReserva: string, reservado: boolean) {
    this.reservaId = reservaId;
    this.libro = libro;
    this.usuario = usuario;
    this.fechaReserva = fechaReserva;
    // this.fechaDevolucion = fechaDevolucion; // Eliminar si no se utiliza
    this.reservado = reservado;
  }
}
