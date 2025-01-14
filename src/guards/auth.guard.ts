import {NavigationGuard, Route} from 'vue-router';
import {authService} from '@/services/auth.service';


export const authGuard: NavigationGuard = async (to: Route, from: Route, next: (to?: any) => void) => {
  if (to.meta.isAuthenticated) {
    if (to.path.indexOf('/pages') === -1) {
      return next();
    }

    if (await authService.isLoggedIn()) {
      return next();
    }

    authService.logout();
    return next(false);
  }

  return next();
};
