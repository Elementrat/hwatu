const ENVIRONMENTS = {
  development: 'development',
  preview: 'preview',
  production: 'production',
};

const DEV_PORT = '3000';

const API_PATHS = {
  GQL: '/api/graphql',
};

const BASE_URLS = {
  DEV: `http://localhost:${DEV_PORT}`,
  PROD: 'https://hwatu.vercel.app',
};

const API_URLS = {
  GQL:
    process.env.NEXT_PUBLIC_VERCEL_ENV === ENVIRONMENTS.production
      ? `https://${process.env.VERCEL_URL}${API_PATHS.GQL}`
      : `${BASE_URLS.DEV}${API_PATHS.GQL}`,
};

export { ENVIRONMENTS, BASE_URLS, API_PATHS, API_URLS };
