import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Card } from '../components/card'
import { Image } from '../components/image'
import { Section } from '../components/section'
import { Film } from '../interfaces'
import { MediaType } from '../types'

interface Props {
  type: MediaType | 'search'
}

export const Catalog = (props: Props) => {
  let title = ''

  const [films, setFilms] = useState<Film[]>([])
  const [params, _] = useSearchParams()

  switch (props.type) {
    case 'movie':
      title = 'Movies'
      break
    case 'tv':
      title = 'TV'
      break
    case 'search':
      title = `Search results for <i>${params.get('q')}</i>`
      break
    default:
      break
  }

  const fetch = () => {
    const arrs: any[] = []

    for (let i = 0; i < 20; i++) {
      arrs.push({
        title:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit deleniti laborum rem architecto quia recusandae eum consequuntur veritatis itaque doloremque unde labore quisquam sapiente alias, laboriosam repellendus iure, expedita nulla?',
      })
    }
    setFilms(arrs)
  }

  useEffect(() => {
    fetch()
  }, [])

  return (
    <>
      {/* BACKGROUND */}
      <div className="h-[120px] left-0 right-0 top-0 relative">
        <div className="overlay-film-cover"></div>
        <div className="h-full w-full bg-primary"></div>
      </div>
      {/* PAGE TITLE */}
      <Section
        title={title}
        className="-mt-[90px] flex items-center relative z-10"
      ></Section>
      {/* FILMS */}
      <Section>
        <div className="grid lg:grid-cols-5 sm:grid-cols-4 mobile:grid-cols-3 relative z-[11] " >
          {films.map((film, i) => (
            <div>
              <Card imageSrc="" title={film.title} key={i} />
            </div>
          ))}
        </div>
      </Section>
    </>
  )
}
