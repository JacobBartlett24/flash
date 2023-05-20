import { Link } from "@remix-run/react"

type props = {
  title: string,
  images: any
}

export default function GenreContainer({title, images}: props){
  return(
    <>
      <div className="collectionWrapper">
        <Link className="title" to="/practice">{title}</Link>
        <div className="imgGallery">
          {images.map((image: any) => {
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