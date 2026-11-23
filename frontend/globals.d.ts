declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test'
    readonly NEXT_PUBLIC_ANALYTICS_ID: string
    readonly NEXT_PUBLIC_ASSETS_URL: string

    readonly STRIPE_SECRET_KEY: string
    readonly STRIPE_PRICE_100: string
    readonly STRIPE_PRICE_300: string
    readonly STRIPE_PRICE_1000: string

    readonly NEXT_PUBLIC_TURNSTILE_SITE_KEY: string
    readonly TURNSTILE_SECRET_KEY: string

    readonly EMAIL_FROM: string
    readonly EMAIL_TO: string
    readonly SMTP_HOST: string
    readonly SMTP_USER: string
    readonly SMTP_PASS: string
  }
}

declare module '*.yml' {
  const data: Record<string, any>[]
  export default data
}
