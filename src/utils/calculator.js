export const calculateRatios = (activoCorriente, pasivoCorriente, totalPasivo, totalActivo, beneficioNeto, capitalPropio, ventasTotales, setRatios) => {
    if (!activoCorriente || !pasivoCorriente || !totalPasivo || !totalActivo || !beneficioNeto || !capitalPropio || !ventasTotales) {
        alert("Por favor, introduce todos los valores.");
        return null;
    }

    const ratioLiquidez = parseFloat(activoCorriente) / parseFloat(pasivoCorriente);
    const ratioEndeudamiento = parseFloat(totalPasivo) / parseFloat(totalActivo);
    const roe = parseFloat(beneficioNeto) / parseFloat(capitalPropio);
    const roa = parseFloat(beneficioNeto) / parseFloat(totalActivo);
    const rotacionActivos = parseFloat(ventasTotales) / parseFloat(totalActivo);
    const margenBeneficioNeto = parseFloat(beneficioNeto) / parseFloat(ventasTotales);
    const capitalTrabajo = parseFloat(activoCorriente) - parseFloat(pasivoCorriente);

    setRatios({
        ratioLiquidez: ratioLiquidez.toFixed(2),
        ratioEndeudamiento: ratioEndeudamiento.toFixed(2),
        roe: roe.toFixed(2),
        roa: roa.toFixed(2),
        rotacionActivos: rotacionActivos.toFixed(2),
        margenBeneficioNeto: (margenBeneficioNeto * 100).toFixed(2) + '%',
        capitalTrabajo: capitalTrabajo.toFixed(2),
    });
};

export const calculateWacc = (patrimonio, pasivoCorriente, pasivoNoCorriente, teaPasivoCorriente, teaPasivoNoCorriente, bDesapalancada, rendimientoMercado, tasaLibreRiego, impuestoT, riesgoPais, setComponentesWacc) => {
    if (!patrimonio || !pasivoCorriente || !pasivoNoCorriente || !teaPasivoCorriente || !teaPasivoNoCorriente || !bDesapalancada || !rendimientoMercado || !tasaLibreRiego || !impuestoT || !riesgoPais) {
        alert("Por favor, introduce todos los valores.");
        return null;
    }

    const wd = (parseFloat(pasivoCorriente) + parseFloat(pasivoNoCorriente)) / (parseFloat(patrimonio) + parseFloat(pasivoCorriente) + parseFloat(pasivoNoCorriente));
    const we = 1 - wd;
    const bApalancada =(1+wd*(1-(parseFloat(impuestoT)/100)))*parseFloat(bDesapalancada);
    const capm = (parseFloat(tasaLibreRiego)/100 + (bApalancada/100) * (parseFloat(rendimientoMercado)/100 - parseFloat(tasaLibreRiego)/100) + parseFloat(riesgoPais)/100)*100;
    const totalPasivo = parseFloat(pasivoCorriente) + parseFloat(pasivoNoCorriente);
    const patri = parseFloat(patrimonio);
    const activo = patri + totalPasivo;
    const kd = (parseFloat(teaPasivoCorriente) * parseFloat(pasivoCorriente) + parseFloat(teaPasivoNoCorriente) * parseFloat(pasivoNoCorriente))/totalPasivo;
    const kdImpuesto = kd * (1 - (parseFloat(impuestoT) / 100));
    
    const wacc= wd * kdImpuesto + we * capm/100;

    setComponentesWacc({
        wacc: wacc.toFixed(2) + '%',
        bApalancada: bApalancada.toFixed(2) + '%',
        capm : capm.toFixed(2) + '%',
        kd: kd.toFixed(2) + '%',
        activo: activo.toFixed(2),
        totalPasivo: totalPasivo.toFixed(2),
        patrimonio: patri.toFixed(2),
    });
}
