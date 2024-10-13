import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Balance_ratios from  './components/Balance_Ratios'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Balance_ratios />
    </>
  )
}

export default App
