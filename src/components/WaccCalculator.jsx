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
import { calculateWacc } from "@/utils/calculator";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';


export function WaccCalculator() {
    const [componentesWacc,setComponentesWacc] = useState(null);
    const [patrimonio, setPatrimonio] = useState('');
    const [pasivoCorriente, setPasivoCorriente] = useState('');
    const [pasivoNoCorriente, setPasivoNoCorriente] = useState('');
    const [teaPasivoCorriente, setTeaPasivoCorriente] = useState('');
    const [teaPasivoNoCorriente, setTeaPasivoNoCorriente] = useState('');
    const [bDesapalancada, setbDesapalancada] = useState('');
    const [rendimientoMercado, setRendimientoMercado] = useState('');
    const [tasaLibreRiego, setTasaLibreRiesgo] = useState('');
    const [impuestoT, setimpuestoT] = useState('');
    const [riesgoPais, setRiesgoPais] = useState('');
    
    const data = [
      { name: 'Total Activo', value: parseFloat(setComponentesWacc.activo) || 0 },
      { name: 'Total Pasivo', value: parseFloat(setComponentesWacc.totalPasivo) || 0 },
    ];
  
    const COLORS = ['#0088FE', '#FF8042'];

    return (
    <Dialog>    
      <DialogTrigger asChild>
        <Button variant="outline">Calcular WACC</Button>
      </DialogTrigger>
      <DialogContent className="flex flex-row gap-8 p-8 w-full max-w-6xl min-h-[700px]"> {/* Aumentamos la altura mínima */}
        <div className="w-1/2">
          <DialogHeader>
            <DialogTitle>Calculadora de WACC</DialogTitle>
            <DialogDescription>
              Introduce los valores necesarios para calcular los ratios financieros.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 mt-4 grid-cols-4">
            <div className="col-span-4">
              <label className="font-semibold">Patrimonio</label>
              <Input
                id="patrimonio"
                type="number" 
                placeholder="0.0" 
                value={patrimonio} 
                onChange={(e) => setPatrimonio(e.target.value)} 
              />
            </div>
            <div className="col-span-3">
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
                <label className="font-semibold">TEA (%)</label>
                <Input
                    id="teaPasivoCorriente"
                    type="number" 
                    placeholder="0.0" 
                    value={teaPasivoCorriente} 
                    onChange={(e) => setTeaPasivoCorriente(e.target.value)} 
                />
            </div>

            <div className="col-span-3">
                <label className="font-semibold">Pasivo No Corriente</label>
                <Input
                    id="pasivoNoCorriente"
                    type="number" 
                    placeholder="0.0" 
                    value={pasivoNoCorriente} 
                    onChange={(e) => setPasivoNoCorriente(e.target.value)} 
                />
            </div>
            <div>
                <label className="font-semibold">TEA (%)</label>
                <Input
                    id="teaPasivoNoCorriente"
                    type="number" 
                    placeholder="0.0" 
                    value={teaPasivoNoCorriente} 
                    onChange={(e) => setTeaPasivoNoCorriente(e.target.value)} 
                />
            </div>    

            <div className="col-span-2">
                <label className="font-semibold">Impuesto T</label>
                <Input
                    id="impuestoT"
                    type="number" 
                    placeholder="0.0" 
                    value={impuestoT} 
                    onChange={(e) => setimpuestoT(e.target.value)} 
                />
            </div>

            <div className="col-span-2">
                <label className="font-semibold">β Desapalancada (%)</label>
                <Input
                    id="bDesapalancada"
                    type="number" 
                    placeholder="0.0" 
                    value={bDesapalancada} 
                    onChange={(e) => setbDesapalancada(e.target.value)} 
                />
            </div>

            <div className="col-span-2">
                <label className="font-semibold">Rendimiento de mercado - RM (%)</label>
                <Input
                    id="rendimientoMercado"
                    type="number" 
                    placeholder="0.0" 
                    value={rendimientoMercado} 
                    onChange={(e) => setRendimientoMercado(e.target.value)} 
                />
            </div>

            <div className="col-span-2">
                <label className="font-semibold">Tasa Libre de Riesgo - RF (%)</label>
                <Input
                    id="tasaLibreRiesgo"
                    type="number" 
                    placeholder="0.0" 
                    value={tasaLibreRiego} 
                    onChange={(e) => setTasaLibreRiesgo(e.target.value)} 
                />
            </div>

            <div className="col-span-2">
                <label className="font-semibold">Riesgo Pais (%)</label>
                <Input
                    id="riesgoPais"
                    type="number" 
                    placeholder="0.0" 
                    value={riesgoPais} 
                    onChange={(e) => setRiesgoPais(e.target.value)} 
                />
            </div>

        </div>
          <DialogFooter className="mt-7">
            <Button className="w-full" onClick={() => {
              calculateWacc(patrimonio, pasivoCorriente, pasivoNoCorriente, teaPasivoCorriente, teaPasivoNoCorriente, bDesapalancada, rendimientoMercado, tasaLibreRiego, impuestoT, riesgoPais,setComponentesWacc);
            }}>
              Calcular
            </Button>
          </DialogFooter>
        </div>
        

        <div className="w-1/2 flex flex-col justify-center items-center">
          {componentesWacc ? (
            <div className="w-full h-full flex flex-col justify-center">
              <strong>WACC calculado:</strong>
              <div className="mt-2 p-4 border rounded-lg shadow-sm bg-gray-50">
                <p><strong>Valor del WACC: </strong> {componentesWacc.wacc}</p>
                <p><strong>β Apalancada: </strong>{componentesWacc.bApalancada}</p>
                <p><strong>CAPM: </strong>{componentesWacc.capm}</p>
                <p><strong>Costo de deuda: </strong>{componentesWacc.kd}</p>
              </div>
              <WaccPieChart
                  className="w-full h-full"
                  totalPatrimonio={patrimonio}
                  totalPasivo={componentesWacc.totalPasivo}
                />
            </div>
          ) : (
            <p>Por favor, introduce los valores necesarios.</p>
          )}
        </div>
        
      </DialogContent>
    </Dialog>
  )
}

function WaccPieChart({ totalPatrimonio, totalPasivo }) {
  const data = [
    { name: 'Total Patrimonio', value: parseFloat(totalPatrimonio) || 0 },
    { name: 'Total Pasivo', value: parseFloat(totalPasivo) || 0 },
  ];

  const COLORS = ['#0088FE', '#FF8042'];

  return (
    <div style={{ width: '100%', height: 300 }}>
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
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
