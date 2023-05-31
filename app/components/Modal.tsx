import { useEffect, useRef } from 'react'
import { FaTimes } from 'react-icons/fa'

type props = {
  enableModal: any
  modal: boolean
}

export default function Modal({modal, enableModal}: props) {

  const ref = useRef<HTMLDialogElement>(null)
  
  useEffect(() => {
    if(modal){
      ref.current?.showModal() 
    }else{
      ref.current?.close()
    }
  }, [modal])

  return (
    <>
      <dialog ref={ref}>
        <p>Greetings, one and all!</p>
        <form method="dialog">
          <button>OK</button>
        </form>
      </dialog>
    </>
  )
}
