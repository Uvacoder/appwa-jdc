import {
  DetailedHTMLProps,
  FC,
  InputHTMLAttributes,
  useEffect,
  useMemo,
  useRef,
} from 'react'
import cn from 'classnames'
import s from './Searchbar.module.css'
import { useRouter } from 'next/router'
import { Cross, MagnifyingGlass } from '@components/icons'

interface Props {
  className?: string
  id?: string
  isMobile?: boolean
  displaySearch?: boolean
}

const Searchbar: FC<Props> = ({
  className,
  id = 'search',
  // displaySearch,
  isMobile,
}) => {
  const searchEl = useRef<HTMLInputElement | null>(null)
  const router = useRouter()
  const displaySearch = true

  useEffect(() => {
    router.prefetch('/search')
  }, [])

  useEffect(() => {
    if (displaySearch) searchEl.current?.focus()
  }, [displaySearch])

  return (
    <div
      className={cn(
        'relative text-sm bg-accents-1 text-base w-full transition-colors duration-150 rounded-lg lg:mx-10',
        className
      )}
    >
      <label className="hidden" htmlFor={id}>
        Search
      </label>
      <input
        id={id}
        className={s.input}
        placeholder="Search for products..."
        defaultValue={router.query.q}
        ref={searchEl}
        onKeyUp={(e) => {
          e.preventDefault()

          if (e.key === 'Enter') {
            const q = e.currentTarget.value

            router.push(
              {
                pathname: `/search`,
                query: q ? { q } : {},
              },
              undefined,
              { shallow: true }
            )
          }
        }}
      />
      <div className={s.iconContainer}>
        {isMobile ? (
          <button>
            <Cross className={s.crossIcon} />
          </button>
        ) : (
          <MagnifyingGlass className={s.searchIcon} />
        )}
      </div>
    </div>
  )
}

export default Searchbar
