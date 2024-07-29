import { Routes } from '@angular/router';
import { RoleGuard } from './guards/role-guard.guard';


export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./shared/components/layout/layout.component'),
    children: [
      {
        path: 'inicio',
        loadComponent: () => import('./Menu/inicio/inicio.component'),
        
      },
      {
        path: 'perfil',
        loadComponent: () => import('./Menu/perfil/perfil.component'),
        canActivate: [RoleGuard],
        data: { expectedRoles: ['ROLE_ADMIN'] }
      },
      {
        path: 'tabla',
        loadComponent: () => import('./Menu/tabla/tabla.component'),
        canActivate: [RoleGuard],
        data: { expectedRoles: ['ROLE_USER', 'ROLE_ADMIN'] }
      },
      {
        path: 'prestamos',
        loadComponent: () => import('./Menu/prestamos/prestamos.component'),
        canActivate: [RoleGuard],
        data: { expectedRoles: ['ROLE_USER', 'ROLE_ADMIN'] }
      },

      {
        path: 'prestamos',
        loadComponent: () => import('./Menu/prestamos/prestamos.component')
      },
      

      {
        path: 'historial',
        loadComponent: () => import('./Menu/historial/historial.component'),
        canActivate: [RoleGuard],
        data: { expectedRoles: ['ROLE_ADMIN'] }
      }, 
      
      {
        path: 'devoluciones',
        loadComponent: () => import('./Menu/devoluciones/devoluciones.component'),
        canActivate: [RoleGuard],
        data: { expectedRoles: ['ROLE_USER', 'ROLE_ADMIN'] }
      },

      {
        path: 'help-info',
        loadComponent: () => import('./Menu/help-info/help-info.component'),
        canActivate: [RoleGuard],
        data: { expectedRoles: ['ROLE_USER', 'ROLE_ADMIN'] }
      },
      {
        path: 'legal-info',
        loadComponent: () => import('./Menu/legal-info/legal-info.component'),
        canActivate: [RoleGuard],
        data: { expectedRoles: ['ROLE_USER', 'ROLE_ADMIN'] }
      }
    ]
  }
];