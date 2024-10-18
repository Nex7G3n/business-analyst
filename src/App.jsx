import { useState } from 'react';
import './App.css';
import Balance_ratios from '@/components/Balance_Ratios';
import News from '@/components/News';
import { Search } from '@/components/Search';
import { ChatGpt } from '@/components/ChatGpt';
import { Actions } from '@/components/Actions';

function App() {
  const [symbol, setSymbol] = useState('');
  const [balance, setBalance] = useState(null);
  const [ratios, setRatios] = useState(null);
  const [news, setNews] = useState(null);
  const [actions, setActions] = useState(null);

  return (
    <div className="p-6 space-y-10"> {/* Espaciado vertical entre secciones */}
      
        <Search 
          symbol={symbol} 
          setSymbol={setSymbol} 
          setBalance={setBalance} 
          setRatios={setRatios} 
          setNews={setNews} 
          setActions={setActions} 
        />

      {/* Balance ratios */}
      <div className="border p-4 rounded-xl shadow-sm">
        <Balance_ratios balance={balance} ratios={ratios} />
      </div>

      {/* ChatGpt y Actions alineados horizontalmente */}
      <div className="flex space-x-6"> {/* Espaciado horizontal entre los dos */}
        <div className="w-1/2 border p-4 rounded-xl shadow-md">
          <ChatGpt 
            actions={actions} 
            news={news} 
            ratios={ratios} 
            balance={balance} 
          />
        </div>
          <Actions chartData={actions} />
        
      </div>

      {/* News */}
      <div className="border p-4 rounded-xl shadow-md">
        <News news={news} />
      </div>
    </div>
  );
}

export default App;
