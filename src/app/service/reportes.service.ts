import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Libro } from '../Libro.module';
import { Usuario } from '../Usuario.module';
import { BehaviorSubject } from 'rxjs';
import { PrestamoService } from './prestamo.service';
import { Prestamo } from '../Prestamo.module';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {


  private baseUrl = 'http://localhost:8080/biblioteca/rs/reportes';

  private prestamosPorUsuarioSource = new BehaviorSubject<{ [username: string]: number }>({});
  prestamosPorUsuario$ = this.prestamosPorUsuarioSource.asObservable();

  constructor(private http: HttpClient, private prestamoService: PrestamoService) { }

  enviarPrestamosPorUsuario(data: { [username: string]: number }): void {
    this.prestamosPorUsuarioSource.next(data);
  }


  getLibrosMasPopulares(): Observable<{ libro: string, cantidadPrestamos: number }[]> {
    return new Observable(observer => {
      this.prestamoService.obtenerPrestamos().subscribe({
        next: (prestamos: Prestamo[]) => {
          const conteoLibros: { [libro: string]: number } = {};

          // Contabilizar cada préstamo por libro
          prestamos.forEach(prestamo => {
            const tituloLibro = prestamo.libro.titulo;
            if (conteoLibros[tituloLibro]) {
              conteoLibros[tituloLibro]++;
            } else {
              conteoLibros[tituloLibro] = 1;
            }
          });

          // Convertir el objeto en un arreglo para facilitar el ordenamiento y manipulación
          const librosPopulares = Object.keys(conteoLibros).map(libro => ({
            libro: libro,
            cantidadPrestamos: conteoLibros[libro]
          }));

          observer.next(librosPopulares);
          observer.complete();
        },
        error: (err) => observer.error(err)
      });
    });
  }
}