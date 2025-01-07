import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton"; // Asegúrate de tener este componente
import PropTypes from 'prop-types'

export const Ratios = ({ ratios, loading }) => {
  const isValidRatio = (value) => value != null && !isNaN(value);

  if (loading) {
    return (
      <Card>
        <div className="p-4 space-y-4 w-64">
          <Skeleton className="h-6 w-1/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </Card>
    );
  }

  if (!ratios) {
    return null;
  }

  return (
    <Card>
      <Table className="pr-4">
        <TableHeader className="bg-gray-200 rounded-t-lg">
          <TableRow className="rounded-t-lg">
            <TableCell className="font-bold">RATIO</TableCell>
            <TableCell className="text-right font-bold pr-16">VALOR</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* Verifica que los ratios no sean null, undefined o NaN */}
          {isValidRatio(ratios.per) && (
            <TableRow>
              <TableCell className="font-medium text-left pl-8">PER</TableCell>
              <TableCell className="text-right pr-16">{ratios.per}</TableCell>
            </TableRow>
          )}
          {isValidRatio(ratios.pv) && (
            <TableRow>
              <TableCell className="font-medium text-left pl-8">
                Precio sobre Ventas (PV)
              </TableCell>
              <TableCell className="text-right pr-16">{ratios.pv}</TableCell>
            </TableRow>
          )}
          {isValidRatio(ratios.priceToBook) && (
            <TableRow>
              <TableCell className="font-medium text-left pl-8">
                Precio sobre Valor Contable (Price to Book)
              </TableCell>
              <TableCell className="text-right pr-16">
                {ratios.priceToBook}
              </TableCell>
            </TableRow>
          )}
          {isValidRatio(ratios.roe) && (
            <TableRow>
              <TableCell className="font-medium text-left pl-8">ROE</TableCell>
              <TableCell className="text-right pr-16">{ratios.roe}</TableCell>
            </TableRow>
          )}
          {isValidRatio(ratios.dpa) && (
            <TableRow>
              <TableCell className="font-medium text-left pl-8">
                Dividendo por acción (DPA)
              </TableCell>
              <TableCell className="text-right pr-16">{ratios.dpa}</TableCell>
            </TableRow>
          )}
          {isValidRatio(ratios.yield) && (
            <TableRow>
              <TableCell className="font-medium text-left pl-8">
                Rentabilidad por dividendo
              </TableCell>
              <TableCell className="text-right pr-16">{ratios.yield}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Card>
  );
};


Ratios.propTypes = {
  ratios: PropTypes.array,
  loading: PropTypes.bool
}