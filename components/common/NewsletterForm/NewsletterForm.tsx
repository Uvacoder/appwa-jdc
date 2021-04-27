import React, { ChangeEvent, FC, FormEvent, useCallback, useState } from 'react'
import { useProfile } from '@lib/context/profile-context'
import s from './NewsletterForm.module.css'
import { useForm } from '@lib/hooks'
import { BannerHeader } from '@components/common'

const NewsletterForm: FC = () => {
  const { profile } = useProfile()
  const [email, setEmail] = useState(profile?.email || '')
  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }, [])

  const { data, onSubmit } = useForm((e) => {
    console.log('submit form!')
    return 'hi'
  })

  return (
    <div className={s.root}>
      <div className={s.contentContainer}>
        <h2 className={s.title}>Subscribe to our Newsletter!</h2>
        <h3 className={s.subtitle}>
          We send weekly emails featuring current deals, featured blog posts,
          and more!
        </h3>
        <form id="newsletterForm" onSubmit={onSubmit} className={s.form}>
          <label htmlFor="newsletterEmail" className="hidden">
            Email
          </label>
          <input
            id="newsletterEmail"
            className={s.input}
            type="text"
            value={email}
            placeholder={'youremail@website.com'}
            defaultValue={email}
            onChange={handleChange}
          />
          <button type="submit" className={s.submitBtn}>
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}

export default NewsletterForm
