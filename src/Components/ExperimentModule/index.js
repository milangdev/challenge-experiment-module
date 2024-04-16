import React, { useState } from 'react'
import { FaLock, FaLockOpen } from 'react-icons/fa'
import './index.css'
import IterationModal from '../IterationModal'

const titles = [
  'Ethereal Adventure',
  'Whispers in the Dark',
  'Lost in Translation',
  'Midnight Serenade',
  'Echoes of Eternity',
  'Fragments of Tomorrow',
  'Dancing with Shadows',
  'Starlight Symphony',
  'Whirlwind of Whispers',
  'Secrets of the Forgotten',
  'Dreamscape',
  'Moonlit Melody',
  'Whispering Winds',
  'Emerald Enchantment'
]

export default function ExperimentModule ({ data, setModules }) {
  const { id, lock, iterations } = data
  const [isOpenModule, setIsOpenModule] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isAddIteration, setIsAddIteration] = useState(false)
  const [title, setTitle] = useState('')

  const newTitleId = `EM-${iterations.length + 1}`

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const getLengthRange = (lengthType) => {
    switch (lengthType) {
      case 'short':
        return { min: 0, max: 12 }
      case 'medium':
        return { min: 12, max: 24 }
      case 'long':
        return { min: 24, max: 35 }
      default:
        return { min: 0, max: 12 }
    }
  }

  const handleGenerateIteration = (lengthType) => {
    const filteredTitles = titles.filter(function (title) {
      const lengthRange = getLengthRange(lengthType)
      return title.length >= lengthRange.min && title.length <= lengthRange.max
    })

    const randomIndex = Math.floor(Math.random() * filteredTitles.length)

    setModules((modules) =>
      modules.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            lock: false,
            iterations: [
              ...item.iterations,
              { id: newTitleId, title: filteredTitles[randomIndex] }
            ]
          }
        }
        return item
      })
    )
    setIsAddIteration(false)
    setIsModalOpen(false)
    setTitle('')
  }

  const handleAddIteration = () => {
    if (!title) return
    setModules((modules) =>
      modules.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            lock: false,
            iterations: [...item.iterations, { id: newTitleId, title }]
          }
        }
        return item
      })
    )
    setIsAddIteration(false)
    setTitle('')
  }

  const handleExperimentModuleClick = () => {
    setIsOpenModule(!isOpenModule)
    setIsAddIteration(false)
  }

  const getExperimentMoState = () => {
    if (lock) return 'Locked'
    else if (!lock && iterations.length > 0) return 'Unlocked'
    else if (iterations.length === 0) return 'Empty'
  }

  const handleLock = () => {
    setModules((modules) =>
      modules.map((item) => {
        if (item.id === id) {
          return { ...item, lock: !lock }
        }
        return item
      })
    )
    if (!lock) {
      setIsOpenModule(false)
    }
  }

  const handleReset = () => {
    setTitle('')
    setModules((modules) =>
      modules.map((item) => {
        if (item.id === id) {
          delete item.lock
          return {
            ...item,
            iterations: []
          }
        }
        return item
      })
    )
    setIsAddIteration(false)
  }

  return (
    <div>
      <IterationModal
        isOpen={isModalOpen}
        id={newTitleId}
        onClose={closeModal}
        onConfirm={handleGenerateIteration}
      />
      <div className='experiment-module-state'>{getExperimentMoState()}</div>
      <div
        className={`experiment-module ${(lock || isOpenModule) && 'default'}`}
        data-testid='experiment-module'
      >
        <div
          className={`header ${isOpenModule && 'open'}`}
          onClick={handleExperimentModuleClick}
        >
          <span>Experiment Module</span>
          {lock ? <FaLock /> : lock === false && <FaLockOpen />}
        </div>
        {isOpenModule
          ? (
            <div>
              {!lock && (
                <>
                  <div
                    className={`iterations ${
                    iterations.length === 1 && 'single'
                  }`}
                  >
                    {iterations.map((item) => {
                      return (
                        <Iteration
                          key={item.id}
                          id={item.id}
                          title={item.title}
                        />
                      )
                    })}
                    {(isAddIteration || iterations.length === 0) && (
                      <IterationAdd
                        id={newTitleId}
                        title={title}
                        handleOnChange={(e) => setTitle(e.target.value)}
                      />
                    )}
                  </div>
                  {(isAddIteration || iterations.length === 0) && (
                    <div className='add-iteration-info'>
                      To add a new iteration, start typing a prompt or{' '}
                      <span className='click' onClick={openModal}>
                        generate
                      </span>{' '}
                      one.
                    </div>
                  )}
                </>
              )}
              <div className='footer'>
                {(isAddIteration || iterations.length === 0) && !lock
                  ? (
                    <>
                      <button className='action'>CANCEL</button>
                      <button
                        className='action add-iteration'
                        onClick={handleAddIteration}
                      >
                        DONE
                      </button>
                    </>
                    )
                  : (
                    <>
                      <button className='action' onClick={handleLock}>
                        {lock ? 'UNLOCK' : 'LOCK'}
                      </button>
                      {!lock && (
                        <>
                          <button className='action' onClick={handleReset}>RESET</button>
                          <button
                            className='action add-iteration'
                            onClick={() => setIsAddIteration(true)}
                          >
                            + ADD ITERATION
                          </button>
                        </>
                      )}
                    </>
                    )}
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

const IterationAdd = ({ id, title, handleOnChange }) => {
  return (
    <div className='iteration single'>
      <div className='info'>
        <span className='id'>{id}</span>
        <input
          className='input add-iteration'
          type='text'
          onChange={handleOnChange}
          value={title}
          placeholder='Adding iteration...'
        />
      </div>
    </div>
  )
}
