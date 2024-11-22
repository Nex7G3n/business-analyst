import { useState } from 'react';
import './App.css';
import BalanceFinanciero from '@/components/Balance';
import News from '@/components/News';
import RatiosFinancieros from '@/components/Ratios'
import { Search } from '@/components/Search';
import { ChatGpt } from '@/components/ChatGpt';
import { Actions } from '@/components/Actions';
import { RatiosCalculator } from '@/components/RatiosCalculator'
import FinancialPieChart from './components/Torta';
import { WaccCalculator } from './components/WaccCalculator';

function App() {
  const [symbol, setSymbol] = useState('');
  const [balance, setBalance] = useState(null);
  const [ratios, setRatios] = useState(null);
  const [news, setNews] = useState(null);
  const [actions, setActions] = useState(null);

  return (
    <div className="p-6 space-y-10"> {/* Espaciado vertical entre secciones */}
      <RatiosCalculator />
      <WaccCalculator/>
      <Search 
        symbol={symbol} 
        setSymbol={setSymbol} 
        setBalance={setBalance} 
        setRatios={setRatios} 
        setNews={setNews} 
        setActions={setActions} 
      />


      <div className="flex space-x-6">
        <RatiosFinancieros ratios={ratios}/>
        <Actions chartData={actions} />
      </div> 

      {/* Balance ratios */}
      <div className="border p-4 rounded-xl shadow-sm">
        <BalanceFinanciero balance={balance} />
      </div>

      <div className="border p-4 rounded-xl shadow-md">
        <ChatGpt 
          actions={actions} 
          news={news} 
          ratios={ratios} 
          balance={balance} 
        />
      </div>
      {/* News */}
      <div className="border p-4 rounded-xl shadow-md">
        <News news={news} />
      </div>
    </div>
  );
}

export default App;
