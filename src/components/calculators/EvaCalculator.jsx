import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { calculateEVA } from "@/utils/evacalculator";
import { BarChart } from 'lucide-react';
import { CalculatorButton } from './CalculatorButton';

export const EVACalculator = () => {
  const [inputs, setInputs] = useState({
    TeaC: '',
    TeaL: '',
    rf: '',
    Rpais: '',
    pasivoCorriente: '',
    pasivoNoCorriente: '',
    activosTotales: '',
    utilidadesNetas: '',
    gastoFinanciero: '',
    SyP: '',
    betaApalancado: '',
  });

  const [results, setResults] = useState({
    evaResult: null,
  });

  const handleCalculate = () => {
    const result = calculateEVA(
      inputs.TeaC,
      inputs.TeaL,
      inputs.rf,
      inputs.Rpais,
      inputs.pasivoCorriente,
      inputs.pasivoNoCorriente,
      inputs.activosTotales,
      inputs.utilidadesNetas,
      inputs.gastoFinanciero,
      inputs.SyP,
      inputs.betaApalancado
    );

    if (result) {
      setResults({ evaResult: result });
    }
  };

  return (
    <Dialog>
      <CalculatorButton title="Calcular EVA" description="Analiza el valor económico agregado de tu empresa" icon={BarChart} />
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
              <Input
                type="number"
                placeholder="0.0"
                value={inputs.TeaC}
                onChange={(e) => setInputs((prev) => ({ ...prev, TeaC: e.target.value }))}
              />
            </div>
            <div>
              <label className="font-semibold">TEA L/P (%)</label>
              <Input
                type="number"
                placeholder="0.0"
                value={inputs.TeaL}
                onChange={(e) => setInputs((prev) => ({ ...prev, TeaL: e.target.value }))}
              />
            </div>
            <div>
              <label className="font-semibold">RF (Tasa libre de riesgo, %)</label>
              <Input
                type="number"
                placeholder="0.0"
                value={inputs.rf}
                onChange={(e) => setInputs((prev) => ({ ...prev, rf: e.target.value }))}
              />
            </div>
            <div>
              <label className="font-semibold">Riesgo País (%)</label>
              <Input
                type="number"
                placeholder="0.0"
                value={inputs.Rpais}
                onChange={(e) => setInputs((prev) => ({ ...prev, Rpais: e.target.value }))}
              />
            </div>
            <div>
              <label className="font-semibold">Pasivo Corriente</label>
              <Input
                type="number"
                placeholder="0.0"
                value={inputs.pasivoCorriente}
                onChange={(e) => setInputs((prev) => ({ ...prev, pasivoCorriente: e.target.value }))}
              />
            </div>
            <div>
              <label className="font-semibold">Pasivo No Corriente</label>
              <Input
                type="number"
                placeholder="0.0"
                value={inputs.pasivoNoCorriente}
                onChange={(e) => setInputs((prev) => ({ ...prev, pasivoNoCorriente: e.target.value }))}
              />
            </div>
            <div>
              <label className="font-semibold">Activos Totales</label>
              <Input
                type="number"
                placeholder="0.0"
                value={inputs.activosTotales}
                onChange={(e) => setInputs((prev) => ({ ...prev, activosTotales: e.target.value }))}
              />
            </div>
            <div>
              <label className="font-semibold">Utilidades Netas</label>
              <Input
                type="number"
                placeholder="0.0"
                value={inputs.utilidadesNetas}
                onChange={(e) => setInputs((prev) => ({ ...prev, utilidadesNetas: e.target.value }))}
              />
            </div>
            <div>
              <label className="font-semibold">Gasto Financiero</label>
              <Input
                type="number"
                placeholder="0.0"
                value={inputs.gastoFinanciero}
                onChange={(e) => setInputs((prev) => ({ ...prev, gastoFinanciero: e.target.value }))}
              />
            </div>
            <div>
              <label className="font-semibold">S&P 500</label>
              <Input
                type="number"
                placeholder="0.0"
                value={inputs.SyP}
                onChange={(e) => setInputs((prev) => ({ ...prev, SyP: e.target.value }))}
              />
            </div>
            <div>
              <label className="font-semibold">Beta Apalancado</label>
              <Input
                type="number"
                placeholder="0.0"
                value={inputs.betaApalancado}
                onChange={(e) => setInputs((prev) => ({ ...prev, betaApalancado: e.target.value }))}
              />
            </div>
          </div>

          <DialogFooter className="mt-7">
            <Button className="w-full" onClick={handleCalculate}>
              Calcular EVA
            </Button>
          </DialogFooter>
        </div>

        <div className="w-1/2 flex flex-col justify-center items-center">
          {results.evaResult ? (
            <div className="w-full h-full flex flex-col justify-center">
              <strong>Resultados:</strong>
              <div className="mt-2 p-4 border rounded-lg shadow-sm bg-gray-50">
                <p><strong>Patrimonio Total:</strong> {results.evaResult.patrimonioTotal}</p>
                <p><strong>TD:</strong> {results.evaResult.td}</p>
                <p><strong>CAPM:</strong> {results.evaResult.capm}</p>
                <p><strong>UAIDI:</strong> {results.evaResult.uaidi}</p>
                <p><strong>WACC:</strong> {results.evaResult.wacc}</p>
                <p><strong>EVA:</strong> {results.evaResult.eva}</p>
              </div>
              <div className="mt-4">
                {results.evaResult.eva > 0 ? (
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