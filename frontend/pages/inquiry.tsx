import { useForm } from 'react-hook-form'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import Link from 'next/link'
import Main from '../components/Main'
import Section from '../components/Section'

type FormValues = {
  message: string
  email: string
  token: string
}

export default function Inquiry() {
  const { executeRecaptcha } = useGoogleReCaptcha()
  const { register, handleSubmit, reset, formState: { isSubmitting, errors } } = useForm<FormValues>()

  const onSubmit = async data => {
    if (!executeRecaptcha) {
      alert('お問い合わせの送信に失敗しました。暫く時間を置いてからもう一度お試しください。')

      return
    }
    data.token = await executeRecaptcha('rss/inquiry')

    const res = await fetch('/api/inquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    if (res.status === 201) {
      alert('お問い合わせを受け付けました。')
      reset()
    } else {
      alert('お問い合わせの送信に失敗しました。暫く時間を置いてからもう一度お試しください。')
    }
  }

  return (
    <Main title="お問い合わせ">
      <Section heading="お問い合わせフォーム">
        <form onSubmit={handleSubmit(onSubmit)}>
          <p>
            RSS愛好会へのご意見・ご質問等はこちらへどうぞ。
          </p>
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
                disabled={isSubmitting}
              >
                送信
              </button>
            </div>
          </div>
          <p className="is-size-7">
            このサイトはreCAPTCHAによって保護されており、
            Googleの<Link href="https://policies.google.com/privacy">プライバシーポリシー</Link>と
            <Link href="https://policies.google.com/terms">利用規約</Link>が適用されます。
          </p>
        </form>
      </Section>
    </Main>
  )
}
