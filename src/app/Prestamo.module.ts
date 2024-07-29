import { Libro } from "./Libro.module";
import { Usuario } from "./Usuario.module";


export class Prestamo {
  prestamoId?: number;
  libro: Libro;
  usuario: Usuario;
  fechaPrestamo: string;
  fechaDevolucion: string;

  constructor(prestamoId: number, libro: Libro, usuario: Usuario, fechaPrestamo: string, fechaDevolucion: string) {
    this.prestamoId = prestamoId;
    this.libro = libro;
    this.usuario = usuario;
    this.fechaPrestamo = fechaPrestamo;
    this.fechaDevolucion = fechaDevolucion;
  }
}
