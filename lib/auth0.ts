import { initAuth0 } from '@auth0/nextjs-auth0';
import configJS from './config';

interface Config {
  AUTH0_CLIENT_ID: string;
  AUTH0_CLIENT_SECRET?: string;
  AUTH0_SCOPE: string;
  AUTH0_DOMAIN: string;
  REDIRECT_URI: string;
  POST_LOGOUT_REDIRECT_URI: string;
  SESSION_COOKIE_SECRET?: string;
  SESSION_COOKIE_LIFETIME?: number;
}

const config = configJS as Config;

export default initAuth0({
  clientId: config.AUTH0_CLIENT_ID,
  clientSecret: config.AUTH0_CLIENT_SECRET,
  scope: config.AUTH0_SCOPE,
  domain: config.AUTH0_DOMAIN,
  redirectUri: config.REDIRECT_URI,
  postLogoutRedirectUri: config.POST_LOGOUT_REDIRECT_URI,
  session: {
    cookieSecret: config?.SESSION_COOKIE_SECRET || ``,
    cookieLifetime: config.SESSION_COOKIE_LIFETIME,
    storeIdToken: true,
    storeRefreshToken: true,
    storeAccessToken: true,
  },
  oidcClient: {
    httpTimeout: 2500,
    clockTolerance: 10000,
  },
});
