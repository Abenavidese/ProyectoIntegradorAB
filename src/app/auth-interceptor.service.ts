import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * Interceptor de autenticación que añade el token de autorización a todas las solicitudes HTTP.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  /**
   * Intercepta una solicitud HTTP y añade un token de autorización si está disponible.
   * @param req - La solicitud HTTP original.
   * @param next - El siguiente manejador en la cadena de interceptores.
   * @returns Un observable de eventos HTTP.
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    if (token) {
      // Clona la solicitud y añade el encabezado de autorización con el token JWT
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    return next.handle(req);
  }
}
