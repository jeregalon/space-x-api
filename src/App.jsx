import { act, useEffect } from 'react'
import Card from './components/Card'
import { useData } from './hooks/useData'
import Tabs from './components/Tabs'
import Info from './components/Info'
import useTabs from './hooks/useTabs'

function App() {
  const { activeTab,  moveToTab } = useTabs()
  const { data, getData, error } = useData(activeTab)

  useEffect(() => {
    getData(activeTab)
  }, [activeTab])

  return (
    <div className='flex flex-col items-center p-4 g-4'>
      <Tabs 
        activeTabId={activeTab}
        moveToTab={moveToTab}
      />
      <Info 
        tabId={activeTab}
        data={data}
      />
    </div>
  )
}

export default App
