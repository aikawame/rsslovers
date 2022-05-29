declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test';
    readonly ASSETS_URL: string
    readonly EMAIL_FROM: string
    readonly EMAIL_TO: string
    readonly SMTP_HOST: string
    readonly SMTP_USER: string
    readonly SMTP_PASS: string
    readonly NEXT_PUBLIC_RECAPTCHA_SITE_KEY: string
    readonly NEXT_PUBLIC_RECAPTCHA_SECRET_KEY: string
    readonly NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: string
    readonly STRIPE_SECRET_KEY: string
    readonly STRIPE_PRICE_100: string
    readonly STRIPE_PRICE_300: string
  }
}

export type Category = {
  label: string
  name: string
  isActive: boolean
  sites: Site[]
}

export type Site = {
  label: string
  crawler: string
  name: string
  url: string
  isActive: boolean
  feeds: Feed[]
}

export type Feed = {
  label: string
  name: string
  linkUrl: string
  isActive: boolean
}
