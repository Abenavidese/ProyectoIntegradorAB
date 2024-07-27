import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../auth.service';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink,RouterLinkActive, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
  userRoles: string[] = [];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.userRoles = this.authService.getUserRoles();
  }

  logout(): void {
    this.authService.logout();
    window.location.href = 'http://localhost:8080/biblioteca/login.xhtml'; // Redirige a la página de login
  }

  hasRole(role: string): boolean {
    return this.userRoles.includes(role);
  }
}