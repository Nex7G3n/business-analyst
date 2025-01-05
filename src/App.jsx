import './App.css';
import { CalculatorGrid } from './components/CalculatorGrid';
import { Search } from './components/Search';
import { SearchProvider } from './context/search.context';
import ScrollingText from './components/Test';

function App() {
  return (
    <SearchProvider>
      <div className="p-6 space-y-10">
        <header className="text-center space-y-4">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-500 drop-shadow-lg">
            Dashboard Financiero
          </h1>
          <p className="text-lg text-gray-600">
            Realiza cálculos financieros avanzados y consulta datos relevantes en tiempo real.
          </p>
        </header>
      </div>
      <Search />
      <ScrollingText />
      <CalculatorGrid />
    </SearchProvider>
  );
}

export default App;
