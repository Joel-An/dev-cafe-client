const isDev = process.env.NODE_ENV === 'development';

export const GITHUB_OAUTH_CLIENT_ID = isDev
  ? '1911646a517b2f44f06c'
  : '23e544b67bee7895eede';

export const GITHUB_OAUTH_REDIRECT_URI = isDev
  ? 'http://lvh.me:3000/api/v1/auth/github'
  : 'https://rejoelve.com/api/v1/auth/github';
