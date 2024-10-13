import React, { useState } from 'react';
import axios from 'axios';

const apiKey = 'I868WEQE7KDWQE0Y';

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

    return {
      activosCorrientes: balance.totalCurrentAssets || 0,
      pasivosCorrientes: balance.totalCurrentLiabilities || 0,
      activosNoCorrientes: balance.totalNonCurrentAssets || 0,
      pasivosNoCorrientes: balance.totalNonCurrentLiabilities || 0,
      pasivosTotales: balance.totalLiabilities || 0,
      patrimonio: balance.totalShareholderEquity || 0,
      ebitda: earnings.ebitda || 0,
      netIncome: earnings.netIncome || 0,
      sharesOutstanding: overview.SharesOutstanding || 0,
      dividendPerShare: overview.DividendPerShare || 0,
      price: overview.MarketCapitalization / (overview.SharesOutstanding || 1),
      peRatio: overview.PERatio || 0,
      priceToBook: overview.PriceToBookRatio || 0,
      revenue: earnings.totalRevenue || 0,
      growthRate: overview.EPSGrowth5Y || 1,
      dividendYield: overview.DividendYield || 0,
      payoutRatio: overview.PayoutRatio || 0
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
};

const Codigo = () => {
  const [symbol, setSymbol] = useState('');
  const [balance, setBalance] = useState(null);
  const [ratios, setRatios] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const financialData = await getFinancialData(symbol);
    if (financialData) {
      setBalance(financialData);
      const calculatedRatios = calculateRatios(financialData);
      setRatios(calculatedRatios);
    } else {
      setBalance(null);
      setRatios(null);
    }
  };

  return (
    <div>
      <h1>Consulta del Balance General y Ratios Financieros</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Ingrese el símbolo de la empresa:
          <input
            type="text"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            placeholder="Por ejemplo: IBM"
          />
        </label>
        <button type="submit">Consultar</button>
      </form>

      {balance && (
        <div>
          <h2>Balance General</h2>
          <ul>
            <li>Activos Corrientes: ${balance.activosCorrientes.toLocaleString('en-US')}</li>
            <li>Pasivos Corrientes: ${balance.pasivosCorrientes.toLocaleString('en-US')}</li>
            <li>Patrimonio: ${balance.patrimonio.toLocaleString('en-US')}</li>
          </ul>

          <h2>Ratios Financieros</h2>
          <ul>
            <li>PER: {ratios.per}</li>
            <li>Precio sobre Ventas (PV): {ratios.pv}</li>
            <li>Precio sobre Valor Contable (Price to Book): {ratios.priceToBook}</li>
            <li>EV/EBITDA: {ratios.evEbitda}</li>
            <li>PEG: {ratios.peg}</li>
            <li>ROA: {ratios.roa}</li>
            <li>ROE: {ratios.roe}</li>
            <li>BPA (Beneficio por Acción): {ratios.bpa}</li>
            <li>DPA (Dividendo por Acción): {ratios.dpa}</li>
            <li>Yield: {ratios.yield}</li>
            <li>Payout: {ratios.payout}</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Codigo;
