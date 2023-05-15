import { useNavigate } from 'react-router-dom'
import { Film } from '../interfaces'
import { Image } from './image'

interface Props {
  imageSrc: string
  title: string
  onClick?: Function
}

export const Card = (props: Props) => {

  return (
    <div
      onClick={() => (props.onClick ? props.onClick() : '')}
      className="mx-3 my-1.5 cursor-pointer"
    >
      <Image src={props.imageSrc} className="flex-1 h-[248px] rounded-lg overflow-hidden "></Image>
      <p className="py-1.5 line-clamp-2">{props.title}</p>
    </div>
  )
}
