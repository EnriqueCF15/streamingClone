import { useEffect, useState } from 'react'
import { Image } from '../components/image'
import { Section } from '../components/section'
import { Film } from '../interfaces'

export const Season = () => {
  const [film, setFilm] = useState<Film>({
    id: 0,
    title: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Neque illum nam quaerat eaque temporibus inventore obcaecati nulla dicta enim cupiditate voluptatem nisi non, commodi magni. Officiis fuga qui praesentium sed.`,
    description: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Neque illum nam quaerat eaque temporibus inventore obcaecati nulla dicta enim cupiditate voluptatem nisi non, commodi magni. Officiis fuga qui praesentium sed.`,
    coverPath: '',
    genreIds: [1, 2, 3, 4],
    mediaType: 'tv',
    posterPath: '',
    seasons: [
      {
        id: 1,
        seasonNumber: 1,
      },
      {
        id: 2,
        seasonNumber: 2,
      },
      {
        id: 3,
        seasonNumber: 3,
      },
    ],
  })

  const [episodes, setEpisodes] = useState<any[]>()

  const fetch = () => {
    const arrs: any[] = []

    for (let i = 0; i < 12; i++) {
      arrs.push({})
    }

    setEpisodes(arrs)
  }

  useEffect(() => {
    fetch()
  }, [])

  return (
    <>
      {/* BACKGROUND */}
      <div className="h-[150px] left-0 right-0 top-0 relative">
        <div className="overlay-film-cover"></div>
        <Image src=""></Image>
      </div>
      {/* POSTER AND TEXT */}
      <Section className="-mt-[75px] flex items-center relative z-10 mobile:block ">
        <Image
          src=""
          className="w-[150px] min-w-[150px] min-h-[200px] mobile:mx-auto"
        />
        <div className="px-3 flex flex-col items-start gap-3 ">
          <p className="text-xl line-clamp-1 ">{film.title}</p>
          <p className="opacity-[0.9] ">
            Season 1 | {episodes?.length} episodes
          </p>
        </div>
      </Section>
      {/* EPISODES */}
      <Section title="Episodes">
        {episodes?.map((episode, i) => (
          <div className="my-6 flex items-stretch gap-4 rounded-md overflow-hidden cursor-pointer hover:bg-primary px-3 py-2" key={i}>
            <Image src="" className="min-w-[300px] w-[300px] h-[300px]"/>
            <div className="overflow-hidden flex flex-col ">
              <p className="text-lg mt-2 line-clamp-2 ">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Deserunt unde porro nam, dignissimos iure facilis minima
                recusandae eum quasi sequi. Nobis, sit. Aliquam totam culpa ad
                distinctio eveniet maiores aspernatur.
              </p>
              <p className="opacity-[0.9] line-clamp-5">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam,
                reprehenderit eaque nihil maxime temporibus officiis obcaecati
                quo? Asperiores maxime earum adipisci obcaecati optio repellat
                ut necessitatibus atque deleniti! Nobis, nulla?
              </p>
              <div className="mt-auto pt-3 text-right">31 January 2023</div>
            </div>
          </div>
        ))}
      </Section>
    </>
  )
}
