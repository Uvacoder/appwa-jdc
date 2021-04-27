import { FC } from 'react'
import { Container, YMMForm } from '@components/ui'
import s from './Hero.module.css'

interface Props {
  className?: string
  headline: string
  description: string
}

const Hero: FC<Props> = () => (
  <div className="bg-black">
    <Container
      img={{ url: '/images/car-interior.jpg', alt: 'interior of car' }}
    >
      <div className={s.root}>
        <h1 className={s.headline}>Choose Your Vehicle</h1>
        <YMMForm />
      </div>
    </Container>
  </div>
)

export default Hero
