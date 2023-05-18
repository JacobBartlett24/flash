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
          <span className="price">${price} <br /></span>
          <span className="description">{description}</span>

        </div>
      </div>
    </>
  )
}