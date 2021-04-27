import cn from 'classnames'
import s from './AnnouncementBar.module.css'

interface AnnouncementBarProps {
  className?: string
  text: string
  hide?: boolean
  action?: () => void
}

const AnnouncementBar: React.FC<AnnouncementBarProps> = ({
  text,
  className,
  action,
  hide,
}) => {
  const rootClassName = cn(
    s.root,
    {
      transform: true,
      'translate-y-0 opacity-100 flex': !hide,
      '-translate-y-full opacity-0 hidden': hide,
    },
    className
  )
  return (
    <div className={rootClassName}>
      <span className="block md:inline">{text}</span>
      <button className={s.closeBtn} onClick={action}>
        &#x24E7;
      </button>
    </div>
  )
}

export default AnnouncementBar
