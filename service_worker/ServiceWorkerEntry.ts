import {NetworkFirstCache} from './NetworkFirstCache';
import {Environment} from '../src/environment/environment';

new NetworkFirstCache(
  Environment.cache_name,
  Environment.cache_version,
  Environment.pre_cached_assets
);
