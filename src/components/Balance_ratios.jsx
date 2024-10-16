import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Separator } from "@/components/ui/separator"
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
      {
        balance && (
          <>
            <Table>
              <TableCaption>Balance Sheet Overview</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Item</TableHead>
                  <TableHead className="text-right">Value (USD)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium text-left">Activos Corrientes</TableCell>
                  <TableCell className="text-right">${balance.activosCorrientes.toLocaleString('en-US')}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium text-left">Pasivos Corrientes</TableCell>
                  <TableCell className="text-right">${balance.pasivosCorrientes.toLocaleString('en-US')}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium text-left">Patrimonio</TableCell>
                  <TableCell className="text-right">${balance.patrimonio.toLocaleString('en-US')}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <Separator />
          </>
        )
      }
      
      {ratios && (
        <Table>
        <TableCaption>Financial Ratios Overview</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Ratio</TableHead>
            <TableHead className="text-right">Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium text-left">PER</TableCell>
            <TableCell className="text-right">{ratios.per}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium text-left">Precio sobre Ventas (PV)</TableCell>
            <TableCell className="text-right">{ratios.pv}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium text-left">Precio sobre Valor Contable (Price to Book)</TableCell>
            <TableCell className="text-right">{ratios.priceToBook}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium text-left">EV/EBITDA</TableCell>
            <TableCell className="text-right">{ratios.evEbitda}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium text-left">PEG</TableCell>
            <TableCell className="text-right">{ratios.peg}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium text-left">ROA</TableCell>
            <TableCell className="text-right">{ratios.roa}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium text-left">ROE</TableCell>
            <TableCell className="text-right">{ratios.roe}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium text-left">BPA (Beneficio por Acción)</TableCell>
            <TableCell className="text-right">{ratios.bpa}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium text-left">DPA (Dividendo por Acción)</TableCell>
            <TableCell className="text-right">{ratios.dpa}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium text-left">Yield</TableCell>
            <TableCell className="text-right">{ratios.yield}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium text-left">Payout</TableCell>
            <TableCell className="text-right">{ratios.payout}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      

      )}

      
    </div>
  );
};

export default Codigo;
