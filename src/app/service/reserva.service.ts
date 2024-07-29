import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reserva } from '../Reserva.module';
import { Libro } from '../Libro.module';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  private apiUrl = 'http://localhost:8080/biblioteca/rs/reservas';

  constructor(private http: HttpClient) { }

  // Obtener todas las reservas
  obtenerReservas(): Observable<Reserva[]> {
    return this.http.get<Reserva[]>(this.apiUrl);
  }

  // Crear una nueva reserva
  guardarReserva(reserva: Reserva): Observable<Reserva> {
    return this.http.post<Reserva>(this.apiUrl, reserva);
  }

  // Obtener los libros disponibles para reserva
  obtenerLibrosDisponibles(): Observable<Libro[]> {
    return this.http.get<Libro[]>('http://localhost:8080/biblioteca/rs/libros');
  }

  // Realizar una reserva
  realizarReserva(reserva: Reserva): Observable<Reserva> {
    return this.http.post<Reserva>(this.apiUrl, reserva);
  }

  // Obtener reservas activas
  obtenerReservasActivas(): Observable<Reserva[]> {
    return this.http.get<Reserva[]>(`${this.apiUrl}/activas`);
  }

  // Cancelar una reserva
  cancelarReserva(reservaId: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/cancelar/${reservaId}`, {});
  }

  

  devolverReserva(reservaId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/devolver/${reservaId}`);
  }

}
