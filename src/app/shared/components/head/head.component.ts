import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth.service';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-head',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './head.component.html',
  styleUrl: './head.component.scss'
})
export class HeadComponent {
  // Almacena los roles del usuario actual
  userRoles: string[] = [];

  // Constructor con inyección de dependencias para servicios de autenticación y enrutamiento
  constructor(private authService: AuthService, private router: Router) {}

  // Estado de si el menú está abierto o cerrado
  menuOpen = false;

  // Indica si la vista actual es de escritorio o no
  isDesktop = false;

  // Listener para el evento de redimensionar la ventana
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.checkWindowSize();
  }

  // Método para verificar el tamaño de la ventana y actualizar `isDesktop`
  checkWindowSize(): void {
    this.isDesktop = window.innerWidth >= 1024; // Determina si el tamaño es de escritorio
  }

  // Alterna el estado del menú (abierto/cerrado)
  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  // Método de ciclo de vida de Angular que se ejecuta al inicializar el componente
  ngOnInit(): void {
    // Obtiene los roles del usuario del servicio de autenticación
    this.userRoles = this.authService.getUserRoles();
    // Verifica el tamaño de la ventana al inicializar el componente
    this.checkWindowSize();
  }

  // Cierra la sesión del usuario y redirige a la página de login
  logout(): void {
    this.authService.logout();
    window.location.href = 'http://localhost:8080/biblioteca/login.xhtml'; // Redirige a la página de login
  }

  // Verifica si el usuario tiene un rol específico
  hasRole(role: string): boolean {
    return this.userRoles.includes(role);
  }
}
