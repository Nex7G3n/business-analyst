import { useState } from 'react';
import './App.css';
import BalanceFinanciero from '@/components/Balance';
import News from '@/components/News';
import RatiosFinancieros from '@/components/Ratios';
import { Search } from '@/components/Search';
import { ChatGpt } from '@/components/ChatGpt';
import { Actions } from '@/components/Actions';
import { RatiosCalculator } from '@/components/RatiosCalculator';
import { WaccCalculator } from './components/WaccCalculator';
import { EVACalculator } from './components/EvaCalculator';
import { ApalancamientoCalculator } from './components/ApalancamientoCalculator';
import EbitdaCalculator from './components/Ebitda';
import { BondCalculator } from './components/BondCalculator';

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [symbol, setSymbol] = useState('');
  const [balance, setBalance] = useState(null);
  const [ratios, setRatios] = useState(null);
  const [news, setNews] = useState(null);
  const [actions, setActions] = useState(null);

  return (
    <div className="p-6 space-y-10">
      <header className="text-center space-y-4">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-500 drop-shadow-lg">
          Dashboard Financiero
        </h1>
        <p className="text-lg text-gray-600">
          Realiza cálculos financieros avanzados y consulta datos relevantes en tiempo real.
        </p>
      </header>

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

      {/* Secciones condicionales */}
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

      {(!loading && !actions && !news && !ratios && !balance) && (
        <div className="grid gap-4 grid-cols-1 w-3/5 mx-auto">
          <RatiosCalculator />
          <ApalancamientoCalculator />
          <EVACalculator />
          <WaccCalculator />
          <EbitdaCalculator />
          <BondCalculator />
        </div>
      )}
    </div>
  );
}

export default App;
