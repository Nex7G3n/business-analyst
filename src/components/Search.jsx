import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from 'axios';

export const Search = ({ symbol, setSymbol, setBalance, setRatios, setNews, setActions, setLoading, setError, setAdvaceRatios }) => {

    const apiKey = 'QA2PPVULFLD4FCBN';
    const apikey_news = 'b5a3aca5a3e843cebc952c471d7cd32d';

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);
        setNews(null);
        setActions(null);

        const inputSymbol = event.target[0].value;
        setSymbol(inputSymbol);

        try {
            const financialData = await getFinancialData(inputSymbol);
            if (financialData) {
                setBalance(financialData);
                const calculatedRatios = calculateRatios(financialData);
                setRatios(calculatedRatios);
                const advaceRatios = calculateAdvancedIndicators(financialData);
                setAdvaceRatios(advaceRatios)
            } else {
                setBalance(null);
                setRatios(null);
                throw new Error('No se encontraron datos financieros para este símbolo.');
            }

            await getArticles(inputSymbol);
            await getActions(inputSymbol);
        } catch (err) {
            setError(err.message || 'Error desconocido al obtener los datos.');
        } finally {
            setLoading(false);
        }
    }

    const getFinancialData = async (symbol) => {
      const balanceEndpoint = `https://www.alphavantage.co/query?function=BALANCE_SHEET&symbol=${symbol}&apikey=${apiKey}`;
      const earningsEndpoint = `https://www.alphavantage.co/query?function=INCOME_STATEMENT&symbol=${symbol}&apikey=${apiKey}`;
      const overviewEndpoint = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${apiKey}`;

      try {
        const balanceResponse = await axios.get(balanceEndpoint);
        const earningsResponse = await axios.get(earningsEndpoint);
        const overviewResponse = await axios.get(overviewEndpoint);

        console.log('Respuesta del balance:', balanceResponse.data);
        console.log('Respuesta de ingresos:', earningsResponse.data);
        console.log('Respuesta de overview:', overviewResponse.data);

        if (!balanceResponse.data.annualReports || balanceResponse.data.annualReports.length === 0) {
          console.error('No se encontraron datos de balance para esta empresa');
          return null;
        }

        if (!earningsResponse.data.annualReports || earningsResponse.data.annualReports.length === 0) {
          console.error('No se encontraron datos de ingresos para esta empresa');
          return null;
        }

        const balance = balanceResponse.data.annualReports[0];
        const earnings = earningsResponse.data.annualReports[0];
        const overview = overviewResponse.data;
        // console.log(overview)


        if (!balance || !earnings) {
          console.error('No se encontraron datos para esta empresa');
          return null;
        }

        
        return {
          disponible: parseFloat(balance.cashAndCashEquivalentsAtCarryingValue) || 0,
          bancosFII: parseFloat(balance.shortTermInvestments) || 0,
          otrasDisponibilidades: parseFloat(balance.cash) || 0,
          carteraCreditos: parseFloat(balance.netReceivables) || 0,
          creditosVigentes: parseFloat(balance.totalCurrentAssets) || 0,
          creditosCobranza: parseFloat(balance.currentNetReceivables) || 0,
          provisionesCreditos: parseFloat(balance.totalCurrentLiabilities) || 0,
          inmueblesEquipos: parseFloat(balance.propertyPlantEquipment) || 0,
          totalActivo: parseFloat(balance.totalAssets) || 0,
          obligacionesAsociados: parseFloat(balance.totalCurrentLiabilities) || 0,
          obligacionesAhorro: parseFloat(balance.shortTermDebt) || 0,
          obligacionesPlazo: parseFloat(balance.longTermDebt) || 0,
          gastosPorPagar: parseFloat(earnings.operatingExpenses) || 0,
          cuentasPorPagar: parseFloat(balance.accountsPayable) || 0,
          provisionesAsociativas: parseFloat(balance.deferredRevenue) || 0,
          totalPasivo: parseFloat(balance.totalLiabilities) || 0,
          capitalSocial: parseFloat(balance.commonStock) || 0,
          reservas: parseFloat(balance.retainedEarnings) || 0,
          resultadosAcumulados: parseFloat(balance.accumulatedOtherComprehensiveIncomeLoss) || 0,
          resultadoEjercicio: parseFloat(earnings.netIncome) || 0,
          totalPatrimonio: parseFloat(balance.totalShareholderEquity) || 0,
          totalPasivoPatrimonio: (parseFloat(balance.totalShareholderEquity) || 0) + (parseFloat(balance.totalLiabilities) || 0),
          peRatio: parseFloat(overview.PERatio) || 0,
          priceToBook: parseFloat(overview.PriceToBookRatio) || 0,
          dividendPerShare: parseFloat(overview.DividendPerShare) || 0,
          dividendYield: parseFloat(overview.DividendYield) || 0,
          payoutRatio: parseFloat(overview.PayoutRatio) || 0,
          growthRate: parseFloat(overview.RevenueGrowth) || 0, 
        };
      } catch (error) {
        console.error('Error en la API:', error);
        return null;
      }
    };

    const calculateRatios = (data) => {
      const ratios = {};
      ratios.per = data.peRatio;
      ratios.pv = data.price / (data.revenue / data.sharesOutstanding);
      ratios.priceToBook = data.priceToBook;
      ratios.evEbitda = (data.price * data.sharesOutstanding) / data.ebitda;
      ratios.peg = data.peRatio / data.growthRate;
      ratios.roa = data.netIncome / (data.activosCorrientes + data.activosNoCorrientes);
      ratios.roe = data.netIncome / data.patrimonio;
      ratios.bpa = data.netIncome / data.sharesOutstanding;
      ratios.dpa = data.dividendPerShare;
      ratios.yield = data.dividendYield;
      ratios.payout = data.payoutRatio;
    
      return ratios;
    }

    const calculateAdvancedIndicators = (data) => {
      const safeCalculate = (fn) => {
        try {
          return fn();
        } catch (e) {
          return "error";
        }
      };
    
      // UAIDI
      const UAIDI = safeCalculate(() => {
        return (
          data.resultadoEjercicio +
          data.gastosPorPagar -
          data.resultadosAcumulados +
          data.provisionesAsociativas
        );
      });
    
      // NOF
      const NOF = safeCalculate(() => {
        const activosCirculantesOperativos =
          data.carteraCreditos +
          data.creditosVigentes +
          data.creditosCobranza;
        const pasivosCirculantesOperativos =
          data.obligacionesAsociados + data.cuentasPorPagar;
    
        return activosCirculantesOperativos - pasivosCirculantesOperativos;
      });
    
      // NF
      const NF = safeCalculate(() => {
        if (NOF === "error") throw new Error("NOF calculation failed");
        const recursosFinancierosPermanentes =
          data.capitalSocial + data.reservas + data.resultadosAcumulados;
    
        return NOF - recursosFinancierosPermanentes;
      });
    
      // WACC
      const WACC = safeCalculate(() => {
        if (data.totalActivo === 0) throw new Error("El total de activos no puede ser cero.");
    
        const wd = data.obligacionesPlazo / data.totalActivo; // Peso deuda
        const wq = 1 - wd; // Peso capital
    
        const td = 0.07; // Tasa promedio de deuda
        const riskFreeRate = 0.03; // Tasa libre de riesgo
        const beta = 1.2; // Beta de la empresa
        const marketReturn = 0.08; // Retorno del mercado
    
        const CAPM = riskFreeRate + beta * (marketReturn - riskFreeRate);
        return wd * td * (1 - 0.295) + wq * CAPM;
      });
    
      // EVA
      const EVA = safeCalculate(() => {
        if (WACC === "error" || UAIDI === "error") {
          throw new Error("WACC or UAIDI calculation failed");
        }
    
        return UAIDI - WACC * data.totalActivo;
      });
    
      return { wacc: WACC, uaidi: UAIDI, eva: EVA, nof: NOF, nf: NF };
    };
    
    

    const getArticles = async (symbol) => {
        axios.get(`https://newsapi.org/v2/everything?q=${symbol}&language=es&sortBy=publishedAt&apiKey=${apikey_news}`)
        .then(response => {
            setNews(response.data.articles.slice(0, 20));
            console.log('Noticias:', response.data.articles);
        })
        .catch(error => {
            console.error('Error al hacer la solicitud de noticias:', error);
        });
    }

    function predictFuture(data) {
      if (!data || !data['Time Series (Daily)']) {
        return 'Datos insuficientes para hacer una predicción';
      }
  
      const timeSeries = data['Time Series (Daily)'];
      const closingPrices = Object.keys(timeSeries).map(date => parseFloat(timeSeries[date]['4. close']));
  
      if (closingPrices.length < 2) {
        return 'No hay suficientes datos históricos para hacer una predicción';
      }
  
      let risingCount = 0;
      let fallingCount = 0;
  
      for (let i = 0; i < closingPrices.length - 1; i++) {
        if (closingPrices[i] > closingPrices[i + 1]) {
          risingCount++;
        } else {
          fallingCount++;
        }
      }
  
      if (risingCount > fallingCount) {
        return 'Subirá';
      } else {
        return 'Bajará';
      }
    }
  
    async function getActions(symbol) {
      try {
        const response = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${apiKey}`);
        const result = await response.json();
        // const result = actionsResponse;
        if (result['Error Message']) {
          setActions(null);
        } else {
          console.log('Datos de acciones:', result);
          const actions = Object.entries(result["Time Series (Daily)"]).map(([date, values]) => ({
            date: date,
            desktop: parseFloat(values["1. open"]), // open
            mobile: parseFloat(values["4. close"]) ,  // close
            open: parseFloat(values["1. open"]),
            high: parseFloat(values["2. high"]),
            low: parseFloat(values["3. low"]),
            close: parseFloat(values["4. close"]),
            volume: parseInt(values["5. volume"]),
          })).reverse();

          setActions(actions);
        }
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    }

    return (
<form 
  className="flex w-full items-center justify-center space-x-4"
  onSubmit={handleSubmit}
>
  {/* Campo de entrada */}
  <div className="relative w-full max-w-lg">
    <Input 
      type="text" 
      placeholder="Introduce un término o símbolo..." 
      className="w-full rounded-md border border-gray-300 shadow-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
    />
    {/* Ícono decorativo en el input */}
    <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
      <svg 
        className="w-5 h-5 text-gray-400" 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth="2" 
          d="M8 16l-4-4m0 0l4-4m-4 4h16" 
        />
      </svg>
    </div>
  </div>

  {/* Botón de búsqueda */}
  <Button 
    type="submit" 
    className="px-6 py-3 text-white rounded-md flex items-center bg-gradient-to-r from-blue-500 to-green-500 shadow-md hover:scale-110"
  >
    <svg 
      className="w-5 h-5 mr-2" 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="currentColor"
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth="2" 
        d="M10 19l-7-7 7-7m8 14l-7-7 7-7" 
      />
    </svg>
    Buscar
  </Button>
</form>

    )
}