import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { UserData } from './UserData';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/library/api/auth'; // URL del servicio de autenticación
  private currentUserSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public currentUser: Observable<any> = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    const token = localStorage.getItem('token');
    if (token) {
      this.setSession(token);
    }
  }

  login(username: string, password: string): Observable<UserData> {
    return this.http.post<UserData>(this.baseUrl, { username, password }).pipe(
      map((userData: UserData) => {
        const token = userData.token;
        this.setSession(token);
        return {
          ...userData,
          username: this.decodeToken(token).username // Agrega el nombre de usuario
        };
      })
    );
  }
  public setSession(token: string): void {
    localStorage.setItem('token', token);
    const user = this.decodeToken(token);
    this.currentUserSubject.next(user);
  }

  public decodeToken(token: string): any {
    try {
      const decoded = jwtDecode<any>(token);
      // Asegúrate de que el nombre de usuario esté en el token decodificado
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
}