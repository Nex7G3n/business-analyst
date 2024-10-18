export const calculateRatios = (activoCorriente, pasivoCorriente, totalPasivo, totalActivo, beneficioNeto, capitalPropio, setRatios) => {
    if (!activoCorriente || !pasivoCorriente || !totalPasivo || !totalActivo || !beneficioNeto || !capitalPropio) {
        alert("Por favor, introduce todos los valores.");
        return null;  // Retorna null si no se proporcionan todos los valores
    }

    const ratioLiquidez = parseFloat(activoCorriente) / parseFloat(pasivoCorriente);
    const ratioEndeudamiento = parseFloat(totalPasivo) / parseFloat(totalActivo);
    const roe = parseFloat(beneficioNeto) / parseFloat(capitalPropio);
    const roa = parseFloat(beneficioNeto) / parseFloat(totalActivo);

    setRatios({
        ratioLiquidez: ratioLiquidez.toFixed(2),
        ratioEndeudamiento: ratioEndeudamiento.toFixed(2),
        roe: roe.toFixed(2),
        roa: roa.toFixed(2),
    });
};
