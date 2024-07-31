import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ReloadService {
  constructor(private router: Router) {
    // Suscribirse a los eventos de navegación del enrutador
    this.router.events.subscribe((event) => {
      // Verificar si el evento es de tipo NavigationEnd (finalización de la navegación)
      if (event instanceof NavigationEnd) {
        // Comprobar si la URL es exactamente '/inicio?token='
        if (event.urlAfterRedirects === '/inicio?token=') {
          // Recargar la página si se cumple la condición
          window.location.reload();
        }
      }
    });
  }
}
