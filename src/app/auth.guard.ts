import {
  CanActivateFn,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { inject } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const authService = inject(AuthenticationService)
  const router: Router = inject(Router);
  const protectedRoutes: string[] = [
    '/dashboard',
    '/jobSeekerProfiles',
    '/agent-dash',
    '/user-dash',
    '/register',
    '/validation',
    '/jobOffer-create',
    '/test',
    ];
    console.log(authService.getAuthUser());
    

  if (!protectedRoutes.includes(state.url)) return true; // If the url is not protected, just allow the user to visit the page

  return protectedRoutes.includes(state.url) && (authService.getAuthUser()  == null) ? router.navigate(['/login']) : true;
};
