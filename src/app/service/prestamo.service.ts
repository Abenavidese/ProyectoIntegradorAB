import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Prestamo } from '../Prestamo.module';
import { Libro } from '../Libro.module';

@Injectable({
  providedIn: 'root'
})
export class PrestamoService {
  private apiUrl = 'http://192.168.146.129:8080/biblioteca(2)/rs/prestamos';

  constructor(private http: HttpClient) { }

  /**
   * Obtiene todos los préstamos desde el servidor.
   * @returns Un Observable con un array de objetos Prestamo.
   */
  obtenerPrestamos(): Observable<Prestamo[]> {
    return this.http.get<Prestamo[]>(this.apiUrl);
  }

  /**
   * Guarda un nuevo préstamo en el servidor.
   * @param prestamo El objeto Prestamo a guardar.
   * @returns Un Observable con el objeto Prestamo guardado.
   */
  guardarPrestamo(prestamo: Prestamo): Observable<Prestamo> {
    return this.http.post<Prestamo>(this.apiUrl, prestamo);
  }

  /**
   * Obtiene una lista de libros disponibles para préstamo desde el servidor.
   * @returns Un Observable con un array de objetos Libro.
   */
  obtenerLibrosDisponibles(): Observable<Libro[]> {
    return this.http.get<Libro[]>('http://192.168.146.129:8080/biblioteca(2)/rs/libros');
  }

  /**
   * Realiza un préstamo de libro en el servidor.
   * @param prestamo El objeto Prestamo que contiene los detalles del préstamo.
   * @returns Un Observable con el objeto Prestamo realizado.
   */
  realizarPrestamo(prestamo: Prestamo): Observable<Prestamo> {
    return this.http.post<Prestamo>(this.apiUrl, prestamo);
  }

  /**
   * Obtiene todos los préstamos activos desde el servidor.
   * @returns Un Observable con un array de objetos Prestamo.
   */
  obtenerPrestamosActivos(): Observable<Prestamo[]> {
    return this.http.get<Prestamo[]>(`${this.apiUrl}/activos`);
  }

  /**
   * Marca un préstamo como devuelto en el servidor.
   * @param prestamoId El ID del préstamo a devolver.
   * @returns Un Observable de tipo void.
   */
  devolverPrestamo(prestamoId: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/devolver/${prestamoId}`, {});
  }

  /**
   * Reserva un libro en el servidor.
   * @param libroId El ID del libro a reservar.
   * @returns Un Observable de tipo void.
   */
  reservarLibro(libroId: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/reservar/${libroId}`, {});
  }

  /**
   * Libera una reserva de libro en el servidor.
   * @param libroId El ID del libro cuya reserva se desea liberar.
   * @returns Un Observable de tipo void.
   */
  liberarReserva(libroId: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/liberar-reserva/${libroId}`, {});
  }
}
