import { useEffect } from 'react'

type props = {
  enableModal: boolean
  height: number
}

export default function Modal({ enableModal, height }: props) {
  return (
    <>
      <div
        className="modalBackground"
        style={{ height: height + 60 + 'px' }}
        hidden={enableModal}
      >
        <div className="modal">
          ss
          <div className="modalContent"></div>
        </div>
      </div>
    </>
  )
}
