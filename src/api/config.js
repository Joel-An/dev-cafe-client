/* eslint-disable import/prefer-default-export */
const isBrowser = process.env.BROWSER;

const DEV_API_SERVER = 'http://localhost:3000';

const PROD_API_SERVER = 'https://rejoelve.com';
const PROD_API_SERVER_LOCAL = 'http://localhost:3000';

const setHost = () => {
  switch (process.env.NODE_ENV) {
  case 'development': {
    return DEV_API_SERVER;
  }
  case 'production': {
    if (isBrowser) {
      return PROD_API_SERVER;
    }
    return PROD_API_SERVER_LOCAL;
  }
  default:
    throw new Error('개발/배포 모드 설정이 되어있지않습니다.');
  }
};

export const host = setHost();
