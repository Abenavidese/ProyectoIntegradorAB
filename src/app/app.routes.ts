import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./shared/components/layout/layout.component'),
    children: [
      {
        path: 'inicio',
        loadComponent: () => import('./Menu/inicio/inicio.component')
      },
      {
        path: 'perfil',
        loadComponent: () => import('./Menu/perfil/perfil.component')
      },

      {
        path: 'tabla',
        loadComponent: () => import('./Menu/tabla/tabla.component')
      },
      {
        path: '',
        redirectTo:'inicio',
        pathMatch:'full'
      },
      {
        path: '**',
        redirectTo:'inicio',
      },
      
    ]
  }
];

