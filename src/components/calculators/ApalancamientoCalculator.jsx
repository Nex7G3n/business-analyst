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
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Calculator, TrendingUp } from "lucide-react";
import { CalculatorButton } from "./CalculatorButton";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export function ApalancamientoCalculator() {
  const [inputs, setInputs] = useState({
    ventas: "",
    costosFijos: "",
    costosVariables: "",
    uaii: "",
    intereses: "",
    epsActual: "",
    epsAnterior: "",
    ventasAnteriores: "",
    uaiiAnterior: "",
  });

  const [results, setResults] = useState({
    gao: null,
    gaf: null,
    gac: null,
  });

  const handleCalculate = () => {
    const deltaVentas =
      ((inputs.ventas - inputs.ventasAnteriores) / inputs.ventasAnteriores) *
      100;
    const deltaUAII =
      ((inputs.uaii - inputs.uaiiAnterior) / inputs.uaiiAnterior) * 100;
    const deltaEPS =
      ((inputs.epsActual - inputs.epsAnterior) / inputs.epsAnterior) * 100;

    const gao = deltaUAII / deltaVentas;
    const gaf = deltaEPS / deltaUAII;
    const gac = gao * gaf;

    setResults({
      gao: gao.toFixed(2),
      gaf: gaf.toFixed(2),
      gac: gac.toFixed(2),
    });
  };

  const chartData = {
    labels: ["GAO", "GAF", "GAC"],
    datasets: [
      {
        label: "Grados de Apalancamiento",
        data: results ? [results.gao, results.gaf, results.gac] : [0, 0, 0],
        backgroundColor: ["#4CAF50", "#2196F3", "#FF5722"],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Grados de Apalancamiento",
      },
    },
  };

  return (
    <Dialog>
      <DialogTrigger>
        <CalculatorButton title="Calculadora de Apalancamiento" description="Calcula los grados de apalancamiento de tu empresa" icon={TrendingUp} />
      </DialogTrigger>
      <DialogContent className="flex flex-row gap-8 p-8 w-full max-w-6xl min-h-[700px]">
        <div className="w-full">
          <DialogHeader>
            <DialogTitle>Calculadora de Apalancamiento</DialogTitle>
            <DialogDescription>
              Introduce los valores necesarios para calcular los grados de
              apalancamiento.
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-6 mt-4">
            <div>
              <label className="font-semibold">Ventas (actuales)</label>
              <Input
                type="number"
                placeholder="0.0"
                value={inputs.ventas}
                onChange={(e) =>
                  setInputs((prev) => ({ ...prev, ventas: e.target.value }))
                }
              />
            </div>
            <div>
              <label className="font-semibold">Ventas (anteriores)</label>
              <Input
                type="number"
                placeholder="0.0"
                value={inputs.ventasAnteriores}
                onChange={(e) =>
                  setInputs((prev) => ({
                    ...prev,
                    ventasAnteriores: e.target.value,
                  }))
                }
              />
            </div>
            <div>
              <label className="font-semibold">UAII (actual)</label>
              <Input
                type="number"
                placeholder="0.0"
                value={inputs.uaii}
                onChange={(e) =>
                  setInputs((prev) => ({ ...prev, uaii: e.target.value }))
                }
              />
            </div>
            <div>
              <label className="font-semibold">UAII (anterior)</label>
              <Input
                type="number"
                placeholder="0.0"
                value={inputs.uaiiAnterior}
                onChange={(e) =>
                  setInputs((prev) => ({
                    ...prev,
                    uaiiAnterior: e.target.value,
                  }))
                }
              />
            </div>
            <div>
              <label className="font-semibold">EPS (actual)</label>
              <Input
                type="number"
                placeholder="0.0"
                value={inputs.epsActual}
                onChange={(e) =>
                  setInputs((prev) => ({ ...prev, epsActual: e.target.value }))
                }
              />
            </div>
            <div>
              <label className="font-semibold">EPS (anterior)</label>
              <Input
                type="number"
                placeholder="0.0"
                value={inputs.epsAnterior}
                onChange={(e) =>
                  setInputs((prev) => ({
                    ...prev,
                    epsAnterior: e.target.value,
                  }))
                }
              />
            </div>
            <div>
              <label className="font-semibold">Costos Fijos</label>
              <Input
                type="number"
                placeholder="0.0"
                value={inputs.costosFijos}
                onChange={(e) =>
                  setInputs((prev) => ({
                    ...prev,
                    costosFijos: e.target.value,
                  }))
                }
              />
            </div>
            <div>
              <label className="font-semibold">Costos Variables</label>
              <Input
                type="number"
                placeholder="0.0"
                value={inputs.costosVariables}
                onChange={(e) =>
                  setInputs((prev) => ({
                    ...prev,
                    costosVariables: e.target.value,
                  }))
                }
              />
            </div>
            <div>
              <label className="font-semibold">Intereses</label>
              <Input
                type="number"
                placeholder="0.0"
                value={inputs.intereses}
                onChange={(e) =>
                  setInputs((prev) => ({ ...prev, intereses: e.target.value }))
                }
              />
            </div>
          </div>

          <DialogFooter className="mt-7">
            <Button className="w-full" onClick={handleCalculate}>
              Calcular Apalancamiento
            </Button>
          </DialogFooter>
        </div>

        <div className="w-1/2 flex flex-col justify-center items-center">
          {results.gao !== null ? (
            <>
              <div className="w-full h-full flex flex-col justify-center">
                <strong>Resultados:</strong>
                <div className="mt-2 p-4 border rounded-lg shadow-sm bg-gray-50">
                  <p>
                    <strong>GAO:</strong> {results.gao}
                  </p>
                  <p>
                    <strong>GAF:</strong> {results.gaf}
                  </p>
                  <p>
                    <strong>GAC:</strong> {results.gac}
                  </p>
                </div>
              </div>
              <div className="mt-4 w-full">
                <Bar data={chartData} options={chartOptions} />
              </div>
            </>
          ) : (
            <p>Por favor, introduce los valores necesarios.</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
