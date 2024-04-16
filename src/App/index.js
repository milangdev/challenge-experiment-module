import Layout from '../Components/Layout'
import Module from '../Components/ExperimentModule'
import './index.css'
import { useState } from 'react'

export default function App () {
  const [modules, setModules] = useState([
    {
      id: '1',
      lock: false
    },
    {
      id: '2',
      lock: false
    },
    {
      id: '3',
      lock: false
    },
    {
      id: '4',
      lock: true
    },
    {
      id: '5',
      lock: false
    }
  ])
  return (
    <Layout>
      <div className='modules-wrapper'>
        {modules.map((item) => {
          return <Module data={item} key={item.id} setModules={setModules} />
        })}
      </div>
    </Layout>
  )
}
