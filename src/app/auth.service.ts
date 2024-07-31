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
  private _libroId: number | null = null
  private disponibilidad: boolean | null = null;


  private baseUrl = 'http://localhost:8080/library/api/auth'; // URL del servicio de autenticación
  private baseUrlprest = 'http://localhost:8080/library/rs/prestamos'; // URL del servicio de autenticación
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
          email: '',// No tenemos el email en el token
        };
        this.userService.guardarUsuario(usuario); // Guardar el usuario
        return {
          ...userData,
          username: decodedToken.username // Agrega el nombre de usuario
        };
      })
    );
  }

  public setSession(token: string): void {
    localStorage.setItem('token', token);
    const user = this.decodeToken(token);
    if (user) {
      localStorage.setItem('username', user.username); // Guardar el nombre de usuario en el localStorage
      this.currentUserSubject.next(user);
    }
  }

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

  public logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('username'); // Eliminar el nombre de usuario del localStorage si se guardó
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']); // Redirige al login después de cerrar sesión
  }

  getPendingReturns(username: string): Observable<Prestamo[]> {
    return this.http.get<Prestamo[]>(`${this.baseUrlprest}/${username}`);
  }

  public isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  public getUserRoles(): string[] {
    const user = this.currentUserSubject.value;
    return user ? user.roles : [];
  }

  public hasRole(role: string): boolean {
    const roles = this.getUserRoles();
    return roles.includes(role);
  }

  setLibroId(libroId: number): void {
    this._libroId = libroId;
  }

  public getUsername(): string | null {
    return localStorage.getItem('username');
  }

  getLibroId() {
    return this._libroId;
  }

  setDisponibilidad(disponibilidad: boolean) {
    this.disponibilidad = disponibilidad;
  }

  getDisponibilidad(): boolean | null {
    return this.disponibilidad;
  }


}