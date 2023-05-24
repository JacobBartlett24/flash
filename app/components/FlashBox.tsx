import { IconContext } from 'react-icons'
import {
  FaCartArrowDown,
  FaFacebookSquare,
  FaInstagram,
  FaReddit,
  FaTiktok,
  FaTwitter,
} from 'react-icons/fa'

type props = {
  flashImage: string
  description: string
  price: number
}

export default function FlashBox({ flashImage, description, price }: props) {
  return (
    <>
      <div className="card">
        <div className="media">
          <img src={flashImage} alt={description}></img>
        </div>
        <div className="desc">
          <div className="price">
            ${price} <br />
          </div>
          <div className="description">
            {description}
            <br />
          </div>
          <div>
            {' '}
            Share On:
            <div className="socialMedia">
              <IconContext.Provider value={{ className: 'icons' }}>
                <FaTwitter size={30} />
                <FaInstagram size={30} />
                <FaFacebookSquare size={30} />
                <FaReddit size={30} />
                <FaTiktok size={30} />
              </IconContext.Provider>
              <IconContext.Provider value={{ className: 'icons cart' }}>
                <FaCartArrowDown size={30} />
              </IconContext.Provider>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
