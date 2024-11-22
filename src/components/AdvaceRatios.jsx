import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  import { Card } from "@/components/ui/card";
  import { Skeleton } from "@/components/ui/skeleton";
  import { Bar } from "react-chartjs-2";
  import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
  
  ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);
  
  export default function AdvancedRatios({ advanceRatios, loading }) {
    const isValidRatio = (value) => value != null && !isNaN(value);
  
    if (loading) {
      return (
        <Card>
          <div className="p-4 space-y-4 w-64">
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </Card>
      );
    }
  
    if (!advanceRatios) {
      return null;
    }
  
    // Configuración de los datos para el gráfico
    const chartData = {
      labels: ["WACC", "UAIDI", "EVA", "NOF", "NF"],
      datasets: [
        {
          label: "Ratios Avanzados",
          data: [
            advanceRatios.wacc || 0,
            advanceRatios.uaidi || 0,
            advanceRatios.eva || 0,
            advanceRatios.nof || 0,
            advanceRatios.nf || 0,
          ],
          backgroundColor: "rgba(75, 192, 192, 0.6)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    };
  
    const chartOptions = {
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: "top",
        },
        tooltip: {
          enabled: true,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    };
  
    return (
      <Card className="p-6">
        <div className="flex flex-row space-x-8">
            <div className="w-1/2">
                <h3 className="text-lg font-bold text-center mb-4">Visualización de Ratios</h3>
                <Bar data={chartData} options={chartOptions} />
            </div>
          <div className="w-1/2">
            <Table>
              <TableHeader className="bg-gray-200 rounded-t-lg">
                <TableRow className="rounded-t-lg">
                  <TableCell className="font-bold">Indicador</TableCell>
                  <TableCell className="text-right font-bold pr-16">Valor</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isValidRatio(advanceRatios.wacc) && (
                  <TableRow>
                    <TableCell className="font-medium text-left pl-8">WACC</TableCell>
                    <TableCell className="text-right pr-16">{advanceRatios.wacc}</TableCell>
                  </TableRow>
                )}
                {isValidRatio(advanceRatios.uaidi) && (
                  <TableRow>
                    <TableCell className="font-medium text-left pl-8">UAIDI</TableCell>
                    <TableCell className="text-right pr-16">{advanceRatios.uaidi}</TableCell>
                  </TableRow>
                )}
                {isValidRatio(advanceRatios.eva) && (
                  <TableRow>
                    <TableCell className="font-medium text-left pl-8">EVA</TableCell>
                    <TableCell className="text-right pr-16">{advanceRatios.eva}</TableCell>
                  </TableRow>
                )}
                {isValidRatio(advanceRatios.nof) && (
                  <TableRow>
                    <TableCell className="font-medium text-left pl-8">NOF</TableCell>
                    <TableCell className="text-right pr-16">{advanceRatios.nof}</TableCell>
                  </TableRow>
                )}
                {isValidRatio(advanceRatios.nf) && (
                  <TableRow>
                    <TableCell className="font-medium text-left pl-8">NF</TableCell>
                    <TableCell className="text-right pr-16">{advanceRatios.nf}</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>          
        </div>
      </Card>
    );
  }
