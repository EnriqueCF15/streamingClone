import { Film } from '../interfaces'
import { Image } from './image'
import { MdPlayCircleOutline } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { tmdbImageSrc } from '../utils'

interface Props {
  film: Film
  onClick: () => void
}

export const TrendingHero = (props: Props) => {
  const navigate = useNavigate()

  return (
    <div
      className="h-[300px] relative flex items-center cursor-pointer"
      onClick={() => props.onClick()}
    >
      {/* BG-IMAGE */}
      <div className="absolute left-0 top-0 right-0 bottom-0">
        <div className="overlay-slick-hero"></div>
        <Image src={tmdbImageSrc(props.film.coverPath)}></Image>
        <div className='overlay-film-cover'></div>
      </div>

      {/* TEXT */}
      <div className="flex flex-col gap-3 items-start relative z-10 mx-[55px] max-w-[50%] mobile:max-w-[100%]">
        <p className="text-xl line-clamp-1">{props.film.title}</p>
        <p className="text-sm line-clamp-3">{props.film.description}</p>
        <button className="px-3 py-1.5 flex items-center gap-3 bg-primary rounded-md">
          <MdPlayCircleOutline size={18}></MdPlayCircleOutline>
          <span>Play trailers</span>
        </button>
      </div>
    </div>
  )
}
