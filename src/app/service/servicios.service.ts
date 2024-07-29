import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Libro } from '../Libro.module';
import { Reserva } from '../Reserva.module'; // Asegúrate de tener esta interfaz o clase

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {
  private apiUrl = 'http://localhost:8080/biblioteca/rs';

  constructor(private http: HttpClient) { }

  obtenerLibros(): Observable<Libro[]> {
    return this.http.get<Libro[]>(`${this.apiUrl}/libros`);
  }

  eliminarLibro(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/libros/${id}`);
  }

  guardarLibro(libro: Libro): Observable<Libro> {
    return this.http.post<Libro>(`${this.apiUrl}/libros`, libro);
  }

  actualizarLibro(libro: Libro): Observable<Libro> {
    return this.http.put<Libro>(`${this.apiUrl}/libros`, libro);
  }

  libroPorId(id: number): Observable<Libro[]> {
    return this.http.get<Libro[]>(`${this.apiUrl}/libros/${id}`);
  }

  

  
}