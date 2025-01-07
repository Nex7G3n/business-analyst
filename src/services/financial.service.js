const apiKey = "QA2PPVULFLD4FCBN";

export const getActions = async (symbol) => {
  try {
    const response = await fetch(
      `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${apiKey}`
    );
    const result = await response.json();
    if (result["Error Message"]) {
      console.error("No se encontraron datos para el símbolo:", symbol);
    } else {
      const actions = Object.entries(result["Time Series (Daily)"])
        .map(([date, values]) => ({
          date: date,
          desktop: parseFloat(values["1. open"]),
          mobile: parseFloat(values["4. close"]),
          open: parseFloat(values["1. open"]),
          high: parseFloat(values["2. high"]),
          low: parseFloat(values["3. low"]),
          close: parseFloat(values["4. close"]),
          volume: parseInt(values["5. volume"]),
        }))
        .reverse();
      return actions;
    }
  } catch (error) {
    console.error("Error al obtener los datos:", error);
  }
};

export const getBalanceData = async (symbol) => {
  try {
    const response = await fetch(
      `https://www.alphavantage.co/query?function=BALANCE_SHEET&symbol=${symbol}&apikey=${apiKey}`
    );

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();

    if (result["Error Message"]) {
      console.error("No se encontraron datos para el símbolo:", symbol);
      return null;
    }

    if (!result || !result.annualReports) {
      console.error("Datos no válidos en la respuesta:", result);
      return null;
    }

    return result;

  } catch (error) {
    console.error("Error al obtener los datos:", error);
    return null;
  }
};


export const getGeneralData = async (symbol) => {
  try {
    const response = await fetch(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${apiKey}`);
    if(!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();

    if (result["Error Message"]) {
      console.error("No se encontraron datos para el símbolo:", symbol);
      return null;
    }

    if (!result) {
      console.error("Datos no válidos en la respuesta:", result);
      return null;
    }

    return result;

  } catch (error) {
    console.error(error)
  }
}