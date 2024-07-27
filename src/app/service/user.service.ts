import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../Usuario.module';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/biblioteca/rs/auth'; 
  
  constructor(private http: HttpClient) { }

  obtenerUsuarios(): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(this.apiUrl);
  }
}
