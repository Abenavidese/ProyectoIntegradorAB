import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth.service';
import { HostListener } from '@angular/core';
@Component({
  selector: 'app-head',
  standalone: true,
  imports: [RouterLink,RouterLinkActive, CommonModule],
  templateUrl: './head.component.html',
  styleUrl: './head.component.scss'
})
export class HeadComponent {
  userRoles: string[] = [];

  constructor(private authService: AuthService, private router: Router) {}
  menuOpen = false;
  isDesktop = false;

  // Listener para el evento de redimensionar la ventana
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.checkWindowSize();
  }

  // Método para verificar el tamaño de la ventana
  checkWindowSize(): void {
    // Definir el ancho de pantalla para determinar si es escritorio
    this.isDesktop = window.innerWidth >= 1024; // por ejemplo, 1024px es el punto de quiebre para 'xl'
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }
  ngOnInit(): void {
    this.userRoles = this.authService.getUserRoles();
    this.checkWindowSize();

  }

  logout(): void {
    this.authService.logout();
    window.location.href = 'http://localhost:8080/biblioteca/login.xhtml'; // Redirige a la página de login
  }
  hasRole(role: string): boolean {
    return this.userRoles.includes(role);
  }
}
