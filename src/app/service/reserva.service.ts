import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reserva } from '../Reserva.module';
import { Libro } from '../Libro.module';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  // URL base para las solicitudes relacionadas con las reservas
  private apiUrl = 'http://192.168.146.129:8080/biblioteca(2)/rs/reservas';

  // Constructor con inyección de dependencia del servicio HttpClient
  constructor(private http: HttpClient) { }

  /**
   * Obtiene todas las reservas.
   * @returns Un Observable que emite una lista de objetos Reserva.
   */
  obtenerReservas(): Observable<Reserva[]> {
    return this.http.get<Reserva[]>(this.apiUrl);
  }

  /**
   * Crea una nueva reserva.
   * @param reserva - El objeto Reserva a crear.
   * @returns Un Observable que emite el objeto Reserva creado.
   */
  guardarReserva(reserva: Reserva): Observable<Reserva> {
    return this.http.post<Reserva>(this.apiUrl, reserva);
  }

  /**
   * Obtiene una lista de todos los libros disponibles para reserva.
   * @returns Un Observable que emite una lista de objetos Libro.
   */
  obtenerLibrosDisponibles(): Observable<Libro[]> {
    return this.http.get<Libro[]>('http://192.168.146.129:8080/biblioteca(2)/rs/libros');
  }

  /**
   * Realiza una nueva reserva.
   * @param reserva - El objeto Reserva a realizar.
   * @returns Un Observable que emite el objeto Reserva realizado.
   */
  realizarReserva(reserva: Reserva): Observable<Reserva> {
    return this.http.post<Reserva>(this.apiUrl, reserva);
  }

  /**
   * Obtiene una lista de todas las reservas activas.
   * @returns Un Observable que emite una lista de objetos Reserva.
   */
  obtenerReservasActivas(): Observable<Reserva[]> {
    return this.http.get<Reserva[]>(`${this.apiUrl}/activas`);
  }

  /**
   * Cancela una reserva existente por su ID.
   * @param reservaId - El ID de la reserva a cancelar.
   * @returns Un Observable que emite void una vez completada la operación.
   */
  cancelarReserva(reservaId: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/cancelar/${reservaId}`, {});
  }

  /**
   * Obtiene una lista de todas las reservas activas para un usuario específico.
   * @param userId - El ID del usuario.
   * @returns Un Observable que emite una lista de objetos Reserva.
   */
  obtenerReservasActivasPorUsuario(userId: number): Observable<Reserva[]> {
    return this.http.get<Reserva[]>(`${this.apiUrl}/activas/${userId}`);
  }
}
