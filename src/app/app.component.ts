import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './auth.service';
import { OnInit } from '@angular/core';
import { LoadingComponent } from './Complementary/loading/loading.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, LoadingComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  isLoading = true; // Indica si se está mostrando la pantalla de carga

  constructor(private authService: AuthService, private router: Router) {}

  /**
   * Método de ciclo de vida que se ejecuta cuando el componente se inicializa.
   */
  ngOnInit(): void {
    // Verificar si hay un token de autenticación almacenado en el localStorage
    const token = localStorage.getItem('token');
    if (token) {
      console.log('AppComponent loaded with token:', token);
      this.authService.setSession(token); // Establecer la sesión con el token
    }

    // Simular un retraso antes de continuar
    setTimeout((): void => {
      this.isLoading = false; // Ocultar el componente de carga después del retraso

      // Después de ocultar la pantalla de carga, navega al componente de inicio
      this.navigateToHome(); 
    }, 2000); // 2 segundos de retraso
  }

  /**
   * Navega al componente de inicio después de cargar la aplicación.
   */
  private navigateToHome(): void {
    this.router.navigate(['/inicio']); // Navegar explícitamente al componente de inicio
  }
}
