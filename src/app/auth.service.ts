import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { UserData } from './UserData';
import { map } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';
import { UserService } from './service/user.service';
import { Usuario } from './Usuario.module';
import { Prestamo } from './Prestamo.module';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _libroId: number | null = null;
  private disponibilidad: boolean | null = null;

  private baseUrl = 'http://localhost:8080/library/api/auth'; // URL del servicio de autenticación
  private baseUrlprest = 'http://localhost:8080/library/rs/prestamos'; // URL del servicio de préstamos
  private currentUserSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public currentUser: Observable<any> = this.currentUserSubject.asObservable();
  public loadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public loading$: Observable<boolean> = this.loadingSubject.asObservable();

  constructor(private http: HttpClient, private router: Router, private userService: UserService) {
    const token = localStorage.getItem('token');
    if (token) {
      this.setSession(token);
    }
  }

  /**
   * Realiza el proceso de login del usuario.
   * @param username - El nombre de usuario.
   * @param password - La contraseña del usuario.
   * @returns Un observable con los datos del usuario autenticado.
   */
  login(username: string, password: string): Observable<UserData> {
    this.loadingSubject.next(true); // Mostrar pantalla de carga

    return this.http.post<UserData>(this.baseUrl, { username, password }).pipe(
      map((userData: UserData) => {
        const token = userData.token;
        this.setSession(token);
        const decodedToken = this.decodeToken(token);
        const usuario: Usuario = {
          username: decodedToken.sub,
          role: decodedToken.roles,
          password: '', // No guardamos la contraseña
          email: '', // No tenemos el email en el token
        };
        this.userService.guardarUsuario(usuario); // Guardar el usuario
        return {
          ...userData,
          username: decodedToken.username // Agrega el nombre de usuario
        };
      })
    );
  }

  /**
   * Configura la sesión del usuario guardando el token y actualizando el estado del usuario actual.
   * @param token - El token de autenticación.
   */
  public setSession(token: string): void {
    localStorage.setItem('token', token);
    const user = this.decodeToken(token);
    if (user) {
      localStorage.setItem('username', user.username); // Guardar el nombre de usuario en el localStorage
      this.currentUserSubject.next(user);
    }
  }

  /**
   * Decodifica un token JWT y extrae los datos del usuario.
   * @param token - El token JWT a decodificar.
   * @returns Un objeto con la información del usuario o null en caso de error.
   */
  public decodeToken(token: string): any {
    try {
      const decoded = jwtDecode<any>(token);
      return {
        username: decoded.sub, // Asumiendo que el nombre de usuario está en 'sub'
        roles: decoded.roles
      };
    } catch (error) {
      console.error('Failed to decode token:', error);
      return null;
    }
  }

  /**
   * Cierra la sesión del usuario, limpiando los datos de autenticación.
   */
  public logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('username'); // Eliminar el nombre de usuario del localStorage si se guardó
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']); // Redirige al login después de cerrar sesión
  }

  /**
   * Obtiene los préstamos pendientes de devolución para un usuario específico.
   * @param username - El nombre de usuario.
   * @returns Un observable con la lista de préstamos pendientes.
   */
  getPendingReturns(username: string): Observable<Prestamo[]> {
    return this.http.get<Prestamo[]>(`${this.baseUrlprest}/${username}`);
  }

  /**
   * Verifica si el usuario está actualmente autenticado.
   * @returns True si el usuario está autenticado, false en caso contrario.
   */
  public isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  /**
   * Obtiene los roles del usuario autenticado.
   * @returns Una lista de roles del usuario.
   */
  public getUserRoles(): string[] {
    const user = this.currentUserSubject.value;
    return user ? user.roles : [];
  }

  /**
   * Verifica si el usuario tiene un rol específico.
   * @param role - El rol a verificar.
   * @returns True si el usuario tiene el rol, false en caso contrario.
   */
  public hasRole(role: string): boolean {
    const roles = this.getUserRoles();
    return roles.includes(role);
  }

  /**
   * Configura el ID del libro seleccionado.
   * @param libroId - El ID del libro.
   */
  setLibroId(libroId: number): void {
    this._libroId = libroId;
  }

  /**
   * Obtiene el nombre de usuario del usuario autenticado.
   * @returns El nombre de usuario o null si no está disponible.
   */
  public getUsername(): string | null {
    return localStorage.getItem('username');
  }

  /**
   * Obtiene el ID del libro seleccionado.
   * @returns El ID del libro o null si no está configurado.
   */
  getLibroId() {
    return this._libroId;
  }

  /**
   * Configura la disponibilidad de un libro.
   * @param disponibilidad - True si el libro está disponible, false en caso contrario.
   */
  setDisponibilidad(disponibilidad: boolean) {
    this.disponibilidad = disponibilidad;
  }

  /**
   * Obtiene el estado de disponibilidad del libro seleccionado.
   * @returns True si el libro está disponible, false si no lo está, o null si no está configurado.
   */
  getDisponibilidad(): boolean | null {
    return this.disponibilidad;
  }
}
