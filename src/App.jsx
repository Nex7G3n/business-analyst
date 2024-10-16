import { useState } from 'react'
import './App.css'
import Balance_ratios from  './components/Balance_Ratios'
import News from  './components/News'
import { Search } from './components/Search'

function App() {
  return (
    <>
      <Search />
      <Balance_ratios />
    </>
  )
}

export default App
