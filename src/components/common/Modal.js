import React from 'react'
import CrossIcon from "../../assets/images/CrossIcon.svg"

const Modal = ({ children, onCloseModalHandler = () => {} }) => {
  return (
    <div className="modal">
        <div className="modal-content">
            <img src={CrossIcon} alt='Cross Icon' width={17} className='modal-cross-icon' onClick={onCloseModalHandler} />
            {children}
        </div>
    </div>
  )
}

export default Modal