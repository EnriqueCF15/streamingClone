import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getDetail } from '../api/tmdb-api'
import { useGlobalContext } from '../components/app-container'
import { Card } from '../components/card'
import { Image } from '../components/image'
import { Section } from '../components/section'
import { Slider } from '../components/slider/slider'
import { Cast, Film as FilmInterface, Trailer } from '../interfaces'
import { MediaType } from '../types'
import { tmdbImageSrc } from '../utils'

interface Props {
  mediaType: MediaType
}

export const Film = (props: Props) => {
  const navigate = useNavigate()
  const { id } = useParams<any>()

  const [film, setFilm] = useState<FilmInterface | null>(null)
  //   id: 0,
  //   title: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Neque illum nam quaerat eaque temporibus inventore obcaecati nulla dicta enim cupiditate voluptatem nisi non, commodi magni. Officiis fuga qui praesentium sed.`,
  //   description: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Neque illum nam quaerat eaque temporibus inventore obcaecati nulla dicta enim cupiditate voluptatem nisi non, commodi magni. Officiis fuga qui praesentium sed.`,
  //   coverPath: '',
  //   genreIds: [1, 2, 3, 4],
  //   mediaType: props.mediaType,
  //   posterPath: '',
  //   seasons: [
  //     {
  //       id: 1,
  //       seasonNumber: 1,
  //     },
  //     {
  //       id: 2,
  //       seasonNumber: 2,
  //     },
  //     {
  //       id: 3,
  //       seasonNumber: 3,
  //     },
  //   ],

  const [casts, setCasts] = useState<Cast[]>([])
  const [trailers, setTrailers] = useState<Trailer[]>([])
  const [recommendations, setRecommendations] = useState<FilmInterface[]>([])

  const globalContext = useGlobalContext()


  const fetch = async () => {
    setFilm(await getDetail(props.mediaType, parseInt(id as string)))


    const arrs: any[] = []

    for (let i = 0; i < 20; i++) {
      arrs.push({})
    }

    setCasts(arrs)
    setTrailers(arrs)
    setRecommendations(arrs)
  }

  useEffect(() => {
    fetch()
  }, [])

  if (!film) return <div>404</div>

  return (
    <>
      {/* BACKGROUND */}
      <div className="h-[300px] left-0 right-0 top-0 relative">
        <div className="overlay-film-cover"></div>
        <Image src={tmdbImageSrc(film.coverPath)} />
      </div>
      {/* POSTER AND TEXT */}
      <Section className="-mt-[150px] flex items-center relative z-10 mobile:block ">
        <Image
          src={tmdbImageSrc(film.posterPath)}
          className="w-[200px] min-w-[200px] h-[300px] mobile:mx-auto"
        />
        <div className="px-3 flex flex-col items-start gap-3 ">
          <p className="text-xl line-clamp-1 ">{film.title}</p>
          <ul className="flex items-center gap-3">
            {film.genreIds.map((id, i) => (
              <li
                key={i}
                className="px-3 py-1.5 bg-primary rounded-lg text-sm "
              >
                {
                  globalContext.genres[film.mediaType].find((g) => g.id === id)
                    ?.name
                }
                {/* {i !== film.genreIds.length - 1 ? ',' : ''} */}
              </li>
            ))}
            
          </ul>
          <p className="line-clamp-3 opacity-[0.9] ">{film.description} </p>
        </div>
      </Section>
      {/* CAST */}
      <Section title="Casts">
        <div className="scrollbar scrollbar-thumb-primary scrollbar-track-header">
          <div className="flex items-center gap-3" >
            {casts.map((cast, i) => (
              <div className="flex-shrink-0 w-[200px] my-3 " key={i}>
                <Card
                  imageSrc=""
                  title="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Neque illum nam quaerat eaque temporibus inventore obcaecati nulla dicta enim cupiditate voluptatem nisi non, commodi magni. Officiis fuga qui praesentium sed."
                />
              </div>
            ))}
          </div>
        </div>
      </Section>
      {/* TRAILERS */}
      <Section title="Trailers">
        <div className="scrollbar scrollbar-thumb-primary scrollbar-track-header">
          <div className="flex items-center gap-3">
            {casts.map((cast, i) => (
              <div className="flex-shrink-0 w-[300px] my-3 " key={i}>
                <Card imageSrc=""  title="" />
              </div>
            ))}
          </div>
        </div>
      </Section>
      {/* SEASONS */}
      <Section title="Seasons">
        <Slider slidesToShow={2} slidesToScroll={2} swipe={false}>
          {(_) =>
            film.seasons.map((season, i) => (
              <Card
                onClick={() =>
                  navigate(`/tv/${film.id}/season/${season.seasonNumber}`)
                }
                title={`Season ${season.seasonNumber}`}
                imageSrc=""
                key={i}
              />
            ))
          }
        </Slider>
      </Section>
      {/* RECOMMENDATIONS */}
      <Section title="Recommendations">
        <Slider isMovieCard={true} autoplay={true}>
          {(_) =>
            recommendations.map((film, i) => (
              <Card title={film.title} imageSrc="" key={i} />
            ))
          }
        </Slider>
      </Section>
    </>
  )
}
