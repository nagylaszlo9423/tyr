import {NavigationGuard, Route} from "vue-router";
import {authService} from "../services/AuthService";


export const authGuard: NavigationGuard = async (to: Route, from: Route, next: (to?: string | false) => any) => {
  if (to.path.indexOf('/pages') > -1) {
    if (await authService.isLoggedIn()) {
      return next();
    }
  } else {
    return next();
  }

  authService.logout();
  next('/login');
};
