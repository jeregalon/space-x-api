import { useEffect } from 'react'
import Card from './components/Card'
import { useHistory } from './hooks/useHistory'

function App() {
  const { history, getHistory, error } = useHistory()

  useEffect(() => {
    getHistory()
  }, [])

  return (
    <div className='flex flex-col items-center p-4 g-4'>
      <h1>Cronología de SpaceX</h1>
      {history
        ? history.map(m => (
          <Card 
            key={m.id}
            title={m.title}
            article={m.article}
            date={m.date}
            details={m.details}
          />
        ))
        : <p>No history to show</p>
      }
      {error && <p>{error}</p>}
    </div>
  )
}

export default App
