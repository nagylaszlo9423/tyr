

export const environment =  {
  api_path: process.env.VUE_APP_PATH_PREFIX,
  client_id: 'client_id',
  redirect_uri: 'http://localhost/login',
  password_regex: '^(?=.*[0-9@#$%^&+=.])(?=.*[a-z])(?=.*[A-Z])(?=\\S+$).{8,}$',
  background_images: ['background1.jpg', 'background2.jpg'],
  cache_name: 'tyr-cache',
  cache_version: 1,
  pre_cached_assets: [
    './assets',
    './index.html',
    './main.js',
    './favicon.ico',
    './manifest.json'
  ]
};
