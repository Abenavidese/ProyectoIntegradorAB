import { Libro } from "./Libro.module";
import { Usuario } from "./Usuario.module";


export class Prestamo {
    prestamoId?: number; // Cambiar a opcional si se auto-generará en la base de datos
    fechaPrestamo: Date;
    fechaDevolucion?: Date;
    libro: Libro;
    usuario: Usuario;

    constructor(prestamoId: number, fechaPrestamo: Date, fechaDevolucion: Date, libro: Libro, usuario: Usuario) {
        this.prestamoId = prestamoId;
        this.fechaPrestamo = fechaPrestamo;
        this.fechaDevolucion = fechaDevolucion;
        this.libro = libro;
        this.usuario = usuario;
    }
}