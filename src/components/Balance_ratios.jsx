import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import React from 'react';

const BalanceFinanciero = ({ balance, ratios }) => {
  return (
    <div>
      {balance && (
        <>
          <Table>
            <TableCaption>Balance Financiero</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">Item</TableHead>
                <TableHead className="text-right">Valor (USD)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium text-left" colSpan={2}>
                  ACTIVO
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-left">Disponible</TableCell>
                <TableCell className="text-right">
                  ${balance.disponible.toLocaleString("en-US")}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-left">
                  Bancos y Otras Empresas del Sistema FII
                </TableCell>
                <TableCell className="text-right">
                  ${balance.bancosFII.toLocaleString("en-US")}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-left">Otras Disponibilidades</TableCell>
                <TableCell className="text-right">
                  ${balance.otrasDisponibilidades.toLocaleString("en-US")}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-left">
                  Cartera de Créditos
                </TableCell>
                <TableCell className="text-right">
                  ${balance.carteraCreditos.toLocaleString("en-US")}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-left">Créditos Vigentes</TableCell>
                <TableCell className="text-right">
                  ${balance.creditosVigentes.toLocaleString("en-US")}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-left">
                  Créditos en Cobranza Judicial
                </TableCell>
                <TableCell className="text-right">
                  ${balance.creditosCobranza.toLocaleString("en-US")}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-left">
                  Provisiones para Créditos
                </TableCell>
                <TableCell className="text-right">
                  (${balance.provisionesCreditos.toLocaleString("en-US")})
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-left">
                  Inmuebles, Mobiliario y Equipo
                </TableCell>
                <TableCell className="text-right">
                  ${balance.inmueblesEquipos.toLocaleString("en-US")}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-left">
                  Total Activo
                </TableCell>
                <TableCell className="text-right">
                  ${balance.totalActivo.toLocaleString("en-US")}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="font-medium text-left" colSpan={2}>
                  PASIVO
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-left">
                  Obligaciones con los Asociados
                </TableCell>
                <TableCell className="text-right">
                  ${balance.obligacionesAsociados.toLocaleString("en-US")}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-left">
                  Obligaciones por Cuentas de Ahorro
                </TableCell>
                <TableCell className="text-right">
                  ${balance.obligacionesAhorro.toLocaleString("en-US")}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-left">
                  Obligaciones por Cuenta a Plazo
                </TableCell>
                <TableCell className="text-right">
                  ${balance.obligacionesPlazo.toLocaleString("en-US")}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-left">Gastos por Pagar</TableCell>
                <TableCell className="text-right">
                  ${balance.gastosPorPagar.toLocaleString("en-US")}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-left">Cuentas por Pagar</TableCell>
                <TableCell className="text-right">
                  ${balance.cuentasPorPagar.toLocaleString("en-US")}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-left">
                  Provisiones Asociativas
                </TableCell>
                <TableCell className="text-right">
                  ${balance.provisionesAsociativas.toLocaleString("en-US")}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-left">
                  Total del Pasivo
                </TableCell>
                <TableCell className="text-right">
                  ${balance.totalPasivo.toLocaleString("en-US")}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="font-medium text-left" colSpan={2}>
                  PATRIMONIO
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-left">Capital Social</TableCell>
                <TableCell className="text-right">
                  ${balance.capitalSocial.toLocaleString("en-US")}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-left">Reservas</TableCell>
                <TableCell className="text-right">
                  ${balance.reservas.toLocaleString("en-US")}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-left">
                  Resultados Acumulados
                </TableCell>
                <TableCell className="text-right">
                  ${balance.resultadosAcumulados.toLocaleString("en-US")}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-left">
                  Resultado Neto del Ejercicio
                </TableCell>
                <TableCell className="text-right">
                  ${balance.resultadoEjercicio.toLocaleString("en-US")}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-left">
                  Total del Patrimonio
                </TableCell>
                <TableCell className="text-right">
                  ${balance.totalPatrimonio.toLocaleString("en-US")}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="font-medium text-left">
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
              <TableHead className="w-[200px]">Ratio</TableHead>
              <TableHead className="text-right">Valor</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
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
              <TableCell className="text-right">
                {ratios.priceToBook}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium text-left">
                EV/EBITDA
              </TableCell>
              <TableCell className="text-right">{ratios.evEbitda}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium text-left">PEG</TableCell>
              <TableCell className="text-right">{ratios.peg}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium text-left">ROA</TableCell>
              <TableCell className="text-right">{ratios.roa}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium text-left">ROE</TableCell>
              <TableCell className="text-right">{ratios.roe}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium text-left">
                BPA (Beneficio por Acción)
              </TableCell>
              <TableCell className="text-right">{ratios.bpa}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium text-left">
                DPA (Dividendo por Acción)
              </TableCell>
              <TableCell className="text-right">{ratios.dpa}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium text-left">Yield</TableCell>
              <TableCell className="text-right">{ratios.yield}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium text-left">Payout</TableCell>
              <TableCell className="text-right">{ratios.payout}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default BalanceFinanciero;
