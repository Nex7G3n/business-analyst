import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Separator } from "@/components/ui/separator"
import React, { useState } from 'react';

const Codigo = ({balance, ratios}) => {
  return (
    <div>
      {
        balance && (
          <>
            <Table>
              <TableCaption>Balance Sheet Overview</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Item</TableHead>
                  <TableHead className="text-right">Value (USD)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium text-left">Activos Corrientes</TableCell>
                  <TableCell className="text-right">${balance.activosCorrientes.toLocaleString('en-US')}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium text-left">Pasivos Corrientes</TableCell>
                  <TableCell className="text-right">${balance.pasivosCorrientes.toLocaleString('en-US')}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium text-left">Patrimonio</TableCell>
                  <TableCell className="text-right">${balance.patrimonio.toLocaleString('en-US')}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <Separator />
          </>
        )
      }
      
      {ratios && (
        <Table>
        <TableCaption>Financial Ratios Overview</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Ratio</TableHead>
            <TableHead className="text-right">Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium text-left">PER</TableCell>
            <TableCell className="text-right">{ratios.per}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium text-left">Precio sobre Ventas (PV)</TableCell>
            <TableCell className="text-right">{ratios.pv}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium text-left">Precio sobre Valor Contable (Price to Book)</TableCell>
            <TableCell className="text-right">{ratios.priceToBook}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium text-left">EV/EBITDA</TableCell>
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
            <TableCell className="font-medium text-left">BPA (Beneficio por Acción)</TableCell>
            <TableCell className="text-right">{ratios.bpa}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium text-left">DPA (Dividendo por Acción)</TableCell>
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

export default Codigo;
