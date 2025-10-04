import { useState } from 'react'
import milestones from './mocks/results.json'
import Card from './components/Card'

function App() {
  return (
    <div className='flex flex-col items-center p-4 g-4'>
      <h1>Cronología de SpaceX</h1>
      {
        milestones.map(m => (
          <Card 
            title={m.title}
            article={m.links.article}
            date={m.event_date_utc}
            details={m.details}
          />
        ))
      }
    </div>
  )
}

export default App
