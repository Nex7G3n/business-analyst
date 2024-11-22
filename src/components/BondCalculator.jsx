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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export function BondCalculator() {
  const [nominal, setNominal] = useState('');
  const [couponRate, setCouponRate] = useState('');
  const [years, setYears] = useState('');
  const [marketRate, setMarketRate] = useState('');
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    const nominalValue = parseFloat(nominal);
    const coupon = (parseFloat(couponRate) / 100) * nominalValue;
    const rate = parseFloat(marketRate) / 100;
    const n = parseInt(years);

    // Cálculo del precio del bono
    let price = 0;
    for (let i = 1; i <= n; i++) {
      price += coupon / Math.pow(1 + rate, i);
    }
    price += nominalValue / Math.pow(1 + rate, n);

    // Duración (Macaulay)
    let duration = 0;
    for (let i = 1; i <= n; i++) {
      duration += (i * (coupon / Math.pow(1 + rate, i))) / price;
    }
    duration += (n * (nominalValue / Math.pow(1 + rate, n))) / price;

    // Convexidad
    let convexity = 0;
    for (let i = 1; i <= n; i++) {
      convexity += (i * (i + 1) * (coupon / Math.pow(1 + rate, i))) / price;
    }
    convexity += (n * (n + 1) * (nominalValue / Math.pow(1 + rate, n))) / price;
    convexity /= Math.pow(1 + rate, 2);

    setResult({
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
        data: result ? [result.price, result.duration, result.convexity] : [0, 0, 0],
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
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full py-8">
          <span className="text-lg font-bold">Calculadora de Bonos</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="p-8">
        <DialogHeader>
          <DialogTitle>Calculadora de Bonos</DialogTitle>
          <DialogDescription>
            Introduce los valores necesarios para calcular las propiedades de un bono.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-6 mt-4">
          <div>
            <label className="font-semibold">Valor Nominal</label>
            <Input
              type="number"
              placeholder="1000"
              value={nominal}
              onChange={(e) => setNominal(e.target.value)}
            />
          </div>
          <div>
            <label className="font-semibold">Tasa de Cupón (%)</label>
            <Input
              type="number"
              placeholder="5"
              value={couponRate}
              onChange={(e) => setCouponRate(e.target.value)}
            />
          </div>
          <div>
            <label className="font-semibold">Años al Vencimiento</label>
            <Input
              type="number"
              placeholder="10"
              value={years}
              onChange={(e) => setYears(e.target.value)}
            />
          </div>
          <div>
            <label className="font-semibold">Tasa de Mercado (%)</label>
            <Input
              type="number"
              placeholder="3"
              value={marketRate}
              onChange={(e) => setMarketRate(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter className="mt-4">
          <Button className="w-full" onClick={handleCalculate}>
            Calcular
          </Button>
        </DialogFooter>
        {result && (
          <div className="mt-4">
            <div className="p-4 border rounded bg-gray-100">
              <p><strong>Precio del Bono:</strong> {result.price}</p>
              <p><strong>Duración:</strong> {result.duration}</p>
              <p><strong>Convexidad:</strong> {result.convexity}</p>
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
