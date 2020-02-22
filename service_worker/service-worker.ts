

export abstract class ServiceWorker {

  public get cacheName(): string {
    return `${this._cacheName}-v${this._version}`;
  }

  public constructor(private _cacheName: string, private _version: number, assets?: string[]) {
    self.addEventListener('activate', (event: ExtendableEvent) => {
      this.onActivate(event);
      this.preCacheAssets(assets);
      this.log('Activated');
    });
    self.addEventListener('install', (event: ExtendableEvent) => this.onInstall(event));
    self.addEventListener('fetch', (event: FetchEvent) => this.onFetch(event));
  }

  protected abstract onActivate(event: ExtendableEvent);

  protected abstract onInstall(event: ExtendableEvent);

  protected abstract onFetch(event: FetchEvent);

  protected isOutdatedVersion(cacheName: string): boolean {
    return cacheName.indexOf(this._cacheName) > -1 && !cacheName.indexOf(`-v${this._version}`);
  }

  protected async getCache(): Promise<Cache> {
    return caches.open(this.cacheName);
  }

  protected log(message: string) {
    this._log(message);
  }

  protected warn(message: string) {
    this._log(message, 'warn');
  }

  protected error(message: string) {
    this._log(message, 'error');
  }

  private _log(message: string, type: 'warn' | 'error' | 'info' = 'info') {
    const text = `[Service worker] ${this.cacheName} : ${message}`;
    switch (type) {
      case 'warn':
        console.warn(text);
        break;
      case 'error':
        console.error(text);
        break;
      case 'info':
        console.log(text);
    }
  }

  private preCacheAssets(assets?: string[]) {
    if (assets) {
      this.getCache().then(cache => cache.addAll(assets));
    }
  }
}
