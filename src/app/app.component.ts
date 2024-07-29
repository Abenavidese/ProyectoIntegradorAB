import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService
 } from './auth.service';
 import { OnInit } from '@angular/core';
import { LoadingComponent } from './Complementary/loading/loading.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterLink, LoadingComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  isLoading = true;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      console.log('AppComponent loaded with token:', token);
      this.authService.setSession(token);
    }

    // Simular un retraso antes de continuar
   // Simular un retraso antes de continuar
   setTimeout((): void => {
    this.isLoading = false; // Ocultar el componente de carga después del retraso

    // Después de ocultar la pantalla de carga, navega al componente de inicio
    this.navigateToHome(); 
  }, 2000); // 2 segundos de retraso
}
  private navigateToHome(): void {
    // Navegar explícitamente al componente de inicio
    this.router.navigate(['/inicio']); // Cambia '/inicio' por la ruta de tu componente de inicio
  }
}