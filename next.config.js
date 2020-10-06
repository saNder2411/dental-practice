require('dotenv').config();

module.exports = {
  env: {
    domain: process.env.domain,
    clientId: process.env.clientId,
    redirectUri: process.redirectUri,
    postLogoutRedirectUri: process.env.postLogoutRedirectUri,
    cookieSecret: process.env.cookieSecret,
    clientSecret: process.env.clientSecret,
  },
};
