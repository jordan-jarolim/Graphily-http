import helmet from 'helmet';
import nanoid from 'nanoid/generate';
import nolookalikes from 'nanoid-dictionary/nolookalikes';

const CSP_NONCE_LENGTH = 15;
const CSP_BASE64_ALPHABET = nolookalikes;
const setHeadersMiddleware = (server) => {
  server.use((req, res, next) => {
    res.locals.nonce = nanoid(CSP_BASE64_ALPHABET, CSP_NONCE_LENGTH);
    next();
  });
  const nonce = (req, res) => `'nonce-${res.locals.nonce}'`;
  const scriptSrc = [nonce, "'strict-dynamic'", "'unsafe-inline'", 'https:'];
  // In dev we allow 'unsafe-eval', so HMR doesn't trigger the CSP
  if (process.env.NODE_ENV !== 'production') {
    scriptSrc.push("'unsafe-eval'");
  }
  server.use(helmet({
    contentSecurityPolicy: {
      directives: {
        baseUri: ["'none'"],
        objectSrc: ["'self'"],
        scriptSrc,
      },
    },
    referrerPolicy: { policy: 'same-origin' },
    featurePolicy: {
      features: {
        fullscreen: ["'self'"],
        geolocation: ["'self'"],
      },
    },
  }));
};

export default setHeadersMiddleware;
