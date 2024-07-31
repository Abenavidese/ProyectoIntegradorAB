import { Routes } from '@angular/router';
import { RoleGuard } from './guards/role-guard.guard';

/**
 * Definición de las rutas de la aplicación.
 * Cada ruta está asociada a un componente que se carga de forma diferida (lazy loading).
 */
export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./shared/components/layout/layout.component'),
    children: [
      {
        path: 'inicio',
        loadComponent: () => import('./Menu/inicio/inicio.component'),
        // Página de inicio, accesible para todos los usuarios.
      },
      {
        path: 'perfil',
        loadComponent: () => import('./Menu/perfil/perfil.component'),
        canActivate: [RoleGuard],
        data: { expectedRoles: ['ROLE_ADMIN'] }
        // Componente de perfil, accesible solo para administradores.
      },
      {
        path: 'tabla',
        loadComponent: () => import('./Menu/tabla/tabla.component'),
        canActivate: [RoleGuard],
        data: { expectedRoles: ['ROLE_USER', 'ROLE_ADMIN'] }
        // Tabla de datos, accesible para usuarios y administradores.
      },
      {
        path: 'prestamos',
        loadComponent: () => import('./Menu/prestamos/prestamos.component'),
        canActivate: [RoleGuard],
        data: { expectedRoles: ['ROLE_USER', 'ROLE_ADMIN'] }
        // Gestión de préstamos, accesible para usuarios y administradores.
      },
      {
        path: 'historial',
        loadComponent: () => import('./Menu/historial/historial.component'),
        canActivate: [RoleGuard],
        data: { expectedRoles: ['ROLE_ADMIN'] }
        // Historial de préstamos, accesible solo para administradores.
      },
      {
        path: 'Reportes',
        loadComponent: () => import('./Reportes/reporte1/reporte1.component'),
        canActivate: [RoleGuard],
        data: { expectedRoles: ['ROLE_ADMIN'] }
        // Reporte 1, accesible solo para administradores.
      },
      {
        path: 'Reportes2',
        loadComponent: () => import('./Reportes2/reporte2/reporte2.component'),
        canActivate: [RoleGuard],
        data: { expectedRoles: ['ROLE_ADMIN'] }
        // Reporte 2, accesible solo para administradores.
      },
      {
        path: 'devoluciones',
        loadComponent: () => import('./Menu/devoluciones/devoluciones.component'),
        canActivate: [RoleGuard],
        data: { expectedRoles: ['ROLE_ADMIN'] }
        // Gestión de devoluciones, accesible para usuarios y administradores.
      },
      {
        path: 'reservas',
        loadComponent: () => import('./Menu/reservas/reservas.component'),
        canActivate: [RoleGuard],
        data: { expectedRoles: ['ROLE_USER', 'ROLE_ADMIN'] }
        // Gestión de reservas, accesible para todos los usuarios.
      },
      {
        path: 'help-info',
        loadComponent: () => import('./Menu/help-info/help-info.component'),
        canActivate: [RoleGuard],
        data: { expectedRoles: ['ROLE_USER', 'ROLE_ADMIN'] }
        // Sección de ayuda e información, accesible para usuarios y administradores.
      },
      {
        path: 'devoReserva',
        loadComponent: () => import('./Menu/devoReserva/devolucionr/devolucion-r.component'),
        canActivate: [RoleGuard],
        data: { expectedRoles: ['ROLE_USER', 'ROLE_ADMIN'] }
        // Gestión de cancelación de reservas, accesible para todos los usuarios.
      },
      {
        path: 'legal-info',
        loadComponent: () => import('./Menu/legal-info/legal-info.component'),
        canActivate: [RoleGuard],
        data: { expectedRoles: ['ROLE_USER', 'ROLE_ADMIN'] }
        // Sección de información legal, accesible para usuarios y administradores.
      }
    ]
  }
];
