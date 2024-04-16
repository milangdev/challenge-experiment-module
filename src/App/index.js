import Layout from '../Components/Layout'
import ExperimentModule from '../Components/ExperimentModule'
import './index.css'
import { useState } from 'react'

export default function App () {
  const [modules, setModules] = useState([
    {
      id: '1',
      iterations: []
    },
    {
      id: '2',
      lock: false,
      iterations: [
        { id: 'EM-1', title: 'Iteration title' },
        { id: 'EM-2', title: 'Iteration title' },
        { id: 'EM-3', title: 'Iteration title' }
      ]
    },
    {
      id: '3',
      lock: true,
      iterations: [
        { id: 'EM-1', title: 'Iteration title' },
        { id: 'EM-2', title: 'Iteration title' },
        { id: 'EM-3', title: 'Iteration title' }
      ]
    }
  ])

  const handleAddExperimentModule = () => {
    setModules([...modules, { id: modules.length + 1, iterations: [] }])
  }
  return (
    <Layout>
      <div className='modules-wrapper'>
        {modules.map((item) => {
          return <ExperimentModule data={item} key={item.id} setModules={setModules} />
        })}
        <div className='button-add-experiment-module'>
          <button onClick={handleAddExperimentModule}>Add Experiment Module</button>
        </div>
      </div>
    </Layout>
  )
}
