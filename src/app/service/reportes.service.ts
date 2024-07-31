import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Libro } from '../Libro.module';
import { Usuario } from '../Usuario.module';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

private baseUrl = 'http://localhost:8080/biblioteca/rs/reportes';

  constructor(private http: HttpClient) { }

  getLibrosMasSolicitados(): Observable<any> {
    return this.http.get(`${this.baseUrl}/libros`);
  }

  getUsuariosMasActivos(): Observable<any> {
    return this.http.get(`${this.baseUrl}/usuarios`);
  }
}