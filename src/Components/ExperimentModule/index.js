import React, { useState } from 'react'
import { FaLock, FaLockOpen } from 'react-icons/fa'
import './index.css'

export default function ExperimentModule ({ data, setModules }) {
  const { lock } = data
  const [isOpenModule, setIsOpenModule] = useState(false)
  const [iterationList, setIterationList] = useState([
    { id: 'EM-1', title: 'Iteration title' },
    { id: 'EM-2', title: 'Iteration title' },
    { id: 'EM-3', title: 'Iteration title' }
  ])

  return (
    <div className={`experimentModule ${lock && 'disabled'}`}>
      <div
        className={`header ${isOpenModule && 'open'}`}
        onClick={() => !lock && setIsOpenModule(!isOpenModule)}
      >
        <span>Experiment Module</span>
        {lock ? <FaLock /> : <FaLockOpen />}
      </div>
      {isOpenModule && !lock
        ? (
          <div>
            <div
              className={`iterations ${iterationList.length === 1 && 'single'}`}
            >
              {iterationList.map((item) => {
                return (
                  <Iteration key={item.id} id={item.id} title={item.title} />
                )
              })}
            </div>
            <div className='footer'>
              <button className='action'>LOCK</button>
              <button className='action'>RESET</button>
              <button className='action add-iteration'>+ ADD ITERATION</button>
            </div>
          </div>
          )
        : null}
    </div>
  )
}

const Iteration = ({ id, title }) => {
  return (
    <div className='iteration'>
      <div className='info'>
        <span className='id'>{id}</span>
        <span className='title'>{title}</span>
      </div>
      <div className='selection'>
        <span className='text'>Selection</span>
        <span className='indicator' />
      </div>
    </div>
  )
}
