import { Component, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../auth.service';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
  // Lista de roles de usuario obtenida del servicio de autenticación
  userRoles: string[] = [];

  constructor(private authService: AuthService, private router: Router) {}

  // Controla si el menú está abierto o cerrado
  menuOpen = false;
  // Determina si la vista es de escritorio o no
  isDesktop = false;

  // Listener para el evento de redimensionar la ventana
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.checkWindowSize();
  }

  // Método para verificar el tamaño de la ventana y actualizar `isDesktop`
  checkWindowSize(): void {
    // Define el punto de quiebre para considerar la vista como escritorio
    this.isDesktop = window.innerWidth >= 1024; // por ejemplo, 1024px es el punto de quiebre para 'xl'
  }

  // Alterna el estado del menú (abierto/cerrado)
  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  ngOnInit(): void {
    // Obtiene los roles de usuario del servicio de autenticación
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
