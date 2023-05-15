import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getInTheaters, getPopulars, getTopRated, getTrendings } from '../api/tmdb-api'
import { Card } from '../components/card'
import { Section } from '../components/section'
import { Slider } from '../components/slider/slider'
import { TrendingHero } from '../components/trending-hero'
import { Film } from '../interfaces'
import { isFilm, mergeFilms, tmdbImageSrc } from '../utils'

export const Home = () => {
  const navigate = useNavigate()
  const [trendings, setTrendings] = useState<Film[]>([])
  const [inTheaters, setInTheaters] = useState<Film[]>([])
  const [populars, setPopulars] = useState<Film[]>([])
  const [topRatedTv, setTopRatedTv] = useState<Film[]>([])
  const [topRatedMovie, setTopRatedMovie] = useState<Film[]>([])

  const goToDetailPage = (film:Film) => {
    navigate(`/${film.mediaType}/${film.id}`)
  }

  const fetchTopRatedMovie = async () => {
    setTopRatedMovie(await getTopRated ('movie'))
  }

  const fetchTopRatedTv = async () => {
    setTopRatedTv(await getTopRated ('tv'))
  }
  const fetchPopulars = async () => {
    const movies = await getPopulars('movie')
    const tvs = await getPopulars('tv')

    setPopulars(mergeFilms(movies, tvs,10))
  }

  const fetchInTheaters = async () => {
    setInTheaters(await getInTheaters())
  }

  const fetchTrending = async () => {
    const movies = await getTrendings('movie')
    const tvs = await getTrendings('tv')

    setTrendings(mergeFilms(movies, tvs))
  }
  // const arrs: Film[] = []

  // for (let i = 0; i < 6; i++) {
  //   let film: unknown

  //   if (i % 2 === 1) {
  //     if (tvs[i - 1]) {
  //       film = tvs[i - 1]
  //     }
  //   } else {
  //     if (movies[i - 1]) {
  //       film = movies[i - 1]
  //     }
  //   }
  //   if (isFilm(film)) arrs.push(film)
  // }

  useEffect(() => {
    fetchTrending()
    fetchInTheaters()
    fetchPopulars()
    fetchTopRatedMovie()
    fetchTopRatedTv()
  }, [])

  return (
    <>
      {/* TRENDINGS */}
      <Section className="py-0">
        <Slider
          className="slick-hero"
          autoplay={true}
          slidesToShow={1}
          slidesToScroll={1}
        >
          {(onSwipe) =>
            trendings.map((film, i) => (
              <TrendingHero
                onClick={() =>
                  !onSwipe ? navigate(`/${film.mediaType}/${film.id}`) : ''
                }
                film={film}
                key={i}
              ></TrendingHero>
            ))
          }
        </Slider>
      </Section>

      {/* IN THEATERS */}
      <Section title="In Theaters">
        <Slider isMovieCard={true} autoplay={true}>
          {(_) =>
            inTheaters.map((film, i) => (
              <Card
              onClick={()=>goToDetailPage(film)}
                title={film.title}
                imageSrc={tmdbImageSrc(film.posterPath)}
                key={i}
              />
            ))
          }
        </Slider>
      </Section>

      {/* POPULARS */}
      <Section title="What´s Popular">
        <Slider isMovieCard={true} autoplay={true}>
          {(_) =>
            populars.map((film, i) => (
              <Card
              onClick={()=>goToDetailPage(film)}
                title={film.title}
                imageSrc={tmdbImageSrc(film.posterPath)}
                key={i}
              />
            ))
          }
        </Slider>
      </Section>
      {/* TOP RATED TV */}
      <Section title="Top Rated TV">
        <Slider isMovieCard={true} autoplay={true}>
          {(_) =>
            topRatedTv.map((film, i) => (
              <Card
              onClick={()=>goToDetailPage(film)}
                title={film.title}
                imageSrc={tmdbImageSrc(film.posterPath)}
                key={i}
              />
            ))
          }
        </Slider>
      </Section>
      {/* TOP RATED MOVIES */}
      <Section title="Top Rated Movies">
        <Slider isMovieCard={true} autoplay={true}>
          {(_) =>
            topRatedMovie.map((film, i) => (
              <Card
              onClick={()=>goToDetailPage(film)}
                title={film.title}
                imageSrc={tmdbImageSrc(film.posterPath)}
                key={i}
              />
            ))
          }
        </Slider>
      </Section>
    </>
  )
}
