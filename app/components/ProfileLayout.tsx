import { Link } from "@remix-run/react"
import FlashBox from "./FlashBox"

type userFlash = {
  created_at: string | null;
  description: string | null;
  id: number;
  img_url: string | null;
  price: number | null;
  quantity: number | null;
  title: string | null;
  user_id: string | null;
}

type props = {
  galleryInfo: userFlash[]
}



export default function ProfileLayout({ galleryInfo }: props) {
  return (
    <>
      <div className="profileLayout">
        <div className="topSection">
          <div className="profilePicture">
            <img src="https://cdn.midjourney.com/1ff82f10-e3bb-4728-9bc3-74af280ae53f/0_2.png" alt="profilePicture" />
            <div id="profilePictureOverlay">Change picture</div>
          </div>
          <div className="profileInfo">
            <h1 className="displayName">
              Jakey
            </h1>
            <h2 className="profileName">
              @JBeakers
            </h2>
            <div className="rating">
            </div>
            <p className="bio">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat dolores doloremque quis blanditiis, sit facilis cum eius laboriosam illum veniam inventore aperiam soluta vero at fugiat libero nostrum deleniti velit!
              Perspiciatis quibusdam illum unde enim nesciunt, natus voluptates repellat tempora laborum iste minima vel beatae rerum qui velit quos impedit quo praesentium quod sint dolorem soluta eum a cum? At?
            </p>
          </div>
        </div>
        <span className="placeholder">
          <Link to="/upload">Upload Flash</Link>
        </span>
        <div className="bottomSection">
          <div className="gallery">
            {galleryInfo.map((flash: userFlash) => {
              return (
                <Link key={flash.id} to={`/flash/${flash.id}`}>
                  <img  src={flash.img_url} alt="" />
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}