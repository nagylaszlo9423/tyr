import {Environment} from '@/environment/environment';

export function register() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('/service_worker.js', {})
      .then(function (registration) {
        console.debug(`[Service worker] ${Environment.cache_name} : Registration successful, scope is:`, registration.scope);
      })
      .catch(function (error) {
        console.debug(`[Service worker] ${Environment.cache_name} : Service worker registration failed, error:`, error);
      });
  }
}
