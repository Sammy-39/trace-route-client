import { useState, useEffect } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import mqtt from 'mqtt'

import Map from './components/map'
import Loader from './components/loader';
import ErrorFallback from './components/errorFallback'
import './App.css';

const client = mqtt.connect('mqtt://broker.hivemq.com/mqtt', { port:8000 })
client.on('connect',()=>{
  client.subscribe(`location_updates`)
  client.subscribe('alert')
})

const App = () => {

  const [locations,setLocations] = useState([])
  const [isLoading,setIsLoading] = useState(false)
  const [isError,setIsError] = useState(false)

  useEffect(()=>{
    return ()=>client.end()
  },[])

  const handleGetLocationUpdates = async () =>{
    setLocations([])
    setIsLoading(true)
    setIsError(false)
    try{
      const res = await fetch(`http://localhost:5000/api/v1/getLocations`)
      const data = await res.json()
  
      if(res.status===200 && data.message==='success'){
        client.on('message',(topic,message)=>{
          if(topic===`location_updates`){
            setLocations(prev=>[...prev,JSON.parse(message)])
          }
          if(topic==='alert' && JSON.parse(message)==='end'){
            console.log(JSON.parse(message))
            setIsLoading(false)
          }  
        })
      }
    }
    catch(err){
      setIsLoading(false)
      setIsError(true)
      console.log(err)
    }
  }

  return(
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div className='App'>

        <Map locations={locations} />

        <div className='bottom-bar'>
          <button 
            className={`btn-loc ${isLoading && 'btn-loc-dis'}`}
            onClick={handleGetLocationUpdates}
            disabled={isLoading}
          > 
            Get Location Updates { isLoading && <Loader />}
          </button>

          { isError && <p className='loc-err'> 
            Unable to get the location data!
          </p> }
        </div>
      </div>
    </ErrorBoundary>
  )
}

export default App;
