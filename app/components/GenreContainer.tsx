import { Link } from "@remix-run/react"
import { IconContext } from "react-icons"
import { FaArrowRight } from "react-icons/fa"

type props = {
  title: string,
  images: any
}

export default function GenreContainer({title, images}: props){
  return(
    <>
      <div className="collectionWrapper">
        <div className="titleWrapper">
          <Link prefetch="intent" className="title" to={`/gallery/${title}`}>{title}
            <IconContext.Provider value={{ className: "icons" }}> 
              <FaArrowRight size={20} />
            </IconContext.Provider>
          </Link>
        </div>
        <div className="imgGallery">
          {images.map((image: any) => {
            return (
              <Link to={`/flash/${image.id}`} className="imgWrapper" key={image.id}>
                <img src={image.img_url} alt={image.description}></img>
              </Link>
            )
          })}
        </div>
      </div>
    </>
  )
}