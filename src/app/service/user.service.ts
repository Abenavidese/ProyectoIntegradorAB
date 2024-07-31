import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../Usuario.module';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // URL base para las solicitudes relacionadas con la autenticación y los usuarios
  private apiUrl = 'http://localhost:8080/biblioteca/rs/auth';

  // Constructor con inyección de dependencia del servicio HttpClient
  constructor(private http: HttpClient) { }

  /**
   * Obtiene una lista de todos los usuarios desde el servidor.
   * @returns Un Observable que emite una lista de objetos Usuario.
   */
  obtenerUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl);
  }

  /**
   * Guarda la información de un usuario en el almacenamiento local.
   * @param usuario - El objeto Usuario que se desea guardar.
   */
  guardarUsuario(usuario: Usuario): void {
    localStorage.setItem('usuario', JSON.stringify(usuario));
  }

  /**
   * Obtiene la información del usuario almacenada localmente.
   * @returns El objeto Usuario si existe en el almacenamiento local, de lo contrario null.
   */
  obtenerUsuario(): Usuario | null {
    const usuario = localStorage.getItem('usuario');
    return usuario ? JSON.parse(usuario) : null;
  }

  /**
   * Elimina la información del usuario del almacenamiento local.
   */
  eliminarUsuario(): void {
    localStorage.removeItem('usuario');
  }
}
