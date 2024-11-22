import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export function FinancialPieChart({ totalActivo, totalPasivo, capitalPropio, beneficioNeto, activoCorriente, pasivoCorriente, ventasTotales}) {
  const data = [
    { name: 'Activo Corriente', value: parseFloat(activoCorriente) || 0 },
    { name: 'Pasivo Corriente', value: parseFloat(pasivoCorriente) || 0 },
    { name: 'Pasivo no corriente', value: parseFloat(totalPasivo - pasivoCorriente) || 0 },
    { name: 'Activo no corriente', value: parseFloat(totalActivo - activoCorriente) || 0 },
    { name: 'Beneficio Neto', value: parseFloat(beneficioNeto) || 0 },
    { name: 'Capital Propio', value: parseFloat(capitalPropio) || 0 },
    { name: 'Ventas Totales', value: parseFloat(capitalPropio) || 0 }
  ];

  // Colores para cada segmento del gráfico de torta
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6384', '#36A2EB'];

  return (
    <div style={{ width: '100%', height: 460}}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={150}
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
export default FinancialPieChart;
