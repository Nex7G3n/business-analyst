import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { DollarSign } from 'lucide-react';  

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function EbitdaCalculator() {
    const [isOpen, setIsOpen] = useState(false);
    const [method, setMethod] = useState('sinEbit');
    const [income, setIncome] = useState('');
    const [expenses, setExpenses] = useState('');
    const [ebit, setEbit] = useState('');
    const [depreciation, setDepreciation] = useState('');
    const [amortization, setAmortization] = useState('');
    const [ebitda, setEbitda] = useState(null);

    const fields = {
        sinEbit: [
            { id: 'income', label: 'Ingresos', value: income, onChange: (e) => setIncome(e.target.value) },
            { id: 'expenses', label: 'Egresos', value: expenses, onChange: (e) => setExpenses(e.target.value) },
        ],
        conEbit: [
            { id: 'ebit', label: 'EBIT', value: ebit, onChange: (e) => setEbit(e.target.value) },
            { id: 'depreciation', label: 'Depreciación', value: depreciation, onChange: (e) => setDepreciation(e.target.value) },
            { id: 'amortization', label: 'Amortización', value: amortization, onChange: (e) => setAmortization(e.target.value) },
        ],
    };

    const MethodButtons = () => (
        <div className="flex gap-4 justify-center">
            <Button
                variant={method === 'sinEbit' ? 'default' : 'outline'}
                onClick={() => setMethod('sinEbit')}
            >
                Sin EBIT
            </Button>
            <Button
                variant={method === 'conEbit' ? 'default' : 'outline'}
                onClick={() => setMethod('conEbit')}
            >
                Con EBIT
            </Button>
        </div>
    );

    const calculateEbitda = () => {
        let calculation;

        if (method === 'sinEbit') {
            calculation = parseFloat(income || 0) - parseFloat(expenses || 0);
        } else if (method === 'conEbit') {
            calculation = parseFloat(ebit || 0) + parseFloat(depreciation || 0) + parseFloat(amortization || 0);
        }
        setEbitda(calculation);
    };

    const chartData = ebitda !== null ? {
        labels: ['EBITDA'],
        datasets: [
            {
                label: 'Monto ($)',
                data: [ebitda],
                backgroundColor: ['#4caf50'],
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
            <Button variant="outline" className="w-full py-8">
                <div className="flex items-center justify-center bg-gray-200 rounded-full p-3">
                    <DollarSign className="w-10 h-10 text-blue-600" />
                </div>

                <div className="flex flex-col text-left pl-4">
                    <span className="text-lg font-bold text-gray-800">Calcular EBITDA</span>
                    <span className="text-sm text-gray-500">Calcula las ganancias antes de intereses, impuestos, depreciación y amortización</span>
                </div>
            </Button>

            </DialogTrigger>
            <DialogContent className="p-6 space-y-6">
                <DialogHeader>
                    <DialogTitle className="text-lg font-semibold">Calculadora de EBITDA</DialogTitle>
                    <DialogDescription className="text-sm text-gray-500">
                        Selecciona un método y calcula el EBITDA.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6">
                    {/* Botones de método */}
                    <MethodButtons />

                    {/* Formulario */}
                    <Card>
                        <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            {fields[method].map(({ id, label, value, onChange }) => (
                                <div key={id} className="space-y-2">
                                    <label htmlFor={id} className="text-sm font-medium">
                                        {label}
                                    </label>
                                    <Input id={id} type="number" value={value} onChange={onChange} />
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    {/* Botón de cálculo */}
                    <div className="text-center">
                        <Button onClick={calculateEbitda} className="w-full sm:w-auto">
                            Calcular
                        </Button>
                    </div>

                    {/* Resultado */}
                    {ebitda !== null && (
                        <Card>
                            <CardContent className="space-y-4">
                                <h2 className="text-lg font-bold">Resultado</h2>
                                <p className="text-center text-xl font-semibold text-green-600">
                                    EBITDA: ${ebitda.toFixed(2)}
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

                <DialogFooter>
                    <Button variant="secondary" onClick={() => setIsOpen(false)}>
                        Cerrar
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default EbitdaCalculator;
