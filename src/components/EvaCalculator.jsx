import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { calculateEVA } from "@/utils/evacalculator";
import { BarChart } from 'lucide-react'; 

export function EVACalculator() {
    const [TeaC, setTeaC] = useState('');
    const [TeaL, setTeaL] = useState('');
    const [rf, setRf] = useState('');
    const [Rpais, setRpais] = useState('');
    const [pasivoCorriente, setPasivoCorriente] = useState('');
    const [pasivoNoCorriente, setPasivoNoCorriente] = useState('');
    const [activosTotales, setActivosTotales] = useState('');
    const [utilidadesNetas, setUtilidadesNetas] = useState('');
    const [gastoFinanciero, setGastoFinanciero] = useState('');
    const [SyP, setSyP] = useState('');
    const [betaApalancado, setBetaApalancado] = useState('');
    const [evaResult, setEVA] = useState(null);

    const handleCalculate = () => {
        const result = calculateEVA(
            TeaC, TeaL, rf, Rpais, pasivoCorriente, pasivoNoCorriente,
            activosTotales, utilidadesNetas, gastoFinanciero,
            SyP, betaApalancado
        );

        if (result) {
            setEVA(result);
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="none" className="w-full py-8">
                <div className="flex items-center bg-gray-200 rounded-full p-3">
                        <BarChart className="w-10 h-10 text-purple-600" /> {/* Ícono grande */}
                    </div>
                    <div className="flex flex-col text-left">
                        <span className="text-lg font-bold text-gray-800">Calcular EVA</span>
                        <span className="text-sm text-gray-500">Analiza el valor económico agregado de tu empresa</span>
                    </div>
                </Button>
            </DialogTrigger>
            <DialogContent className="flex flex-row gap-8 p-8 w-full max-w-6xl min-h-[700px]">
                <div className="w-full">
                    <DialogHeader>
                        <DialogTitle>Calculadora de EVA</DialogTitle>
                        <DialogDescription>
                            Introduce los valores necesarios para calcular el EVA.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid grid-cols-2 gap-6 mt-4">
                        <div>
                            <label className="font-semibold">TEA C/P (%)</label>
                            <Input type="number" placeholder="0.0" value={TeaC} onChange={(e) => setTeaC(e.target.value)} />
                        </div>
                        <div>
                            <label className="font-semibold">TEA L/P (%)</label>
                            <Input type="number" placeholder="0.0" value={TeaL} onChange={(e) => setTeaL(e.target.value)} />
                        </div>
                        <div>
                            <label className="font-semibold">RF (Tasa libre de riesgo, %)</label>
                            <Input type="number" placeholder="0.0" value={rf} onChange={(e) => setRf(e.target.value)} />
                        </div>
                        <div>
                            <label className="font-semibold">Riesgo País (%)</label>
                            <Input type="number" placeholder="0.0" value={Rpais} onChange={(e) => setRpais(e.target.value)} />
                        </div>
                        <div>
                            <label className="font-semibold">Pasivo Corriente</label>
                            <Input type="number" placeholder="0.0" value={pasivoCorriente} onChange={(e) => setPasivoCorriente(e.target.value)} />
                        </div>
                        <div>
                            <label className="font-semibold">Pasivo No Corriente</label>
                            <Input type="number" placeholder="0.0" value={pasivoNoCorriente} onChange={(e) => setPasivoNoCorriente(e.target.value)} />
                        </div>
                        <div>
                            <label className="font-semibold">Activos Totales</label>
                            <Input type="number" placeholder="0.0" value={activosTotales} onChange={(e) => setActivosTotales(e.target.value)} />
                        </div>
                        <div>
                            <label className="font-semibold">Utilidades Netas</label>
                            <Input type="number" placeholder="0.0" value={utilidadesNetas} onChange={(e) => setUtilidadesNetas(e.target.value)} />
                        </div>
                        <div>
                            <label className="font-semibold">Gasto Financiero</label>
                            <Input type="number" placeholder="0.0" value={gastoFinanciero} onChange={(e) => setGastoFinanciero(e.target.value)} />
                        </div>
                        <div>
                            <label className="font-semibold">S&P 500</label>
                            <Input type="number" placeholder="0.0" value={SyP} onChange={(e) => setSyP(e.target.value)} />
                        </div>
                        <div>
                            <label className="font-semibold">Beta Apalancado</label>
                            <Input type="number" placeholder="0.0" value={betaApalancado} onChange={(e) => setBetaApalancado(e.target.value)} />
                        </div>
                    </div>

                    <DialogFooter className="mt-7">
                        <Button className="w-full" onClick={handleCalculate}>
                            Calcular EVA
                        </Button>
                    </DialogFooter>
                </div>

                {/* Resultados */}
                <div className="w-1/2 flex flex-col justify-center items-center">
                    {evaResult ? (
                        <div className="w-full h-full flex flex-col justify-center">
                            <strong>Resultados:</strong>
                            <div className="mt-2 p-4 border rounded-lg shadow-sm bg-gray-50">
                                <p><strong>Patrimonio Total:</strong> {evaResult.patrimonioTotal}</p>
                                <p><strong>TD:</strong> {evaResult.td}</p>
                                <p><strong>CAPM:</strong> {evaResult.capm}</p>
                                <p><strong>UAIDI:</strong> {evaResult.uaidi}</p>
                                <p><strong>WACC:</strong> {evaResult.wacc}</p>
                                <p><strong>EVA:</strong> {evaResult.eva}</p>
                            </div>
                            {/* Interpretación del EVA */}
                            <div className="mt-4">
                                {evaResult.eva > 0 ? (
                                    <div className="text-center">
                                        <p className="text-green-600 font-semibold">
                                            El EVA es positivo, lo que indica que la empresa está generando valor.
                                        </p>
                                        <img
                                            src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExZDJ2d2YwM3E2MHI5aGtxa2MxdndoMzh5bGFubG1ndmxteTVldzJhcSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3NtY188QaxDdC/giphy.gif"
                                            alt="EVA positivo"
                                            className="mt-2 rounded-lg"
                                        />
                                    </div>
                                ) : (
                                    <div className="text-center">
                                        <p className="text-red-600 font-semibold">
                                            El EVA es negativo, lo que indica que la empresa está perdiendo valor.
                                        </p>
                                        <img
                                            src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExd2trcTlrbnk4cXBoeWswbnplcGF0ZTliZ2Nxd3NudmQzbnh6M3JkcyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l22ysLe54hZP0wubek/giphy.gif"
                                            alt="EVA negativo"
                                            className="mt-2 rounded-lg"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <p>Por favor, introduce los valores necesarios.</p>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
