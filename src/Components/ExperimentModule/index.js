import React, { useState } from 'react'
import { FaLock, FaLockOpen } from 'react-icons/fa'
import './index.css'
import IterationModal from '../IterationModal'

export default function ExperimentModule ({ data, setModules }) {
  const { id, lock, iterations } = data
  const [isOpenModule, setIsOpenModule] = useState(false)
  const [isIterationsModalOpen, setIsIterationsModalOpen] = useState(false)
  const [activeIterationModal, setActiveIterationModal] = useState({})
  const [isAddIteration, setIsAddIteration] = useState(false)
  const [prompt, setPrompt] = useState('')
  const [title, setTitle] = useState('')

  const newTitleId = `EM-${iterations?.length + 1}`

  const openModal = (data) => {
    setIsIterationsModalOpen(true)
    setActiveIterationModal(data)
  }

  const closeModal = () => {
    setIsIterationsModalOpen(false)
    setActiveIterationModal({})
  }

  const handleUpdateIteration = (lengthType) => {
    setModules((modules) =>
      modules.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            iterations: item.iterations.map((iteration) => {
              if (iteration.id === activeIterationModal.id) {
                return { ...iteration, selection: lengthType }
              }
              return iteration
            })
          }
        }
        return item
      })
    )
    setIsAddIteration(false)
    closeModal()
    setTitle('')
    setPrompt('')
  }

  const handleRemoveIteration = (e) => {
    setModules((modules) =>
      modules.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            iterations: item.iterations.filter(
              (iteration) => iteration.id !== activeIterationModal.id
            )
          }
        }
        return item
      })
    )
    closeModal()
  }

  const handleAddIteration = (e) => {
    const iterationTitle = prompt || title
    if ((e?.key !== 'Enter' && prompt) || !iterationTitle?.trim()) return
    setModules((modules) =>
      modules.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            lock: false,
            iterations: [
              ...item.iterations,
              { id: newTitleId, title: iterationTitle }
            ]
          }
        }
        return item
      })
    )
    setIsAddIteration(false)
    setTitle('')
    setPrompt('')
  }

  const handleExperimentModuleClick = () => {
    setIsOpenModule(!isOpenModule)
    setIsAddIteration(false)
  }

  const getExperimentMoState = () => {
    if (lock) return 'Locked'
    else if (!lock && iterations?.length > 0) return 'Unlocked'
    else if (iterations?.length === 0) return 'Empty'
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
    setPrompt('')
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
        isOpen={isIterationsModalOpen}
        data={activeIterationModal}
        onClose={closeModal}
        onRemove={handleRemoveIteration}
        onConfirm={handleUpdateIteration}
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
                    iterations?.length === 1 && 'single'
                  }`}
                  >
                    {iterations?.map((item) => {
                      return (
                        <Iteration
                          key={item.id}
                          id={item.id}
                          onClick={() => openModal(item)}
                          title={item.title}
                        />
                      )
                    })}
                    {(isAddIteration || iterations?.length === 0) && (
                      <IterationAdd
                        id={newTitleId}
                        title={title}
                        handleOnChange={(e) => setTitle(e.target.value)}
                      />
                    )}
                  </div>
                  {(isAddIteration || iterations?.length === 0) && (
                    <div className='add-iteration-info'>
                      <textarea
                        type='text'
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        onKeyDown={handleAddIteration}
                        placeholder='To add a new iteration, start typing a prompt or generate one.'
                      />
                    </div>
                  )}
                </>
              )}
              <div className='footer'>
                {(isAddIteration || iterations?.length === 0) && !lock
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
                          <button className='action' onClick={handleReset}>
                            RESET
                          </button>
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

const Iteration = ({ id, title, onClick }) => {
  return (
    <div className='iteration'>
      <div className='info' onClick={onClick}>
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
