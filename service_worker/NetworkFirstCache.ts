import {ServiceWorker} from './ServiceWorker';

export class NetworkFirstCache extends ServiceWorker {
  protected onActivate(event: ExtendableEvent) {
    event.waitUntil(
      caches.keys().then(cacheNames => Promise.all(
        cacheNames.map(cacheName => {
          if (this.isOutdatedVersion(cacheName)) {
            this.log('Remove outdated cache');
            return caches.delete(this.cacheName);
          }
        })
      ))
    )
  }

  protected onFetch(event: FetchEvent) {
    event.respondWith(
      caches.match(event.request)
        .catch(_ => this.error(_))
        .then(async (cachedResponse: Response) => {
          try {
            const networkResponse = await fetch(event.request);
            const cache = await this.getCache();
            await cache.put(event.request, networkResponse.clone());
            return networkResponse;
          } catch (e) {
            if (cachedResponse) {
              return cachedResponse;
            } else {
              this.warn('Unable to fetch any responses')
            }
          }
        })
    );
  }

  protected onInstall(event: ExtendableEvent) {
  }
}
