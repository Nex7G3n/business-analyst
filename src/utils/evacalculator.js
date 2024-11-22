export const calculateEVA = (
    TeaC, TeaL, rf, Rpais, pasivoCorriente, pasivoNoCorriente, activosTotales,utilidadesNetas, gastoFinanciero, SyP, betaApalancado
) => {
    if (
        !TeaC || !TeaL || !rf || !Rpais || !pasivoCorriente || !pasivoNoCorriente || !activosTotales || !utilidadesNetas || !gastoFinanciero || 
        !SyP || !betaApalancado
    ) {
        alert("Por favor, introduce todos los valores.");
        return null;
    }

    const TeaC_decimal = parseFloat(TeaC) / 100;
    const TeaL_decimal = parseFloat(TeaL) / 100;
    const rf_decimal = parseFloat(rf) / 100;
    const Rpais_decimal = parseFloat(Rpais) / 100;
    const SyP_decimal = parseFloat(SyP) / 100;

    const totalPasivos = parseFloat(pasivoCorriente) + parseFloat(pasivoNoCorriente);
    const patrimonioTotal = parseFloat(activosTotales) - totalPasivos;

    const wd = totalPasivos / parseFloat(activosTotales);
    const we = patrimonioTotal / parseFloat(activosTotales);

    const t = 0.295;

    const td = totalPasivos > 0
        ? ((parseFloat(pasivoCorriente) / totalPasivos) * TeaC_decimal) +
          ((parseFloat(pasivoNoCorriente) / totalPasivos) * TeaL_decimal)
        : 0;

    const capm = rf_decimal + parseFloat(betaApalancado) * (SyP_decimal - rf_decimal) + Rpais_decimal;
    const uaidi = parseFloat(utilidadesNetas) + parseFloat(gastoFinanciero);
    const wacc = parseFloat(wd) * parseFloat(td) * (1 - t) + parseFloat(capm) * parseFloat(we);
    const eva = parseFloat(uaidi) - (parseFloat(activosTotales) * wacc);

    return {
        patrimonioTotal: patrimonioTotal.toFixed(2),
        td: td.toFixed(4),
        capm: capm.toFixed(4),
        uaidi: uaidi.toFixed(2),
        wacc: wacc.toFixed(4),
        eva: eva.toFixed(2),
    };
};
