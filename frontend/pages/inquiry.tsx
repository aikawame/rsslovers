import { Turnstile, type TurnstileInstance } from '@marsidev/react-turnstile'
import { useRef } from 'react'
import { useForm } from 'react-hook-form'
import Main from '../components/Main'
import Section from '../components/Section'

type FormValues = {
  message: string
  email: string
  token: string
}

export default function Inquiry() {
  const turnstileRef = useRef<TurnstileInstance>(null)
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { isSubmitting, errors }
  } = useForm<FormValues>({
    defaultValues: {
      message: '',
      email: '',
      token: ''
    }
  })

  const token = watch('token')

  const onSubmit = async (data: FormValues) => {
    if (!data.token) {
      alert('認証が完了していません。暫く時間を置いてからもう一度お試しください。')

      return
    }

    const res = await fetch('/api/inquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })

    if (res.status === 201) {
      alert('お問い合わせを受け付けました。')
      reset()
      turnstileRef.current?.reset()
    } else {
      alert('お問い合わせの送信に失敗しました。暫く時間を置いてからもう一度お試しください。')
      turnstileRef.current?.reset()
      setValue('token', '')
    }
  }

  return (
    <Main title="お問い合わせ">
      <Section heading="お問い合わせフォーム">
        <form onSubmit={handleSubmit(onSubmit)}>
          <p>RSS愛好会へのご意見・ご質問等はこちらへどうぞ。</p>
          <div className="columns">
            <div className="column">
              <textarea
                className={`textarea ${errors.message ? 'is-danger' : ''}`}
                rows={10}
                placeholder="お問い合わせ内容"
                disabled={isSubmitting}
                {...register('message', { required: true })}
              />
            </div>
          </div>
          <div className="columns is-vcentered">
            <div className="column is-two-thirds">
              <input
                className="input"
                type="email"
                placeholder="メールアドレス（返信をご希望の場合）"
                disabled={isSubmitting}
                {...register('email')}
              />
            </div>
            <div className="column">
              <button
                className={`button is-fullwidth is-info is-rounded ${isSubmitting ? 'is-loading' : ''}`}
                type="submit"
                disabled={isSubmitting || !token}
              >
                送信
              </button>
            </div>
          </div>
          <Turnstile
            ref={turnstileRef}
            siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
            options={{ action: 'inquiry' }}
            onSuccess={(token) => setValue('token', token)}
            onExpire={() => setValue('token', '')}
            onError={() => setValue('token', '')}
          />
        </form>
      </Section>
    </Main>
  )
}
