import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Prestamo } from '../Prestamo.module';
import { Libro } from '../Libro.module';

@Injectable({
  providedIn: 'root'
})
export class PrestamoService {
  private apiUrl = 'http://localhost:8080/biblioteca/rs/prestamos';

  constructor(private http: HttpClient) { }

  obtenerPrestamos(): Observable<Prestamo[]> {
    return this.http.get<Prestamo[]>(this.apiUrl);
  }

  guardarPrestamo(prestamo: Prestamo): Observable<Prestamo> {
    return this.http.post<Prestamo>(this.apiUrl, prestamo);
  }

  obtenerLibrosDisponibles(): Observable<Libro[]> {
    return this.http.get<Libro[]>('http://localhost:8080/biblioteca/rs/libros');
  }

  realizarPrestamo(prestamo: Prestamo): Observable<Prestamo> {
    return this.http.post<Prestamo>(this.apiUrl, prestamo);
  }

  obtenerPrestamosActivos(): Observable<Prestamo[]> {
    return this.http.get<Prestamo[]>(`${this.apiUrl}/activos`);

  }
  
  devolverPrestamo(prestamoId: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/devolver/${prestamoId}`, {});
  }









  reservarLibro(libroId: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/reservar/${libroId}`, {});
  }

  liberarReserva(libroId: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/liberar-reserva/${libroId}`, {});
  }
  
  
}
