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
  
  export default function Ratios({ ratios }){
    return(
        <>
            {ratios && (
                <Card>
                    <Table className="pr-4">
                    <TableHeader className="bg-gray-200 rounded-t-lg">
                        <TableRow className="rounded-t-lg">
                        <TableCell className="font-bold">RATIO</TableCell>
                        <TableCell className="text-right font-bold pr-16 ">VALOR</TableCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {/* Ratios */}
                        <TableRow>
                        <TableCell className="font-medium text-left pl-8">PER</TableCell>
                        <TableCell className="text-right pr-16">{ratios.per}</TableCell>
                        </TableRow>
                        <TableRow>
                        <TableCell className="font-medium text-left pl-8">Precio sobre Ventas (PV)</TableCell>
                        <TableCell className="text-right pr-16">{ratios.pv}</TableCell>
                        </TableRow>
                        <TableRow>
                        <TableCell className="font-medium text-left pl-8">Precio sobre Valor Contable (Price to Book)</TableCell>
                        <TableCell className="text-right pr-16">{ratios.priceToBook}</TableCell>
                        </TableRow>
                        <TableRow>
                        <TableCell className="font-medium text-left pl-8">ROE</TableCell>
                        <TableCell className="text-right pr-16">{ratios.roe}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium text-left pl-8">Dividendo por acción (DPA)</TableCell>
                            <TableCell className="text-right pr-16">{ratios.dpa}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium text-left pl-8">
                                Rentabilidad por dividendo
                            </TableCell>
                            <TableCell className="text-right pr-16">{ratios.yield}</TableCell>
                        </TableRow>
                    </TableBody>
                    </Table>
                </Card>
                
            )}
        </>
    )
}