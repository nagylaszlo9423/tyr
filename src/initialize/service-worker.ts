import {environment} from '@/environment/environment';

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/service_worker.js', {})
    .then(function (registration) {
      console.debug(`[Service worker] ${environment.cache_name} : Registration successful, scope is:`, registration.scope);
    })
    .catch(function (error) {
      console.debug(`[Service worker] ${environment.cache_name} : Service worker registration failed, error:`, error);
    });
}
