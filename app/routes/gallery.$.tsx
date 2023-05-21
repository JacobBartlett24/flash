import { LinksFunction, LoaderArgs, LoaderFunction, json } from "@remix-run/node";
import FilterHeader from "~/components/FilterHeader";
import styles from "~/styles/GalleryGenre.css";
import createServerSupabase from "utils/supabase.server";
import { useLoaderData } from "@remix-run/react";


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
  return(
    <>
      <div className="galleryPage">
        <FilterHeader />
        <div className="galleryContainer">
          {data.userFlash.map((image: any) => {
            return (
              <div className="imgWrapper" key={image.id}>
                <img src={image.img_url} alt={image.description}></img>
              </div>
            )
          })}
          {data.userFlash.map((image: any) => {
            return (
              <div className="imgWrapper" key={image.id}>
                <img src={image.img_url} alt={image.description}></img>
              </div>
            )
          })}
          {data.userFlash.map((image: any) => {
            return (
              <div className="imgWrapper" key={image.id}>
                <img src={image.img_url} alt={image.description}></img>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}