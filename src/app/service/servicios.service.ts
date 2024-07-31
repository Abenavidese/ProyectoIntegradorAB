import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Libro } from '../Libro.module';
import { Reserva } from '../Reserva.module';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {
  // URL base para las solicitudes relacionadas con los servicios de la biblioteca
  private apiUrl = 'http://localhost:8080/biblioteca/rs';

  // Constructor con inyección de dependencia del servicio HttpClient
  constructor(private http: HttpClient) { }

  /**
   * Obtiene una lista de todos los libros disponibles.
   * @returns Un Observable que emite una lista de objetos Libro.
   */
  obtenerLibros(): Observable<Libro[]> {
    return this.http.get<Libro[]>(`${this.apiUrl}/libros`);
  }

  /**
   * Elimina un libro por su ID.
   * @param id - El ID del libro a eliminar.
   * @returns Un Observable que emite void una vez completada la operación.
   */
  eliminarLibro(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/libros?id=${id}`);
  }

  /**
   * Guarda un nuevo libro en la base de datos.
   * @param libro - El objeto Libro a guardar.
   * @returns Un Observable que emite el objeto Libro guardado.
   */
  guardarLibro(libro: Libro): Observable<Libro> {
    return this.http.post<Libro>(`${this.apiUrl}/libros`, libro);
  }

  /**
   * Actualiza la información de un libro existente.
   * @param libro - El objeto Libro con los datos actualizados.
   * @returns Un Observable que emite el objeto Libro actualizado.
   */
  actualizarLibro(libro: Libro): Observable<Libro> {
    return this.http.put<Libro>(`${this.apiUrl}/libros`, libro);
  }

  /**
   * Obtiene un libro por su ID.
   * @param id - El ID del libro a buscar.
   * @returns Un Observable que emite una lista con el libro encontrado.
   */
  libroPorId(id: number): Observable<Libro[]> {
    return this.http.get<Libro[]>(`${this.apiUrl}/libros/${id}`);
  }
}
