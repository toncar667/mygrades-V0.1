import React from 'react'
import StatCards from './StatCards'
import Graph from './Graph'

const Grid = () => {
  return (
    <div className='px-4 grid gap-3 grid-cols-12'>
        <StatCards />
        <Graph />
    </div>
  )
}

export default Grid