import {ServiceWorker} from './service-worker';

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
    event.respondWith(this.fromNetwork(event.request, 300).catch(() => this.fromCache(event.request)));
  }

  protected onInstall(event: ExtendableEvent) {
  }

  private fromNetwork(request: Request, timeout: number): Promise<Response> {
    return new Promise((resolve, reject) => {
      const timeoutId = setTimeout(reject, timeout);
      fetch(request).then((response: Response) => {
        clearTimeout(timeoutId);
        resolve(response);
      }).catch(reject);
    });
  }

  private fromCache(request: Request): Promise<Response> {
    return this.getCache().then(cache => {
      return cache.match(request).catch(() => Promise.reject('no-match'));
    })
  }
}
