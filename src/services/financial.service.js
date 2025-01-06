const apiKey = 'QA2PPVULFLD4FCBN'


// const getFinancialData = async (symbol) => {
//   const balanceEndpoint = `https://www.alphavantage.co/query?function=BALANCE_SHEET&symbol=${symbol}&apikey=${apiKey}`;
//   const earningsEndpoint = `https://www.alphavantage.co/query?function=INCOME_STATEMENT&symbol=${symbol}&apikey=${apiKey}`;
//   const overviewEndpoint = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${apiKey}`;

//   try {
//     const balanceResponse = await axios.get(balanceEndpoint);
//     const earningsResponse = await axios.get(earningsEndpoint);
//     const overviewResponse = await axios.get(overviewEndpoint);

//     console.log("Respuesta del balance:", balanceResponse.data);
//     console.log("Respuesta de ingresos:", earningsResponse.data);
//     console.log("Respuesta de overview:", overviewResponse.data);

//     if (
//       !balanceResponse.data.annualReports ||
//       balanceResponse.data.annualReports.length === 0
//     ) {
//       console.error("No se encontraron datos de balance para esta empresa");
//       return null;
//     }

//     if (
//       !earningsResponse.data.annualReports ||
//       earningsResponse.data.annualReports.length === 0
//     ) {
//       console.error("No se encontraron datos de ingresos para esta empresa");
//       return null;
//     }

//     const balance = balanceResponse.data.annualReports[0];
//     const earnings = earningsResponse.data.annualReports[0];
//     const overview = overviewResponse.data;

//     if (!balance || !earnings) {
//       console.error("No se encontraron datos para esta empresa");
//       return null;
//     }

//     return {
//       disponible:
//         parseFloat(balance.cashAndCashEquivalentsAtCarryingValue) || 0,
//       bancosFII: parseFloat(balance.shortTermInvestments) || 0,
//       otrasDisponibilidades: parseFloat(balance.cash) || 0,
//       carteraCreditos: parseFloat(balance.netReceivables) || 0,
//       creditosVigentes: parseFloat(balance.totalCurrentAssets) || 0,
//       creditosCobranza: parseFloat(balance.currentNetReceivables) || 0,
//       provisionesCreditos: parseFloat(balance.totalCurrentLiabilities) || 0,
//       inmueblesEquipos: parseFloat(balance.propertyPlantEquipment) || 0,
//       totalActivo: parseFloat(balance.totalAssets) || 0,
//       obligacionesAsociados: parseFloat(balance.totalCurrentLiabilities) || 0,
//       obligacionesAhorro: parseFloat(balance.shortTermDebt) || 0,
//       obligacionesPlazo: parseFloat(balance.longTermDebt) || 0,
//       gastosPorPagar: parseFloat(earnings.operatingExpenses) || 0,
//       cuentasPorPagar: parseFloat(balance.accountsPayable) || 0,
//       provisionesAsociativas: parseFloat(balance.deferredRevenue) || 0,
//       totalPasivo: parseFloat(balance.totalLiabilities) || 0,
//       capitalSocial: parseFloat(balance.commonStock) || 0,
//       reservas: parseFloat(balance.retainedEarnings) || 0,
//       resultadosAcumulados:
//         parseFloat(balance.accumulatedOtherComprehensiveIncomeLoss) || 0,
//       resultadoEjercicio: parseFloat(earnings.netIncome) || 0,
//       totalPatrimonio: parseFloat(balance.totalShareholderEquity) || 0,
//       totalPasivoPatrimonio:
//         (parseFloat(balance.totalShareholderEquity) || 0) +
//         (parseFloat(balance.totalLiabilities) || 0),
//       peRatio: parseFloat(overview.PERatio) || 0,
//       priceToBook: parseFloat(overview.PriceToBookRatio) || 0,
//       dividendPerShare: parseFloat(overview.DividendPerShare) || 0,
//       dividendYield: parseFloat(overview.DividendYield) || 0,
//       payoutRatio: parseFloat(overview.PayoutRatio) || 0,
//       growthRate: parseFloat(overview.RevenueGrowth) || 0,
//     };
//   } catch (error) {
//     console.error("Error en la API:", error);
//     return null;
//   }
// };




// const calculateRatios = (data) => {
//   const ratios = {};
//   ratios.per = data.peRatio;
//   ratios.pv = data.price / (data.revenue / data.sharesOutstanding);
//   ratios.priceToBook = data.priceToBook;
//   ratios.evEbitda = (data.price * data.sharesOutstanding) / data.ebitda;
//   ratios.peg = data.peRatio / data.growthRate;
//   ratios.roa = data.netIncome / (data.activosCorrientes + data.activosNoCorrientes);
//   ratios.roe = data.netIncome / data.patrimonio;
//   ratios.bpa = data.netIncome / data.sharesOutstanding;
//   ratios.dpa = data.dividendPerShare;
//   ratios.yield = data.dividendYield;
//   ratios.payout = data.payoutRatio;
  
//   return ratios;
// }


export const getActions = async (symbol) => {
  try {
    const response = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${apiKey}`);
    const result = await response.json();
    if (result['Error Message']) {
      console.error('No se encontraron datos para el símbolo:', symbol);
    } else {
      const actions = Object.entries(result["Time Series (Daily)"]).map(([date, values]) => ({
        date: date,
        desktop: parseFloat(values["1. open"]),
        mobile: parseFloat(values["4. close"]) ,
        open: parseFloat(values["1. open"]),
        high: parseFloat(values["2. high"]),
        low: parseFloat(values["3. low"]),
        close: parseFloat(values["4. close"]),
        volume: parseInt(values["5. volume"]),
      })).reverse();
      return actions;
    }
  } catch (error) {
    console.error('Error al obtener los datos:', error);
  }
}