declare namespace NodeJS {
  export interface ProcessEnv {
    DATABASE_URL : string;
    ADMIN_VERIFICATION_CODE: string;
    PORT : string;
    JWT_SECRET: string;
  }
}
