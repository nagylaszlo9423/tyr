import {NetworkFirstCache} from './network-first.cache';
import {environment} from '../src/environment/environment';

new NetworkFirstCache(
  environment.cache_name,
  environment.cache_version,
  environment.pre_cached_assets
);
