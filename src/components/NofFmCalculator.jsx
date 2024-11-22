import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { TrendingDown } from 'lucide-react';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function NofFmCalculator() {
    const [isOpen, setIsOpen] = useState(false);
    const [currentAssets, setCurrentAssets] = useState('');
    const [currentLiabilities, setCurrentLiabilities] = useState('');
    const [inventory, setInventory] = useState('');
    const [accountsReceivable, setAccountsReceivable] = useState('');
    const [accountsPayable, setAccountsPayable] = useState('');
    const [nof, setNof] = useState(null);
    const [fm, setFm] = useState(null);

    const calculateNofFm = () => {
        const nofValue = 
            parseFloat(inventory || 0) + 
            parseFloat(accountsReceivable || 0) - 
            parseFloat(accountsPayable || 0);

        const fmValue = parseFloat(currentAssets || 0) - parseFloat(currentLiabilities || 0);

        setNof(nofValue);
        setFm(fmValue);
    };

    const chartData = (nof !== null && fm !== null) ? {
        labels: ['NOF', 'FM'],
        datasets: [
            {
                label: 'Monto ($)',
                data: [nof, fm],
                backgroundColor: ['#4caf50', '#2196f3'],
            },
        ],
    } : null;

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
            },
        },
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="none" className="w-full py-8">
                    <div className="flex items-center justify-center bg-gray-200 rounded-full p-3">
                        <TrendingDown className="w-10 h-10 text-blue-600" />
                    </div>

                    <div className="flex flex-col text-left">
                        <span className="text-lg font-bold text-gray-800">Calcular NOF y FM</span>
                        <span className="text-sm text-gray-500">Calcula las Necesidades Operativas de Fondos y Fondo de Maniobra</span>
                    </div>
                </Button>
            </DialogTrigger>
            <DialogContent className="p-6 space-y-6">
                <DialogHeader>
                    <DialogTitle className="text-lg font-semibold">Calculadora de NOF y FM</DialogTitle>
                    <DialogDescription className="text-sm text-gray-500">
                        Ingresa los datos necesarios para calcular las métricas financieras.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6">
                    <Card>
                        <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                                <label htmlFor="currentAssets" className="text-sm font-medium">Activo Corriente</label>
                                <Input id="currentAssets" type="number" value={currentAssets} onChange={(e) => setCurrentAssets(e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="currentLiabilities" className="text-sm font-medium">Pasivo Corriente</label>
                                <Input id="currentLiabilities" type="number" value={currentLiabilities} onChange={(e) => setCurrentLiabilities(e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="inventory" className="text-sm font-medium">Inventarios</label>
                                <Input id="inventory" type="number" value={inventory} onChange={(e) => setInventory(e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="accountsReceivable" className="text-sm font-medium">Cuentas por Cobrar</label>
                                <Input id="accountsReceivable" type="number" value={accountsReceivable} onChange={(e) => setAccountsReceivable(e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="accountsPayable" className="text-sm font-medium">Cuentas por Pagar</label>
                                <Input id="accountsPayable" type="number" value={accountsPayable} onChange={(e) => setAccountsPayable(e.target.value)} />
                            </div>
                        </CardContent>
                    </Card>

                    <div className="text-center">
                        <Button onClick={calculateNofFm} className="w-full sm:w-auto">Calcular</Button>
                    </div>

                    {(nof !== null && fm !== null) && (
                        <Card>
                            <CardContent className="space-y-4">
                                <h2 className="text-lg font-bold">Resultados</h2>
                                <p className="text-center text-xl font-semibold text-green-600">NOF: ${nof.toFixed(2)}</p>
                                <p className="text-center text-xl font-semibold text-blue-600">FM: ${fm.toFixed(2)}</p>
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
}

export default NofFmCalculator;
