import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableRow } from "./ui/table";
import { Separator } from "./ui/separator";
import { Card } from "./ui/card";
import { Skeleton } from "./ui/skeleton";
import { useSearch } from "../context/search.context";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const BalanceFinanciero = () => {
  const { searchData } = useSearch();
  const [selectedYear, setSelectedYear] = useState("");

  useEffect(() => {
    console.log("La data buscada es: " + JSON.stringify(searchData))
    if (!!searchData.data) {
      console.log("Sem inserta")
      setSelectedYear(searchData.data.balanceData[0]?.fiscalDateEnding || "");
    }
  }, [searchData]);

  if (searchData.state === "No Search") return <></>;

  if (searchData.state === "Loading") {
    return (
      <div className="space-y-6 my-8">
        <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gray-900 drop-shadow-lg">
          Balance General
        </h1>
        <Separator />
        <div className="grid grid-cols-3 gap-4">
          {[...Array(3)].map((_, idx) => (
            <Card key={idx}>
              <div className="p-4 space-y-4">
                <Skeleton className="h-6 w-1/2" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (searchData.state === "Error") {
    return <div>Ocurrió un error al cargar los datos: {searchData.data.error}</div>;
  }

  const selectedData = searchData.data.balanceData.find(
    (data) => data?.fiscalDateEnding === selectedYear
  );

  if (!selectedData) {
    return <div>No se encontraron datos para el año seleccionado.</div>;
  }

  const formatCurrency = (value) => {
    return `$${parseInt(value).toLocaleString("en-US")}`;
  };

  const renderTableSection = (title, data) => (
    <Card>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell
              className="font-bold rounded-t-md bg-gray-200 text-center"
              colSpan={2}
            >
              {title}
            </TableCell>
          </TableRow>
          {data.map(({ label, value }) => (
            <TableRow key={label}>
              <TableCell className="text-left pl-6">{label}</TableCell>
              <TableCell className="text-right text-xs pr-6">
                {formatCurrency(value)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );

  return (
    <div className="space-y-6 my-8">
      <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gray-900 drop-shadow-lg">
        Balance General
      </h1>
      <Separator />

      <div className="flex justify-between space-x-4">
        <div className="flex items-center space-x-4">
          <label className="text-lg font-medium">Selecciona un año:</label>
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Selecciona un año" />
            </SelectTrigger>
            <SelectContent>
              {searchData.data.balanceData.map((data) => (
                <SelectItem
                  key={data.fiscalDateEnding}
                  value={data.fiscalDateEnding}
                >
                  {data.fiscalDateEnding.split("-")[0]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <h2 className="text-2xl font-bold">
          Año: {selectedData.fiscalDateEnding.split("-")[0]}
        </h2>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-3 gap-4">
          {renderTableSection("ACTIVO", [
            {
              label: "Efectivo y Equivalentes",
              value: selectedData.cashAndCashEquivalentsAtCarryingValue,
            },
            {
              label: "Inversiones a Corto Plazo",
              value: selectedData.shortTermInvestments,
            },
            {
              label: "Cuentas por Cobrar",
              value: selectedData.currentNetReceivables,
            },
            { label: "Inventario", value: selectedData.inventory },
            {
              label: "Activos No Corrientes",
              value: selectedData.totalNonCurrentAssets,
            },
            {
              label: "Propiedades y Equipos",
              value: selectedData.propertyPlantEquipment,
            },
            {
              label: "Activos Intangibles",
              value: selectedData.intangibleAssets,
            },
            {
              label: "Total Activo",
              value: selectedData.totalAssets,
              isTotal: true,
            },
          ])}

          {renderTableSection("PASIVO", [
            {
              label: "Cuentas por Pagar",
              value: selectedData.currentAccountsPayable,
            },
            { label: "Deuda a Corto Plazo", value: selectedData.shortTermDebt },
            { label: "Deuda a Largo Plazo", value: selectedData.longTermDebt },
            {
              label: "Pasivos No Corrientes",
              value: selectedData.totalNonCurrentLiabilities,
            },
            {
              label: "Total Pasivo",
              value: selectedData.totalLiabilities,
              isTotal: true,
            },
          ])}

          {renderTableSection("PATRIMONIO", [
            { label: "Capital Social", value: selectedData.commonStock },
            {
              label: "Ganancias Retenidas",
              value: selectedData.retainedEarnings,
            },
            {
              label: "Acciones en Tesorería",
              value: selectedData.treasuryStock,
            },
            {
              label: "Total Patrimonio",
              value: selectedData.totalShareholderEquity,
              isTotal: true,
            },
          ])}
        </div>
      </div>
    </div>
  );
};

export default BalanceFinanciero;
