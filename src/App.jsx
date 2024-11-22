import { useState } from 'react';
import './App.css';
import BalanceFinanciero from '@/components/Balance';
import News from '@/components/News';
import RatiosFinancieros from '@/components/Ratios';
import { Search } from '@/components/Search';
import { ChatGpt } from '@/components/ChatGpt';
import { Actions } from '@/components/Actions';
import { RatiosCalculator } from '@/components/RatiosCalculator';
import FinancialPieChart from './components/Torta';
import { EVACalculator } from './components/EvaCalculator';
import { ApalancamientoCalculator } from './components/ApalancamientoCalculator';

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [symbol, setSymbol] = useState('');
  const [balance, setBalance] = useState(null);
  const [ratios, setRatios] = useState(null);
  const [news, setNews] = useState(null);
  const [actions, setActions] = useState(null);

  const hasSearched = symbol !== '';

  return (
    <div className="p-6 space-y-10">
      <Search 
        symbol={symbol} 
        setSymbol={setSymbol} 
        setBalance={setBalance} 
        setRatios={setRatios} 
        setNews={setNews} 
        setActions={setActions} 
        setLoading={setLoading}
        setError={setError}
      />
      {(loading || ratios || actions) && (
        <div className="flex space-x-6">
          <RatiosFinancieros ratios={ratios} loading={loading} error={error} />
          <Actions chartData={actions} loading={loading} error={error} />
        </div>
      )}

      {(loading || balance) && (
        <div className="border p-4 rounded-xl shadow-sm">
          <BalanceFinanciero balance={balance} loading={loading} error={error} />
        </div>
      )}

      {(loading || actions || news || ratios || balance) && (
        <div className="border p-4 rounded-xl shadow-md">
          <ChatGpt 
            actions={actions} 
            news={news} 
            ratios={ratios} 
            balance={balance} 
          />
        </div>
      )}

      {(loading || news) && (
        <div className="border p-4 rounded-xl shadow-md">
          <News news={news} loading={loading} error={error} />
        </div>
      )}

      {(!loading || !actions || !news || !ratios || !balance) && (
        <div className="">
          <RatiosCalculator />
          <ApalancamientoCalculator />
          <EVACalculator />
        </div>
      )}
    </div>
  );
}

export default App;
