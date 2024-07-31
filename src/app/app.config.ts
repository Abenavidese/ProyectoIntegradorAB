import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth-interceptor.service';
import { ReloadService } from './service/reload-service.service';

/**
 * Configuración principal de la aplicación Angular.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), // Proveedor para las rutas definidas en 'app.routes'.
    provideHttpClient(),   // Proveedor para el cliente HTTP para realizar solicitudes HTTP.
    ReloadService,         // Proveedor para el servicio de recarga de datos.
    provideAnimationsAsync(), // Proveedor para habilitar animaciones de forma asincrónica.
    {
      provide: HTTP_INTERCEPTORS, 
      useClass: AuthInterceptor, 
      multi: true 
      // Proveedor para los interceptores HTTP, utilizando 'AuthInterceptor' para agregar encabezados de autorización a las solicitudes.
    }
  ]
};
