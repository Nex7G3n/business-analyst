
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

export function RatiosCalculator() {
    const [activoCorriente, setActivoCorriente] = useState('');
    const [pasivoCorriente, setPasivoCorriente] = useState('');
    const [totalPasivo, setTotalPasivo] = useState('');
    const [totalActivo, setTotalActivo] = useState('');
    const [beneficioNeto, setBeneficioNeto] = useState('');
    const [capitalPropio, setCapitalPropio] = useState('');
    const [ratios, setRatios] = useState(null);
    return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Calcula manualmente</Button>
      </DialogTrigger>
      <DialogContent className="flex flex-row">
        <div className="grid gap-4 py-4">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Input
                type="number" 
                placeholder="Activo Corriente" 
                value={activoCorriente} 
                onChange={(e) => setActivoCorriente(e.target.value)} 
            />
            <Input 
                type="number" 
                placeholder="Pasivo Corriente" 
                value={pasivoCorriente} 
                onChange={(e) => setPasivoCorriente(e.target.value)} 
            />
            <Input 
                type="number" 
                placeholder="Total Pasivo" 
                value={totalPasivo} 
                onChange={(e) => setTotalPasivo(e.target.value)} 
            />
            <Input 
                type="number" 
                placeholder="Total Activo" 
                value={totalActivo} 
                onChange={(e) => setTotalActivo(e.target.value)} 
            />
            <Input 
                type="number" 
                placeholder="Beneficio Neto" 
                value={beneficioNeto} 
                onChange={(e) => setBeneficioNeto(e.target.value)} 
            />
            <Input 
                type="number" 
                placeholder="Capital Propio" 
                value={capitalPropio} 
                onChange={(e) => setCapitalPropio(e.target.value)} 
            />  
        <DialogFooter>
          <Button onClick={() => {
            calculateRatios(activoCorriente, pasivoCorriente, totalPasivo, totalActivo, beneficioNeto, capitalPropio, setRatios)
            console.log(ratios)
          }} >Calcular Ratios</Button>
        </DialogFooter>
        </div>
      {ratios && (
                <div>
                    <strong>Ratios calculados:</strong>
                    <p>Ratio de Liquidez Corriente: {ratios.ratioLiquidez}</p>
                    <p>Ratio de Endeudamiento: {ratios.ratioEndeudamiento}</p>
                    <p>ROE (Rentabilidad sobre el Capital): {ratios.roe}</p>
                    <p>ROA (Rentabilidad sobre el Activo): {ratios.roa}</p>
                </div>
            )}
      </DialogContent>
    </Dialog>
  )
}
