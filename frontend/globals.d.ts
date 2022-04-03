declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test';
    readonly EMAIL_FROM: string
    readonly EMAIL_TO: string
    readonly SMTP_HOST: string
    readonly SMTP_USER: string
    readonly SMTP_PASS: string
    readonly NEXT_PUBLIC_RECAPTCHA_SITE_KEY: string
    readonly NEXT_PUBLIC_RECAPTCHA_SECRET_KEY: string
  }
}
