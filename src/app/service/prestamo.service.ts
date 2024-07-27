import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Prestamo } from '../Prestamo.module';
import { Libro } from '../Libro.module';

@Injectable({
  providedIn: 'root'
})
export class PrestamoService {
  private baseUrl = 'http://localhost:8080/biblioteca/rs';

  constructor(private http: HttpClient) {}

  obtenerLibrosDisponibles(): Observable<Libro[]> {
    return this.http.get<Libro[]>(`${this.baseUrl}/libros`);
  }

  realizarPrestamo(prestamo: Prestamo): Observable<any> {
    return this.http.post(`${this.baseUrl}/prestamos`, prestamo, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

}