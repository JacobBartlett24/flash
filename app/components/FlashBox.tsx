import { FaFacebookSquare, FaInstagram, FaReddit, FaTiktok, FaTwitter } from 'react-icons/fa';

type props = {
  flashImage: string,
  description: string,
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
          <div className="price">${price} <br /></div>
          <div className="description">{description}<br /></div>
          <div> Share On:
            <div className="socialMedia">
              <FaTwitter />
              <FaInstagram />
              <FaFacebookSquare />
              <FaReddit />
              <FaTiktok />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}