import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Libro } from '../Libro.module';
import { Usuario } from '../Usuario.module';
import { PrestamoService } from './prestamo.service';
import { Prestamo } from '../Prestamo.module';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {
  // URL base para los servicios de reportes
  private baseUrl = 'http://192.168.146.129:8080/biblioteca(2)/rs/reportes';

  // BehaviorSubject para manejar el estado de los préstamos por usuario
  private prestamosPorUsuarioSource = new BehaviorSubject<{ [username: string]: number }>({});
  prestamosPorUsuario$ = this.prestamosPorUsuarioSource.asObservable();

  // Constructor con inyección de dependencias
  constructor(private http: HttpClient, private prestamoService: PrestamoService) {}

  /**
   * Envía los datos de préstamos por usuario a los suscriptores del BehaviorSubject.
   * @param data - Objeto con el nombre de usuario como clave y la cantidad de préstamos como valor.
   */
  enviarPrestamosPorUsuario(data: { [username: string]: number }): void {
    this.prestamosPorUsuarioSource.next(data);
  }

  /**
   * Obtiene una lista de los libros más populares basándose en la cantidad de préstamos.
   * @returns Un Observable que emite un arreglo de objetos con el nombre del libro y la cantidad de préstamos.
   */
  getLibrosMasPopulares(): Observable<{ libro: string, cantidadPrestamos: number }[]> {
    return new Observable(observer => {
      this.prestamoService.obtenerPrestamos().subscribe({
        next: (prestamos: Prestamo[]) => {
          const conteoLibros: { [libro: string]: number } = {};

          // Contabilizar cada préstamo por libro
          prestamos.forEach(prestamo => {
            const tituloLibro = prestamo.libro.titulo;
            conteoLibros[tituloLibro] = (conteoLibros[tituloLibro] || 0) + 1;
          });

          // Convertir el objeto en un arreglo para facilitar el ordenamiento y manipulación
          const librosPopulares = Object.keys(conteoLibros).map(libro => ({
            libro,
            cantidadPrestamos: conteoLibros[libro]
          }));

          // Emitir el resultado y completar el observable
          observer.next(librosPopulares);
          observer.complete();
        },
        error: (err) => observer.error(err)
      });
    });
  }
}
