type props = {
  flashImage: string,
  description: string,
}

export default function FlashBox({ flashImage, description }: props) {
  return (
    <>
      <div className="card">
        <div className="media">
          <img src={flashImage} alt={description}></img>
        </div>
        <div className="desc">
          {description}
        </div>
      </div>
    </>
  )
}