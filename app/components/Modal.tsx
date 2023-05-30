import { useEffect } from 'react'
import { FaTimes } from 'react-icons/fa'

type props = {
  enableModal: any
  height: number
  modal: boolean
}

export default function Modal({ modal, height, enableModal }: props) {
  return (
    <>
      <div
        className="modalBackground"
        style={{ height: height + 60 + 'px' }}
        hidden={modal}
        onClick={() => enableModal(!modal)}
      >
        <div className="modal">
          <div className="modalContent">
            <div className="modalHeader">
              <FaTimes size={30} />
            </div>
            <div className="modalBody">
              <h1>Change profile picture</h1>
              <input type="file" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
