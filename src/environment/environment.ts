

export const environment =  {
  api_path: process.env.VUE_APP_PATH_PREFIX,
  client_id: 'tyr-app-client',
  google: {
    redirect_uri: 'http://localhost:3000/login/google',
    client_id: '126368579163-6iom3cb435gq9p0snnvap8k38don9gn1.apps.googleusercontent.com'
  },
  facebook: {
    redirect_uri: 'http://localhost:3000/login/facebook',
    client_id: '2157192967885035'
  },
  redirect_uri: 'http://localhost:3000/login',
  password_regex: '^(?=.*[0-9@#$%^&+=.])(?=.*[a-z])(?=.*[A-Z])(?=\\S+$).{8,}$',
  background_images: ['background1.jpg', 'background2.jpg'],
  cache_name: 'tyr-cache',
  cache_version: 1,
  pageSize: 10,
  pre_cached_assets: [
    './assets',
    './index.html',
    './main.js',
    './favicon.ico',
    './manifest.json'
  ]
};
