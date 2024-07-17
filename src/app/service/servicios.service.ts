import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Libro } from '../Libro.module';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  private apiUrl = 'http://localhost:8080/biblioteca/rs/libros'; // Reemplaza con la URL correcta de tu API

  constructor(private http: HttpClient) { }

  actualizarLibro(libro: Libro): Observable<Libro> {
    return this.http.put<Libro>(`${this.apiUrl}`, libro);
  }
  
  eliminarLibro(libroId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}?id=${libroId}`);
  }
  
  obtenerLibros(): Observable<Libro[]> {
    return this.http.get<Libro[]>(this.apiUrl);
  }

  guardarLibro(libro: Libro): Observable<Libro> {
    return this.http.post<Libro>(this.apiUrl, libro);
  }
}
