import React, { useState } from 'react';
import { TextField, Button, Typography, Card, CardContent, Container, Grid } from '@mui/material';

function App() {
  const [symbol, setSymbol] = useState('');
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  // Función para manejar el cambio del símbolo
  function handleSymbolChange(event) {
    setSymbol(event.target.value);
  }

  // Función para predecir si subirá o bajará
  function predictFuture(data) {
    // Verifica si el objeto 'Time Series (Daily)' existe
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

    // Compara los precios de cierre día a día
    for (let i = 0; i < closingPrices.length - 1; i++) {
      if (closingPrices[i] > closingPrices[i + 1]) {
        risingCount++;
      } else {
        fallingCount++;
      }
    }

    // Predice si subirá o bajará
    if (risingCount > fallingCount) {
      return 'Subirá';
    } else {
      return 'Bajará';
    }
  }

  // Función para obtener datos de la API
  async function fetchData() {
    const apiKey = 'DSRMZ2S6ADA4FD9B';  // Reemplaza con tu API key de Alpha Vantage
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${apiKey}`;

    try {
      const response = await fetch(url);
      const result = await response.json();

      // Verifica si la respuesta contiene datos válidos
      if (result['Error Message']) {
        setError('No se encontraron datos para este símbolo.');
        setData(null);
      } else {
        setError('');
        setData(result);
      }
    } catch (error) {
      setError('Error al obtener los datos de la API');
      console.error('Error al obtener los datos:', error);
    }
  }

  return (
    <Container>
      <Typography variant="h3" align="center" gutterBottom>
        Predictor de Acciones y Monedas
      </Typography>

      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} md={6}>
          <TextField 
            fullWidth
            label="Símbolo de Acción o Moneda"
            value={symbol}
            onChange={handleSymbolChange}
            variant="outlined"
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={fetchData}
          >
            Obtener datos
          </Button>
        </Grid>
      </Grid>

      {/* Mostrar error */}
      {error && (
        <Typography color="error" align="center" style={{ marginTop: '20px' }}>
          {error}
        </Typography>
      )}

      {/* Mostrar datos */}
      {data && (
        <Card style={{ marginTop: '20px' }}>
          <CardContent>
            <Typography variant="h5">Datos obtenidos:</Typography>
            <pre>{JSON.stringify(data, null, 2)}</pre>

            {/* Mostrar predicción */}
            <Typography variant="h6" style={{ marginTop: '20px' }}>
              Predicción: {predictFuture(data)}
            </Typography>
          </CardContent>
        </Card>
      )}
    </Container>
  );
}

export default App;
