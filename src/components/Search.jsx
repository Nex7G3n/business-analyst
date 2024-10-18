import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { data } from "autoprefixer";
import axios from 'axios';
import { balanceResponse } from '@/data/balanceResponse'
import { earningsResponse } from '@/data/earningsResponse'
import { overviewResponse } from '@/data/overviewResponse'
import { actionsResponse }  from '@/data/actionsResponse'

export const Search = ({ symbol, setSymbol, setBalance, setRatios, setNews, setActions }) => {
    const apiKey = '  ';
    const apikey_news = '75a1603eecb042598d28343256620698';

    const handleSubmit = async (event) => {
      setNews(null);
      setActions(null);

      event.preventDefault();
      const inputSymbol = event.target[0].value;
      setSymbol(inputSymbol);
      const financialData = await getFinancialData(inputSymbol);
      if (financialData) {
        setBalance(financialData);
        const calculatedRatios = calculateRatios(financialData);
        setRatios(calculatedRatios);
      } else {
        setBalance(null);
        setRatios(null);
      }
      await getArticles(inputSymbol);
      await getActions(inputSymbol);
  }




    const getFinancialData = async (symbol) => {
      // const balanceEndpoint = `https://www.alphavantage.co/query?function=BALANCE_SHEET&symbol=${symbol}&apikey=${apiKey}`;
      // const earningsEndpoint = `https://www.alphavantage.co/query?function=INCOME_STATEMENT&symbol=${symbol}&apikey=${apiKey}`;
      // const overviewEndpoint = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${apiKey}`;

      try {
        // const balanceResponse = await axios.get(balanceEndpoint);
        // const earningsResponse = await axios.get(earningsEndpoint);
        // const overviewResponse = await axios.get(overviewEndpoint);

        // console.log('Respuesta del balance:', balanceResponse.data);
        // console.log('Respuesta de ingresos:', earningsResponse.data);
        // console.log('Respuesta de overview:', overviewResponse.data);

        // if (!balanceResponse.data.annualReports || balanceResponse.data.annualReports.length === 0) {
        //   console.error('No se encontraron datos de balance para esta empresa');
        //   return null;
        // }

        // if (!earningsResponse.data.annualReports || earningsResponse.data.annualReports.length === 0) {
        //   console.error('No se encontraron datos de ingresos para esta empresa');
        //   return null;
        // }

        const balance = balanceResponse.data.annualReports[0];
        const earnings = earningsResponse.data.annualReports[0];
        const overview = overviewResponse.data;
        console.log(overview)


        if (!balance || !earnings) {
          console.error('No se encontraron datos para esta empresa');
          return null;
        }

        
        return {
          disponible: balance.cashAndCashEquivalentsAtCarryingValue || 0,
          bancosFII: balance.shortTermInvestments || 0,
          otrasDisponibilidades: balance.cash || 0,
          carteraCreditos: balance.netReceivables || 0,
          creditosVigentes: balance.totalCurrentAssets || 0,
          creditosCobranza: balance.currentNetReceivables || 0,
          provisionesCreditos: balance.totalCurrentLiabilities || 0,
          inmueblesEquipos: balance.propertyPlantEquipment || 0,
          totalActivo: balance.totalAssets || 0,
          obligacionesAsociados: balance.totalCurrentLiabilities || 0,
          obligacionesAhorro: balance.shortTermDebt || 0,
          obligacionesPlazo: balance.longTermDebt || 0,
          gastosPorPagar: earnings.operatingExpenses || 0,
          cuentasPorPagar: balance.accountsPayable || 0,
          provisionesAsociativas: balance.deferredRevenue || 0,
          totalPasivo: balance.totalLiabilities || 0,
          capitalSocial: balance.commonStock || 0,
          reservas: balance.retainedEarnings || 0,
          resultadosAcumulados: balance.accumulatedOtherComprehensiveIncomeLoss || 0,
          resultadoEjercicio: earnings.netIncome || 0,
          totalPatrimonio: balance.totalShareholderEquity || 0,
          totalPasivoPatrimonio: balance.totalLiabilitiesAndShareholdersEquity || 0,
          peRatio: overview.PERatio || 0,
          priceToBook: overview.PriceToBookRatio || 0,
          dividendPerShare: overview.DividendPerShare || 0,
          dividendYield: overview.DividendYield || 0,
          payoutRatio: overview.PayoutRatio || 0,
          growthRate: overview.RevenueGrowth || 0, 
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
      const apiKey_actions = 'DSRMZ2S6ADA4FD9B';

      try {
        // const response = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${apiKey_actions}`);
        // const result = await response.json();
        const result = actionsResponse;
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
          }));

          setActions(actions);
        }
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    }

    return (
        <form className="flex w-full max-w-sm items-center space-x-2" onSubmit={handleSubmit}>
            <Input type="text" placeholder="Busqueda"/>
            <Button type="submit">Buscar</Button>
        </form>
    )
}
