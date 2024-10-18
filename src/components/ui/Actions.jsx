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