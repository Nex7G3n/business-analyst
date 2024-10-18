import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import React from 'react';

const BalanceFinanciero = ({ balance, ratios }) => {
  return (
    <div className="space-y-6 grid justify-center my-10">
      {balance && (
        <>
          <Table className="w-[1100px]">
            <TableCaption>Balance Financiero</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px] text-lg">Item</TableHead>
                <TableHead className="text-right text-lg">Valor (USD)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* ACTIVO */}
              <TableRow>
                <TableCell className="font-bold text-left bg-gray-100" colSpan={2}>
                  ACTIVO
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="pl-8 text-left">Disponible</TableCell>
                <TableCell className="text-right">
                  ${balance.disponible.toLocaleString("en-US")}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="pl-8 text-left">
                  Bancos y Otras Empresas del Sistema FII
                </TableCell>
                <TableCell className="text-right">
                  ${balance.bancosFII.toLocaleString("en-US")}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="pl-8 text-left">Otras Disponibilidades</TableCell>
                <TableCell className="text-right">
                  ${balance.otrasDisponibilidades.toLocaleString("en-US")}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="pl-8 font-medium text-left">
                  Cartera de Créditos
                </TableCell>
                <TableCell className="text-right">
                  ${balance.carteraCreditos.toLocaleString("en-US")}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="pl-16 text-left">Créditos Vigentes</TableCell>
                <TableCell className="text-right">
                  ${balance.creditosVigentes.toLocaleString("en-US")}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="pl-16 text-left">
                  Créditos en Cobranza Judicial
                </TableCell>
                <TableCell className="text-right">
                  ${balance.creditosCobranza.toLocaleString("en-US")}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="pl-16 text-left">
                  Provisiones para Créditos
                </TableCell>
                <TableCell className="text-right">
                  (${balance.provisionesCreditos.toLocaleString("en-US")})
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="pl-16 text-left">
                  Inmuebles, Mobiliario y Equipo
                </TableCell>
                <TableCell className="text-right">
                  ${balance.inmueblesEquipos.toLocaleString("en-US")}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="pl-8 font-bold text-left">
                  Total Activo
                </TableCell>
                <TableCell className="text-right font-bold">
                  ${balance.totalActivo.toLocaleString("en-US")}
                </TableCell>
              </TableRow>

              {/* PASIVO */}
              <TableRow>
                <TableCell className="font-bold text-left bg-gray-100" colSpan={2}>
                  PASIVO
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="pl-8 text-left">
                  Obligaciones con los Asociados
                </TableCell>
                <TableCell className="text-right">
                  ${balance.obligacionesAsociados.toLocaleString("en-US")}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="pl-8 text-left">
                  Obligaciones por Cuentas de Ahorro
                </TableCell>
                <TableCell className="text-right">
                  ${balance.obligacionesAhorro.toLocaleString("en-US")}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="pl-8 text-left">
                  Obligaciones por Cuenta a Plazo
                </TableCell>
                <TableCell className="text-right">
                  ${balance.obligacionesPlazo.toLocaleString("en-US")}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="pl-8 text-left">Gastos por Pagar</TableCell>
                <TableCell className="text-right">
                  ${balance.gastosPorPagar.toLocaleString("en-US")}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="pl-8 text-left">Cuentas por Pagar</TableCell>
                <TableCell className="text-right">
                  ${balance.cuentasPorPagar.toLocaleString("en-US")}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="pl-8 text-left">
                  Provisiones Asociativas
                </TableCell>
                <TableCell className="text-right">
                  ${balance.provisionesAsociativas.toLocaleString("en-US")}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="pl-8 font-bold text-left">
                  Total del Pasivo
                </TableCell>
                <TableCell className="text-right font-bold">
                  ${balance.totalPasivo.toLocaleString("en-US")}
                </TableCell>
              </TableRow>

              {/* PATRIMONIO */}
              <TableRow>
                <TableCell className="font-bold text-left bg-gray-100" colSpan={2}>
                  PATRIMONIO
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="pl-8 text-left">Capital Social</TableCell>
                <TableCell className="text-right">
                  ${balance.capitalSocial.toLocaleString("en-US")}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="pl-8 text-left">Reservas</TableCell>
                <TableCell className="text-right">
                  ${balance.reservas.toLocaleString("en-US")}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="pl-8 text-left">
                  Resultados Acumulados
                </TableCell>
                <TableCell className="text-right">
                  ${balance.resultadosAcumulados.toLocaleString("en-US")}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="pl-8 text-left">
                  Resultado Neto del Ejercicio
                </TableCell>
                <TableCell className="text-right">
                  ${balance.resultadoEjercicio.toLocaleString("en-US")}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="pl-8 font-bold text-left">
                  Total del Patrimonio
                </TableCell>
                <TableCell className="text-right font-bold">
                  ${balance.totalPatrimonio.toLocaleString("en-US")}
                </TableCell>
              </TableRow>

              {/* TOTAL PASIVO Y PATRIMONIO */}
              <TableRow>
                <TableCell className="pl-8 font-bold text-left">
                  Total del Pasivo y Patrimonio
                </TableCell>
                <TableCell className="text-right">
                  ${balance.totalPasivoPatrimonio.toLocaleString("en-US")}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <Separator />
        </>
      )}

      {ratios && (
        <Table>
          <TableCaption>Ratios Financieros</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px] text-lg">Ratio</TableHead>
              <TableHead className="text-right text-lg">Valor</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* Ratios */}
            <TableRow>
              <TableCell className="font-medium text-left">PER</TableCell>
              <TableCell className="text-right">{ratios.per}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium text-left">
                Precio sobre Ventas (PV)
              </TableCell>
              <TableCell className="text-right">{ratios.pv}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium text-left">
                Precio sobre Valor Contable (Price to Book)
              </TableCell>
              <TableCell className="text-right">{ratios.pb}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium text-left">ROE</TableCell>
              <TableCell className="text-right">{ratios.roe}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default BalanceFinanciero;
