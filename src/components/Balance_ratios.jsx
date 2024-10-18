import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card"; // Asegúrate de tener este componente
import React from 'react';

const BalanceFinanciero = ({ balance, ratios }) => {
  return (
    <div className="space-y-6 my-8">
      {balance && (
        <>
          <div className="grid grid-cols-3 gap-4"> {/* Añadido para organizar en columnas */}
            {/* Sección ACTIVO */}
            <Card>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-bold rounded-t-md bg-gray-200 text-center" colSpan={2}>
                      ACTIVO
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className=" text-left pl-6">Disponible</TableCell>
                    <TableCell className="text-right text-xs pr-6">
                      ${balance.disponible.toLocaleString("en-US")}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="text-left w-[185px] pl-6">Bancos y Otras Empresas del Sistema FII</TableCell>
                    <TableCell className="text-right text-xs pr-5">
                      ${balance.bancosFII.toLocaleString("en-US")}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="text-left pl-6">Otras Disponibilidades</TableCell>
                    <TableCell className="text-right text-xs pr-5">
                      ${balance.otrasDisponibilidades.toLocaleString("en-US")}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-left pl-6">Cartera de Créditos</TableCell>
                    <TableCell className="text-right text-xs pr-5">
                      ${balance.carteraCreditos.toLocaleString("en-US")}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="pl-10 text-left">Créditos Vigentes</TableCell>
                    <TableCell className="text-right text-xs pr-5">
                      ${balance.creditosVigentes.toLocaleString("en-US")}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="pl-10 text-left">Créditos en Cobranza Judicial</TableCell>
                    <TableCell className="text-right text-xs pr-5">
                      ${balance.creditosCobranza.toLocaleString("en-US")}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="pl-10 text-left">Provisiones para Créditos</TableCell>
                    <TableCell className="text-right text-xs pr-5">
                      (${balance.provisionesCreditos.toLocaleString("en-US")})
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="pl-10 text-left">Inmuebles, Mobiliario y Equipo</TableCell>
                    <TableCell className="text-right text-xs pr-5">
                      ${balance.inmueblesEquipos.toLocaleString("en-US")}
                    </TableCell>
                  </TableRow>

                <TableRow>
                  <TableCell className="pl-6 text-lg font-bold text-left">Total Activo</TableCell>
                  <TableCell className="text-right font-bold pr-5 ">
                    ${balance.totalActivo.toLocaleString("en-US")}
                  </TableCell>
                </TableRow>
                  
                </TableBody>
              </Table>
            </Card>

            {/* Sección PASIVO */}
            <Card>
              <Table >
                
                <TableBody>
                  <TableRow>
                    <TableCell className="font-bold text-center rounded-t-md bg-gray-200" colSpan={2}>
                      PASIVO
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="pl-6 text-left w-[170px]">Obligaciones con los Asociados</TableCell>
                    <TableCell className="text-right text-xs pr-6">
                      ${balance.obligacionesAsociados.toLocaleString("en-US")}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="pl-6 text-left">Obligaciones por Cuentas de Ahorro</TableCell>
                    <TableCell className="text-right text-xs pr-6">
                      ${balance.obligacionesAhorro.toLocaleString("en-US")}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="pl-6 text-left">Obligaciones por Cuenta a Plazo</TableCell>
                    <TableCell className="text-right text-xs pr-6">
                      ${balance.obligacionesPlazo.toLocaleString("en-US")}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="pl-6 text-left">Gastos por Pagar</TableCell>
                    <TableCell className="text-right text-xs pr-6">
                      ${balance.gastosPorPagar.toLocaleString("en-US")}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="pl-6 text-left">Cuentas por Pagar</TableCell>
                    <TableCell className="text-right text-xs pr-6">
                      ${balance.cuentasPorPagar.toLocaleString("en-US")}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="pl-6 text-left">Provisiones Asociativas</TableCell>
                    <TableCell className="text-right text-xs pr-6">
                      ${balance.provisionesAsociativas.toLocaleString("en-US")}
                    </TableCell>
                  </TableRow>
                </TableBody>
                  <TableRow>
                    <TableCell className="pl-6 text-lg font-bold text-left">Total del Pasivo</TableCell>
                    <TableCell className="text-right pr-6 text-lg font-bold">
                      ${balance.totalPasivo.toLocaleString("en-US")}
                    </TableCell>
                  </TableRow>
              </Table>
            </Card>

            {/* Sección PATRIMONIO */}
            <Card>
              <Table>
                
                <TableBody>
                  <TableRow>
                    <TableCell className="font-bold text-center rounded-t-md bg-gray-200" colSpan={2}>
                      PATRIMONIO
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="pl-6 text-left w-[180px]">Capital Social</TableCell>
                    <TableCell className="text-right pr-6 text-xs">
                      ${balance.capitalSocial.toLocaleString("en-US")}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="pl-6 text-left">Reservas</TableCell>
                    <TableCell className="text-right pr-6 text-xs">
                      ${balance.reservas.toLocaleString("en-US")}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="pl-6 text-left">Resultados Acumulados</TableCell>
                    <TableCell className="text-right pr-6 text-xs">
                      ${balance.resultadosAcumulados.toLocaleString("en-US")}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="pl-6 text-left">Resultado Neto del Ejercicio</TableCell>
                    <TableCell className="text-right pr-6 text-xs">
                      ${balance.resultadoEjercicio.toLocaleString("en-US")}
                    </TableCell>
                  </TableRow>
                </TableBody>
                  <TableRow>
                    <TableCell className="pl-6 font-bold text-left text-lg">Total del Patrimonio</TableCell>
                    <TableCell className="text-right pr-6 text-lg font-bold">
                      ${balance.totalPatrimonio.toLocaleString("en-US")}
                    </TableCell>
                  </TableRow>
              </Table>
            </Card>
          </div>

          {/* TOTAL PASIVO Y PATRIMONIO */}
          <Card>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className="pl-8 text-lg font-bold text-left">
                    Total del Pasivo y Patrimonio
                  </TableCell>
                  <TableCell className="text-right">
                    ${balance.totalPasivoPatrimonio.toLocaleString("en-US")}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Card>

          <Separator />
        </>
      )}

      {ratios && (
        <Card className="w-1/2">
          <Table>
          <TableHeader className="bg-gray-200">
            <TableRow>
              <TableCell className="w-[200px] font-bold">RATIO</TableCell>
              <TableCell className="text-right font-bold">VALOR</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* Ratios */}
            <TableRow>
              <TableCell className="font-medium text-left pl-8">PER</TableCell>
              <TableCell className="text-right">{ratios.per}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium text-left pl-8">Precio sobre Ventas (PV)</TableCell>
              <TableCell className="text-right">{ratios.pv}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium text-left pl-8">Precio sobre Valor Contable (Price to Book)</TableCell>
              <TableCell className="text-right">{ratios.pb}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium text-left pl-8">ROE</TableCell>
              <TableCell className="text-right">{ratios.roe}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        </Card>
        
      )}
    </div>
  );
};

export default BalanceFinanciero;
