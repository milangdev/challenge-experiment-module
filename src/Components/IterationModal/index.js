import { useRef, useState } from 'react'
import './index.css'

export default function IterationModal ({ id, isOpen, onClose, onConfirm }) {
  const modalRef = useRef()

  const [titleLength, setTitleLength] = useState('short')

  const handleOverlayClick = (event) => {
    if (event.target === modalRef.current) {
      onClose()
    }
  }

  const handleOnConfirm = () => {
    setTitleLength(12)
    onConfirm(titleLength)
  }

  return (
    <>
      {isOpen && (
        <div
          className='modal-overlay'
          ref={modalRef}
          onClick={handleOverlayClick}
        >
          <div className='modal'>
            <div className='modal-content'>
              <div>
                <p className='iteration-id'>{id}</p>
              </div>
              <div>
                <p className='iteration-title'>Iteration title</p>
                <div className='iteration-buttons'>
                  <button className={`${titleLength === 'short' && 'iteration-button-active'}`} onClick={() => setTitleLength('short')}>short</button>
                  <button className={`${titleLength === 'medium' && 'iteration-button-active'}`} onClick={() => setTitleLength('medium')}>medium length</button>
                </div>
                <button className={`${titleLength === 'long' && 'iteration-button-active'} iteration-third-button`} onClick={() => setTitleLength('long')}>
                  very very very long (up to 35 char)
                </button>
                <div className='divider' />
                <div className='footer-button'>
                  <button onClick={onClose}>remove</button>
                  <button className='footer-active' onClick={handleOnConfirm}>done</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
