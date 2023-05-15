import { BrowserRouter } from 'react-router-dom'
import { useContext, createContext, useState, useEffect } from 'react'
import { Genre } from '../interfaces'
import { Body } from '../layouts/body'
import { Footer } from '../layouts/footer'
import { Header } from '../layouts/header'
import { MediaType } from '../types'
import { Loading } from './loading'
import { getGenre } from '../api/tmdb-api'

type Genres = {
  [key in MediaType]: Genre[]
}

const GlobalContext = createContext<{
  genres: Genres
}>({
  genres: {
    movie: [],
    tv: [],
  },
})

export const useGlobalContext = () => useContext(GlobalContext)

export const AppContainer = () => {
  const [genres, setGenres] = useState<Genres>({
    movie: [],
    tv: [],
  })

  const fetchGenres = async() => {
    const movie = await getGenre('movie')
    const tv = await getGenre('tv')

    setGenres({
        movie,
        tv,
    })

  }


  useEffect(()=>{
    fetchGenres()
  },[])

  if (!genres.movie.length || !genres.tv.length) {
    return (
      <div className="fixed left-0 top-0 right-0 bottom-0 flex items-center justify-center">
        <Loading></Loading>
      </div>
    )
  }

  return (
    <BrowserRouter>
      <GlobalContext.Provider
        value={{
          genres,
        }}
      >
        {/* header */}
        <Header />
        {/* body */}
        <Body />
        {/* footer */}
        <Footer />
      </GlobalContext.Provider>
    </BrowserRouter>
  )
}
