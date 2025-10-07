import { useEffect } from 'react'
import Card from './components/HistoryCard'
import { useData } from './hooks/useData'
import Tabs from './components/Tabs'
import Info from './components/Info'
import useTabs from './hooks/useTabs'
import useBackground from './hooks/useBackground'
import { ImageCarousel } from './components/ImageCarousel'
import ErrorMessage from './components/ErrorMessage'

function App() {
  const { activeTab,  moveToTab } = useTabs()
  const { data, getData, _error } = useData(activeTab)
  const { activeBckgImg, setActiveBckgImg, backgroundImages } = useBackground()
  
  useEffect(() => {
    getData(activeTab)
  }, [activeTab])

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveBckgImg(prev => {
        return prev + 1 >= backgroundImages.length
          ? 0
          : prev + 1
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative min-h-screen">
      <ImageCarousel
        backgroundImages={backgroundImages}
        activeBckgImg={activeBckgImg}
      />

      {
        _error ? (
          <ErrorMessage errorMessage={_error}/>
        ) : (
          <div className="relative z-10 flex flex-col items-center justify-center h-full bg-black/40">
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
            
    </div>
  )
}

export default App
