import type { LinksFunction, LoaderArgs, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import FilterHeader from "~/components/FilterHeader";
import styles from "~/styles/GalleryGenre.css";
import createServerSupabase from "utils/supabase.server";
import { Link, useLoaderData } from "@remix-run/react";
import { useEffect } from "react";

export type filters = {
  genre: string,
  color: string,
  alphabetical: string,
  price: string
}


export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};

export const loader: LoaderFunction = async ({ request }: LoaderArgs) => {
  const response = new Response()
  const supabase = createServerSupabase({ request, response })

  const { data } = await supabase.from('UserFlash').select()

  return json({ userFlash: data })
}

export default function GalleryGenre(){
  const data = useLoaderData<typeof loader>()
  
  const filters: filters = {
    genre: "all",
    color: "all",
    alphabetical: "all",
    price: "all"
  }

  useEffect(() => {
    console.log(filters)
  }, [filters])

  return(
    <>
      <div className="galleryPage">
        <FilterHeader filters={filters}/>
        <div className="galleryContainer">
          {data.userFlash.map((image: any) => {
            return (
              <div className="imgWrapper" key={image.id}>
                <Link to={""}>
                  <img src={image.img_url} alt={image.description} />
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}