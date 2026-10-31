export type Env = {
  DB: D1Database;
  ASSETS: R2Bucket;
  FRONTEND_ORIGIN: string;
  PUBLIC_ASSET_BASE_URL?: string;
  SESSION_SECRET: string;
  ADMIN_SETUP_TOKEN?: string;
};
