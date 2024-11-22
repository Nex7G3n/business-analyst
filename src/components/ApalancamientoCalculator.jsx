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

import { TrendingUp } from 'lucide-react';  
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export function ApalancamientoCalculator() {
  const [ventas, setVentas] = useState('');
  const [costosFijos, setCostosFijos] = useState('');
  const [costosVariables, setCostosVariables] = useState('');
  const [uaii, setUAII] = useState('');
  const [intereses, setIntereses] = useState('');
  const [epsActual, setEPSActual] = useState('');
  const [epsAnterior, setEPSAnterior] = useState('');
  const [ventasAnteriores, setVentasAnteriores] = useState('');
  const [uaiiAnterior, setUAIIAnterior] = useState('');
  const [resultados, setResultados] = useState(null);

  const handleCalculate = () => {
    const deltaVentas = ((ventas - ventasAnteriores) / ventasAnteriores) * 100;
    const deltaUAII = ((uaii - uaiiAnterior) / uaiiAnterior) * 100;
    const deltaEPS = ((epsActual - epsAnterior) / epsAnterior) * 100;

    const gao = deltaUAII / deltaVentas;
    const gaf = deltaEPS / deltaUAII;
    const gac = gao * gaf;

    setResultados({
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
        data: resultados ? [resultados.gao, resultados.gaf, resultados.gac] : [0, 0, 0],
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
      <DialogTrigger asChild>
      <Button variant="outline" className="w-full py-8">
          <div className="flex items-center justify-center bg-gray-200 rounded-full p-3">
                <TrendingUp className="w-10 h-10 text-green-600" />
            </div>

            <div className="flex flex-col text-left">
                <span className="text-lg font-bold text-gray-800">Calcular Apalancamiento</span>
                <span className="text-sm text-gray-500">Evalúa el nivel de deuda frente a tus recursos</span>
            </div>
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-row gap-8 p-8 w-full max-w-6xl min-h-[700px]">
        <div className="w-full">
          <DialogHeader>
            <DialogTitle>Calculadora de Apalancamiento</DialogTitle>
            <DialogDescription>
              Introduce los valores necesarios para calcular los grados de apalancamiento.
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-6 mt-4">
            <div>
              <label className="font-semibold">Ventas (actuales)</label>
              <Input type="number" placeholder="0.0" value={ventas} onChange={(e) => setVentas(e.target.value)} />
            </div>
            <div>
              <label className="font-semibold">Ventas (anteriores)</label>
              <Input type="number" placeholder="0.0" value={ventasAnteriores} onChange={(e) => setVentasAnteriores(e.target.value)} />
            </div>
            <div>
              <label className="font-semibold">UAII (actual)</label>
              <Input type="number" placeholder="0.0" value={uaii} onChange={(e) => setUAII(e.target.value)} />
            </div>
            <div>
              <label className="font-semibold">UAII (anterior)</label>
              <Input type="number" placeholder="0.0" value={uaiiAnterior} onChange={(e) => setUAIIAnterior(e.target.value)} />
            </div>
            <div>
              <label className="font-semibold">EPS (actual)</label>
              <Input type="number" placeholder="0.0" value={epsActual} onChange={(e) => setEPSActual(e.target.value)} />
            </div>
            <div>
              <label className="font-semibold">EPS (anterior)</label>
              <Input type="number" placeholder="0.0" value={epsAnterior} onChange={(e) => setEPSAnterior(e.target.value)} />
            </div>
            <div>
              <label className="font-semibold">Costos Fijos</label>
              <Input type="number" placeholder="0.0" value={costosFijos} onChange={(e) => setCostosFijos(e.target.value)} />
            </div>
            <div>
              <label className="font-semibold">Costos Variables</label>
              <Input type="number" placeholder="0.0" value={costosVariables} onChange={(e) => setCostosVariables(e.target.value)} />
            </div>
            <div>
              <label className="font-semibold">Intereses</label>
              <Input type="number" placeholder="0.0" value={intereses} onChange={(e) => setIntereses(e.target.value)} />
            </div>
          </div>

          <DialogFooter className="mt-7">
            <Button className="w-full" onClick={handleCalculate}>
              Calcular Apalancamiento
            </Button>
          </DialogFooter>
        </div>

        {/* Resultados */}
        <div className="w-1/2 flex flex-col justify-center items-center">
          {resultados ? (
            <>
              <div className="w-full h-full flex flex-col justify-center">
                <strong>Resultados:</strong>
                <div className="mt-2 p-4 border rounded-lg shadow-sm bg-gray-50">
                  <p><strong>GAO:</strong> {resultados.gao}</p>
                  <p><strong>GAF:</strong> {resultados.gaf}</p>
                  <p><strong>GAC:</strong> {resultados.gac}</p>
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
