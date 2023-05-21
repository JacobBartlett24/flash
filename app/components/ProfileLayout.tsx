import { Link } from "@remix-run/react"
import FlashBox from "./FlashBox"

type props = {
  galleryInfo: any
}

export default function ProfileLayout({ galleryInfo }: props) {
  console.log(galleryInfo)
  return (
    <>
      <div className="profileLayout">
        <div className="topSection">
          <div className="profilePicture">
            <img src="https://cdn.midjourney.com/1ff82f10-e3bb-4728-9bc3-74af280ae53f/0_2.png" alt="profilePicture" />
            <div id="profilePictureOverlay">Change picture</div>
          </div>
        </div>
        <div className="bottomSection">
          <div className="profilePictureSection">
            <button className="uploadButton">Upload</button>
          </div>
          <div className="gallery">
            <h1>Gallery: </h1>
            <div className="galleryImages">
              {galleryInfo.map((image: any) => {
                return (
                  <div key={image.id}>
                    <img src={image.img_url} alt={image.description} />
                  </div>
                )
              })}
            </div>
            <Link to="/Gallery">View More</Link>
          </div>
        </div>
      </div>
    </>
  )
}