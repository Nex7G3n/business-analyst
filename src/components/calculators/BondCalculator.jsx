import { useState } from "react";
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
import { Briefcase } from "lucide-react";
import { CalculatorButton } from "./CalculatorButton";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export function BondCalculator() {
  const [inputs, setInputs] = useState({
    nominal: "",
    couponRate: "",
    years: "",
    marketRate: "",
  });

  const [results, setResults] = useState({
    price: null,
    duration: null,
    convexity: null,
  });

  const handleCalculate = () => {
    const nominalValue = parseFloat(inputs.nominal);
    const coupon = (parseFloat(inputs.couponRate) / 100) * nominalValue;
    const rate = parseFloat(inputs.marketRate) / 100;
    const n = parseInt(inputs.years);

    let price = 0;
    for (let i = 1; i <= n; i++) {
      price += coupon / Math.pow(1 + rate, i);
    }
    price += nominalValue / Math.pow(1 + rate, n);

    let duration = 0;
    for (let i = 1; i <= n; i++) {
      duration += (i * (coupon / Math.pow(1 + rate, i))) / price;
    }
    duration += (n * (nominalValue / Math.pow(1 + rate, n))) / price;

    let convexity = 0;
    for (let i = 1; i <= n; i++) {
      convexity += (i * (i + 1) * (coupon / Math.pow(1 + rate, i))) / price;
    }
    convexity += (n * (n + 1) * (nominalValue / Math.pow(1 + rate, n))) / price;
    convexity /= Math.pow(1 + rate, 2);

    setResults({
      price: price.toFixed(2),
      duration: duration.toFixed(2),
      convexity: convexity.toFixed(2),
    });
  };

  const chartData = {
    labels: ["Precio", "Duración", "Convexidad"],
    datasets: [
      {
        label: "Características del bono",
        data: results
          ? [results.price, results.duration, results.convexity]
          : [0, 0, 0],
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
        text: "Análisis de Bonos",
      },
    },
  };

  return (
    <Dialog>
      <DialogTrigger>
        <CalculatorButton title="Calculadora de Bonos" description="Calcula las propiedades de un bono." icon={Briefcase} />
      </DialogTrigger>
      <DialogContent className="p-8">
        <DialogHeader>
          <DialogTitle>Calculadora de Bonos</DialogTitle>
          <DialogDescription>
            Introduce los valores necesarios para calcular las propiedades de un
            bono.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-6 mt-4">
          <div>
            <label className="font-semibold">Valor Nominal</label>
            <Input
              type="number"
              placeholder="1000"
              value={inputs.nominal}
              onChange={(e) =>
                setInputs((prev) => ({ ...prev, nominal: e.target.value }))
              }
            />
          </div>
          <div>
            <label className="font-semibold">Tasa de Cupón (%)</label>
            <Input
              type="number"
              placeholder="5"
              value={inputs.couponRate}
              onChange={(e) =>
                setInputs((prev) => ({ ...prev, couponRate: e.target.value }))
              }
            />
          </div>
          <div>
            <label className="font-semibold">Años al Vencimiento</label>
            <Input
              type="number"
              placeholder="10"
              value={inputs.years}
              onChange={(e) =>
                setInputs((prev) => ({ ...prev, years: e.target.value }))
              }
            />
          </div>
          <div>
            <label className="font-semibold">Tasa de Mercado (%)</label>
            <Input
              type="number"
              placeholder="3"
              value={inputs.marketRate}
              onChange={(e) =>
                setInputs((prev) => ({ ...prev, marketRate: e.target.value }))
              }
            />
          </div>
        </div>
        <DialogFooter className="mt-4">
          <Button className="w-full" onClick={handleCalculate}>
            Calcular
          </Button>
        </DialogFooter>
        {results.price !== null && (
          <div className="mt-4">
            <div className="p-4 border rounded bg-gray-100">
              <p>
                <strong>Precio del Bono:</strong> {results.price}
              </p>
              <p>
                <strong>Duración:</strong> {results.duration}
              </p>
              <p>
                <strong>Convexidad:</strong> {results.convexity}
              </p>
            </div>
            <div className="mt-4">
              <Bar data={chartData} options={chartOptions} />
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
