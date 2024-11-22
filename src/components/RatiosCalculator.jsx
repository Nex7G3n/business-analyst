import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useState } from "react";
import { calculateRatios } from "@/utils/calculator";
import FinancialPieChart from "./Torta";

export function RatiosCalculator() {
    const [activoCorriente, setActivoCorriente] = useState('');
    const [pasivoCorriente, setPasivoCorriente] = useState('');
    const [totalPasivo, setTotalPasivo] = useState('');
    const [totalActivo, setTotalActivo] = useState('');
    const [beneficioNeto, setBeneficioNeto] = useState('');
    const [capitalPropio, setCapitalPropio] = useState('');
    const [ventasTotales, setVentasTotales] = useState(''); 
    const [ratios, setRatios] = useState(null);

    return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Calcular Ratios Financieros</Button>
      </DialogTrigger>
      <DialogContent className="flex flex-row gap-8 p-8 w-full max-w-6xl min-h-[700px]"> {/* Aumentamos la altura mínima */}
        <div className="w-1/2">
          <DialogHeader>
            <DialogTitle>Calculadora de Ratios Financieros</DialogTitle>
            <DialogDescription>
              Introduce los valores necesarios para calcular los ratios financieros.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 mt-4">
            <div>
              <label className="font-semibold">Activo Corriente</label>
              <Input
                id="activoCorriente"
                type="number" 
                placeholder="0.0" 
                value={activoCorriente} 
                onChange={(e) => setActivoCorriente(e.target.value)} 
              />
            </div>
            <div>
              <label className="font-semibold">Pasivo Corriente</label>
              <Input 
                id="pasivoCorriente"
                type="number" 
                placeholder="0.0" 
                value={pasivoCorriente} 
                onChange={(e) => setPasivoCorriente(e.target.value)} 
              />
            </div>
            <div>
              <label className="font-semibold">Total Pasivo</label>
              <Input 
                id="totalPasivo"
                type="number" 
                placeholder="0.0" 
                value={totalPasivo} 
                onChange={(e) => setTotalPasivo(e.target.value)} 
              />
            </div>
            <div>
              <label className="font-semibold">Total Activo</label>
              <Input 
                id="totalActivo"
                type="number" 
                placeholder="0.0" 
                value={totalActivo} 
                onChange={(e) => setTotalActivo(e.target.value)} 
              />
            </div>
            <div>
              <label className="font-semibold">Beneficio Neto</label>
              <Input 
                id="beneficioNeto"
                type="number" 
                placeholder="0.0" 
                value={beneficioNeto} 
                onChange={(e) => setBeneficioNeto(e.target.value)} 
              />
            </div>
            <div>
              <label className="font-semibold">Capital Propio</label>
              <Input 
                id="capitalPropio"
                type="number" 
                placeholder="0.0" 
                value={capitalPropio} 
                onChange={(e) => setCapitalPropio(e.target.value)} 
              />
            </div>
            <div>
              <label className="font-semibold">Ventas totales</label>
              <Input 
                id="ventasTotales"
                type="number" 
                placeholder="0.0" 
                value={ventasTotales} 
                onChange={(e) => setVentasTotales(e.target.value)} 
              />
            </div>
          </div>

          <DialogFooter className="mt-7">
            <Button className="w-full" onClick={() => {
              calculateRatios(activoCorriente, pasivoCorriente, totalPasivo, totalActivo, beneficioNeto, capitalPropio, ventasTotales, setRatios)
            }}>
              Calcular
            </Button>
          </DialogFooter>
        </div>

        <div className="w-1/2 flex flex-col justify-center items-center">
          {ratios ? (
            <div className="w-full h-full flex flex-col justify-center">
              <strong>Ratios calculados:</strong>
              <div className="mt-2 p-4 border rounded-lg shadow-sm bg-gray-50">
                <p><strong>Ratio de Liquidez Corriente:</strong> {ratios.ratioLiquidez}</p>
                <p><strong>Ratio de Endeudamiento:</strong> {ratios.ratioEndeudamiento}</p>
                <p><strong>ROE (Rentabilidad sobre el Capital):</strong> {ratios.roe}</p>
                <p><strong>ROA (Rentabilidad sobre el Activo):</strong> {ratios.roa}</p>
                <p><strong>Rotación de Activos:</strong> {ratios.rotacionActivos}</p>
                <p><strong>Margen de Beneficio Neto:</strong> {ratios.margenBeneficioNeto}</p>
                <p><strong>Capital de Trabajo:</strong> {ratios.capitalTrabajo}</p>
              </div>
              <div className="w-full h-full">
                <FinancialPieChart
                  className="w-full h-full"
                  activoCorriente={activoCorriente}
                  pasivoCorriente={pasivoCorriente}
                  totalPasivo={totalPasivo}
                  totalActivo={totalActivo}
                  beneficioNeto={beneficioNeto}
                  capitalPropio={capitalPropio}
                  ventasTotales={ventasTotales}
                />
              </div>
            </div>
          ) : (
            <p>Por favor, introduce los valores necesarios.</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
