import { useState } from 'react'
import './App.css'
import Balance_ratios from  './components/Balance_Ratios'
import News from  './components/News'
import { Search } from './components/Search'

function App() {
  const [symbol, setSymbol] = useState('');
  const [balance, setBalance] = useState(null);
  const [ratios, setRatios] = useState(null);
  const [news, setNews] = useState(null);
  return (
    <>
      <Search symbol={symbol} setSymbol={setSymbol} setBalance={setBalance} setRatios={setRatios} setNews={setNews}/>
      <Balance_ratios balance={balance} ratios={ratios}/>
      <News news={news}/>
    </>
  )
}

export default App
