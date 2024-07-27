import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable
 } from '@angular/core';
 
 export const RoleGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const expectedRoles = route.data['expectedRoles'] as Array<string>;
  const userRoles = authService.getUserRoles();

  console.log('Expected roles:', expectedRoles); // Log expected roles
  console.log('User roles:', userRoles); // Log user roles

  if (userRoles.some(role => expectedRoles.includes(role))) {
    return true;
  } else {
    console.warn('Access denied. User does not have required roles:', expectedRoles); // Log access denied
    
    // Redirige a la página de login si no tiene los roles necesarios
    window.location.href = 'http://localhost:8080/biblioteca/login.xhtml';
    return false;
  }
};