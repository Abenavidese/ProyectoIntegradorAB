import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

/**
 * RoleGuard - Guard for route protection based on user roles.
 * 
 * This guard checks if the user has the required roles to access a route. If not, the user is redirected to the login page.
 */
export const RoleGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService = inject(AuthService); // Inject the AuthService to get user roles
  const router = inject(Router); // Inject the Router for potential navigation

  const expectedRoles = route.data['expectedRoles'] as Array<string>; // Roles expected for the route
  const userRoles = authService.getUserRoles(); // User's current roles

  console.log('Expected roles:', expectedRoles); // Log expected roles for debugging
  console.log('User roles:', userRoles); // Log user's roles for debugging

  if (userRoles.some(role => expectedRoles.includes(role))) {
    return true; // Allow access if user has any of the expected roles
  } else {
    console.warn('Access denied. User does not have required roles:', expectedRoles); // Log denied access attempt
    
    // Redirect to login page if user does not have required roles
    window.location.href = 'http://192.168.146.129:8080/biblioteca(2)/login.xhtml';
    return false; // Deny access
  }
};
