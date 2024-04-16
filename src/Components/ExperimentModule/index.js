import React, { useState } from 'react'
import { FaLock, FaLockOpen } from 'react-icons/fa'
import './index.css'

export default function ExperimentModule ({ data, setModules }) {
  const { lock, iterations } = data
  const [isOpenModule, setIsOpenModule] = useState(false)

  const getExperimentMoState = () => {
    if (lock) return 'Locked'
    else if (!lock && iterations.length > 0) return 'Unlocked'
    else if (iterations.length === 0) return 'Empty'
  }

  return (
    <div>
      <div className='experiment-module-state'>{getExperimentMoState()}</div>
      <div className={`experiment-module ${lock && 'disabled'}`}>
        <div
          className={`header ${isOpenModule && 'open'}`}
          onClick={() => !lock && setIsOpenModule(!isOpenModule)}
        >
          <span>Experiment Module</span>
          {lock ? <FaLock /> : lock === false && <FaLockOpen />}
        </div>
        {isOpenModule && !lock
          ? (
            <div>
              <div
                className={`iterations ${iterations.length === 1 && 'single'}`}
              >
                {iterations.map((item) => {
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
