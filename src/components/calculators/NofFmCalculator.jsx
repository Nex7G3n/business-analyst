import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
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
import { TrendingDown } from "lucide-react";
import { CalculatorButton } from "./CalculatorButton";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const NofFmCalculator = () => {
  const [inputs, setInputs] = useState({
    currentAssets: "",
    currentLiabilities: "",
    inventory: "",
    accountsReceivable: "",
    accountsPayable: "",
  });

  const [results, setResults] = useState({
    nof: null,
    fm: null,
  });

  const calculateNofFm = () => {
    const nofValue =
      parseFloat(inputs.inventory || 0) +
      parseFloat(inputs.accountsReceivable || 0) -
      parseFloat(inputs.accountsPayable || 0);

    const fmValue =
      parseFloat(inputs.currentAssets || 0) -
      parseFloat(inputs.currentLiabilities || 0);

    setResults({
      nof: nofValue,
      fm: fmValue,
    });
  };

  const chartData =
    results.nof !== null && results.fm !== null
      ? {
          labels: ["NOF", "FM"],
          datasets: [
            {
              label: "Monto ($)",
              data: [results.nof, results.fm],
              backgroundColor: ["#4caf50", "#2196f3"],
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
        <CalculatorButton title="Calculadora de NOF y FM" description="Calcula las Necesidades Operativas de Fondos y Fondo de Maniobra." icon={TrendingDown} />
      <DialogContent className="p-6 space-y-6">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Calculadora de NOF y FM
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            Ingresa los datos necesarios para calcular las métricas financieras.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <Card>
            <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="currentAssets" className="text-sm font-medium">
                  Activo Corriente
                </label>
                <Input
                  id="currentAssets"
                  type="number"
                  value={inputs.currentAssets}
                  onChange={(e) =>
                    setInputs((prev) => ({
                      ...prev,
                      currentAssets: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="currentLiabilities"
                  className="text-sm font-medium"
                >
                  Pasivo Corriente
                </label>
                <Input
                  id="currentLiabilities"
                  type="number"
                  value={inputs.currentLiabilities}
                  onChange={(e) =>
                    setInputs((prev) => ({
                      ...prev,
                      currentLiabilities: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="inventory" className="text-sm font-medium">
                  Inventarios
                </label>
                <Input
                  id="inventory"
                  type="number"
                  value={inputs.inventory}
                  onChange={(e) =>
                    setInputs((prev) => ({
                      ...prev,
                      inventory: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="accountsReceivable"
                  className="text-sm font-medium"
                >
                  Cuentas por Cobrar
                </label>
                <Input
                  id="accountsReceivable"
                  type="number"
                  value={inputs.accountsReceivable}
                  onChange={(e) =>
                    setInputs((prev) => ({
                      ...prev,
                      accountsReceivable: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="accountsPayable"
                  className="text-sm font-medium"
                >
                  Cuentas por Pagar
                </label>
                <Input
                  id="accountsPayable"
                  type="number"
                  value={inputs.accountsPayable}
                  onChange={(e) =>
                    setInputs((prev) => ({
                      ...prev,
                      accountsPayable: e.target.value,
                    }))
                  }
                />
              </div>
            </CardContent>
          </Card>

          <div className="text-center">
            <Button onClick={calculateNofFm} className="w-full sm:w-auto">
              Calcular
            </Button>
          </div>

          {results.nof !== null && results.fm !== null && (
            <Card>
              <CardContent className="space-y-4">
                <h2 className="text-lg font-bold">Resultados</h2>
                <p className="text-center text-xl font-semibold text-green-600">
                  NOF: ${results.nof.toFixed(2)}
                </p>
                <p className="text-center text-xl font-semibold text-blue-600">
                  FM: ${results.fm.toFixed(2)}
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
