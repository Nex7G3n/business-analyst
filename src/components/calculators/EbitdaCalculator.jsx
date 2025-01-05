import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { DollarSign } from "lucide-react";
import { CalculatorButton } from './CalculatorButton';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const EbitdaCalculator = () => {
  const [inputs, setInputs] = useState({
    method: "sinEbit",
    income: "",
    expenses: "",
    ebit: "",
    depreciation: "",
    amortization: "",
  });

  const [results, setResults] = useState({
    ebitda: null,
  });

  const fields = {
    sinEbit: [
      {
        id: "income",
        label: "Ingresos",
        value: inputs.income,
        onChange: (e) => setInputs((prev) => ({ ...prev, income: e.target.value })),
      },
      {
        id: "expenses",
        label: "Egresos",
        value: inputs.expenses,
        onChange: (e) => setInputs((prev) => ({ ...prev, expenses: e.target.value })),
      },
    ],
    conEbit: [
      {
        id: "ebit",
        label: "EBIT",
        value: inputs.ebit,
        onChange: (e) => setInputs((prev) => ({ ...prev, ebit: e.target.value })),
      },
      {
        id: "depreciation",
        label: "Depreciación",
        value: inputs.depreciation,
        onChange: (e) => setInputs((prev) => ({ ...prev, depreciation: e.target.value })),
      },
      {
        id: "amortization",
        label: "Amortización",
        value: inputs.amortization,
        onChange: (e) => setInputs((prev) => ({ ...prev, amortization: e.target.value })),
      },
    ],
  };

  const MethodButtons = () => (
    <div className="flex gap-4 justify-center">
      <Button
        variant={inputs.method === "sinEbit" ? "default" : "outline"}
        onClick={() => setInputs((prev) => ({ ...prev, method: "sinEbit" }))}
      >
        Sin EBIT
      </Button>
      <Button
        variant={inputs.method === "conEbit" ? "default" : "outline"}
        onClick={() => setInputs((prev) => ({ ...prev, method: "conEbit" }))}
      >
        Con EBIT
      </Button>
    </div>
  );

  const calculateEbitda = () => {
    let calculation;

    if (inputs.method === "sinEbit") {
      calculation = parseFloat(inputs.income || 0) - parseFloat(inputs.expenses || 0);
    } else if (inputs.method === "conEbit") {
      calculation =
        parseFloat(inputs.ebit || 0) +
        parseFloat(inputs.depreciation || 0) +
        parseFloat(inputs.amortization || 0);
    }
    setResults({ ebitda: calculation });
  };

  const chartData =
    results.ebitda !== null
      ? {
          labels: ["EBITDA"],
          datasets: [
            {
              label: "Monto ($)",
              data: [results.ebitda],
              backgroundColor: ["#4caf50"],
            },
          ],
        }
      : null;

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  return (
    <Dialog>
      <DialogTrigger>
        <CalculatorButton title="Calculadora de EBITDA" description="Selecciona un método y calcula el EBITDA." icon={DollarSign} />
      </DialogTrigger>
      <DialogContent className="p-6 space-y-6">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Calculadora de EBITDA
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            Selecciona un método y calcula el EBITDA.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <MethodButtons />

          <Card>
            <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {fields[inputs.method].map(({ id, label, value, onChange }) => (
                <div key={id} className="space-y-2">
                  <label htmlFor={id} className="text-sm font-medium">
                    {label}
                  </label>
                  <Input
                    id={id}
                    type="number"
                    value={value}
                    onChange={onChange}
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="text-center">
            <Button onClick={calculateEbitda} className="w-full sm:w-auto">
              Calcular
            </Button>
          </div>

          {results.ebitda !== null && (
            <Card>
              <CardContent className="space-y-4">
                <h2 className="text-lg font-bold">Resultado</h2>
                <p className="text-center text-xl font-semibold text-green-600">
                  EBITDA: ${results.ebitda.toFixed(2)}
                </p>
                {chartData && (
                  <div className="mt-4">
                    <Bar data={chartData} options={chartOptions} />
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EbitdaCalculator;