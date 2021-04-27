import { useState, useCallback, FormEvent } from 'react'

export type FormStatus = 'idle' | 'isFetching' | 'success' | 'error'
type PromiseFunction = (e: FormEvent<HTMLFormElement>) => Promise<any>
type NonPromiseFunction = (e: FormEvent<HTMLFormElement>) => void
type Function = PromiseFunction | NonPromiseFunction

export const useForm = (fn: Function) => {
  const [status, setStatus] = useState<FormStatus>('idle')
  const [data, setData] = useState<any>()

  const onSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      try {
        const data = await fn(e)
        setStatus('success')
        setData(data)
      } catch (err) {
        setStatus('error')
        setData(err)
      }
    },
    [fn]
  )

  return {
    idle: status === 'idle',
    isFetching: status === 'isFetching',
    success: status === 'success',
    error: status === 'error',
    status,
    data,
    onSubmit,
  }
}
