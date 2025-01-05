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
import { calculateWacc } from "@/utils/calculator";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { PieChart as Pie_Chart } from "lucide-react";
import { CalculatorButton } from "./CalculatorButton";

export const WaccCalculator = () => {
  const [inputs, setInputs] = useState({
    patrimonio: "",
    pasivoCorriente: "",
    pasivoNoCorriente: "",
    teaPasivoCorriente: "",
    teaPasivoNoCorriente: "",
    bDesapalancada: "",
    rendimientoMercado: "",
    tasaLibreRiesgo: "",
    impuestoT: "",
    riesgoPais: "",
  });

  const [results, setResults] = useState({
    componentesWacc: null,
  });

  return (
    <Dialog>
      <CalculatorButton title="Calcular WACC" description="Analiza el costo promedio ponderado de capital de tu empresa" icon={Pie_Chart} />
      <DialogContent className="flex flex-row gap-8 p-8 w-full max-w-6xl min-h-[700px]">
        <div className="w-1/2">
          <DialogHeader>
            <DialogTitle>Calculadora de WACC</DialogTitle>
            <DialogDescription>
              Introduce los valores necesarios para calcular los ratios
              financieros.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 mt-4 grid-cols-4">
            <div className="col-span-4">
              <label className="font-semibold">Patrimonio</label>
              <Input
                id="patrimonio"
                type="number"
                placeholder="0.0"
                value={inputs.patrimonio}
                onChange={(e) =>
                  setInputs((prev) => ({ ...prev, patrimonio: e.target.value }))
                }
              />
            </div>
            <div className="col-span-3">
              <label className="font-semibold">Pasivo Corriente</label>
              <Input
                id="pasivoCorriente"
                type="number"
                placeholder="0.0"
                value={inputs.pasivoCorriente}
                onChange={(e) =>
                  setInputs((prev) => ({
                    ...prev,
                    pasivoCorriente: e.target.value,
                  }))
                }
              />
            </div>
            <div>
              <label className="font-semibold">TEA (%)</label>
              <Input
                id="teaPasivoCorriente"
                type="number"
                placeholder="0.0"
                value={inputs.teaPasivoCorriente}
                onChange={(e) =>
                  setInputs((prev) => ({
                    ...prev,
                    teaPasivoCorriente: e.target.value,
                  }))
                }
              />
            </div>

            <div className="col-span-3">
              <label className="font-semibold">Pasivo No Corriente</label>
              <Input
                id="pasivoNoCorriente"
                type="number"
                placeholder="0.0"
                value={inputs.pasivoNoCorriente}
                onChange={(e) =>
                  setInputs((prev) => ({
                    ...prev,
                    pasivoNoCorriente: e.target.value,
                  }))
                }
              />
            </div>
            <div>
              <label className="font-semibold">TEA (%)</label>
              <Input
                id="teaPasivoNoCorriente"
                type="number"
                placeholder="0.0"
                value={inputs.teaPasivoNoCorriente}
                onChange={(e) =>
                  setInputs((prev) => ({
                    ...prev,
                    teaPasivoNoCorriente: e.target.value,
                  }))
                }
              />
            </div>

            <div className="col-span-2">
              <label className="font-semibold">Impuesto T</label>
              <Input
                id="impuestoT"
                type="number"
                placeholder="0.0"
                value={inputs.impuestoT}
                onChange={(e) =>
                  setInputs((prev) => ({ ...prev, impuestoT: e.target.value }))
                }
              />
            </div>

            <div className="col-span-2">
              <label className="font-semibold">β Desapalancada (%)</label>
              <Input
                id="bDesapalancada"
                type="number"
                placeholder="0.0"
                value={inputs.bDesapalancada}
                onChange={(e) =>
                  setInputs((prev) => ({
                    ...prev,
                    bDesapalancada: e.target.value,
                  }))
                }
              />
            </div>

            <div className="col-span-2">
              <label className="font-semibold">
                Rendimiento de mercado - RM (%)
              </label>
              <Input
                id="rendimientoMercado"
                type="number"
                placeholder="0.0"
                value={inputs.rendimientoMercado}
                onChange={(e) =>
                  setInputs((prev) => ({
                    ...prev,
                    rendimientoMercado: e.target.value,
                  }))
                }
              />
            </div>

            <div className="col-span-2">
              <label className="font-semibold">
                Tasa Libre de Riesgo - RF (%)
              </label>
              <Input
                id="tasaLibreRiesgo"
                type="number"
                placeholder="0.0"
                value={inputs.tasaLibreRiesgo}
                onChange={(e) =>
                  setInputs((prev) => ({
                    ...prev,
                    tasaLibreRiesgo: e.target.value,
                  }))
                }
              />
            </div>

            <div className="col-span-2">
              <label className="font-semibold">Riesgo Pais (%)</label>
              <Input
                id="riesgoPais"
                type="number"
                placeholder="0.0"
                value={inputs.riesgoPais}
                onChange={(e) =>
                  setInputs((prev) => ({ ...prev, riesgoPais: e.target.value }))
                }
              />
            </div>
          </div>
          <DialogFooter className="mt-7">
            <Button
              className="w-full"
              onClick={() => {
                calculateWacc(
                  inputs.patrimonio,
                  inputs.pasivoCorriente,
                  inputs.pasivoNoCorriente,
                  inputs.teaPasivoCorriente,
                  inputs.teaPasivoNoCorriente,
                  inputs.bDesapalancada,
                  inputs.rendimientoMercado,
                  inputs.tasaLibreRiesgo,
                  inputs.impuestoT,
                  inputs.riesgoPais,
                  (result) => setResults({ componentesWacc: result })
                );
              }}
            >
              Calcular
            </Button>
          </DialogFooter>
        </div>

        <div className="w-1/2 flex flex-col justify-center items-center">
          {results.componentesWacc ? (
            <div className="w-full h-full flex flex-col justify-center">
              <strong>WACC calculado:</strong>
              <div className="mt-2 p-4 border rounded-lg shadow-sm bg-gray-50">
                <p>
                  <strong>Valor del WACC: </strong>{" "}
                  {results.componentesWacc.wacc}
                </p>
                <p>
                  <strong>β Apalancada: </strong>
                  {results.componentesWacc.bApalancada}
                </p>
                <p>
                  <strong>CAPM: </strong>
                  {results.componentesWacc.capm}
                </p>
                <p>
                  <strong>Costo de deuda: </strong>
                  {results.componentesWacc.kd}
                </p>
              </div>
              <WaccPieChart
                className="w-full h-full"
                totalPatrimonio={inputs.patrimonio}
                totalPasivo={results.componentesWacc.totalPasivo}
              />
            </div>
          ) : (
            <p>Por favor, introduce los valores necesarios.</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

function WaccPieChart({ totalPatrimonio, totalPasivo }) {
  const data = [
    { name: "Total Patrimonio", value: parseFloat(totalPatrimonio) || 0 },
    { name: "Total Pasivo", value: parseFloat(totalPasivo) || 0 },
  ];

  const COLORS = ["#0088FE", "#FF8042"];

  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
