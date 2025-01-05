import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { calculateRatios } from "@/utils/calculator";
import FinancialPieChart from "../Torta";
import { Calculator } from "lucide-react";
import { CalculatorButton } from "./CalculatorButton";

export const RatiosCalculator = () => {
  const [state, setState] = useState({
    activoCorriente: "",
    pasivoCorriente: "",
    totalPasivo: "",
    totalActivo: "",
    beneficioNeto: "",
    capitalPropio: "",
    ventasTotales: "",
    ratios: null,
  });

  return (
    <Dialog>
      <DialogTrigger>
        <CalculatorButton title="Calcular Ratios Financieros" description="Obtén análisis detallado de tu estado financiero" icon={Calculator} />
      </DialogTrigger>
      <DialogContent className="flex flex-row gap-8 p-8 w-full max-w-6xl min-h-[700px]">
        {" "}
        <div className="w-1/2">
          <DialogHeader>
            <DialogTitle>Calculadora de Ratios Financieros</DialogTitle>
            <DialogDescription>
              Introduce los valores necesarios para calcular los ratios
              financieros.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 mt-4">
            <div>
              <label className="font-semibold">Activo Corriente</label>
              <Input
                id="activoCorriente"
                type="number"
                placeholder="0.0"
                value={state.activoCorriente}
                onChange={(e) =>
                  setState((prevState) => ({
                    ...prevState,
                    activoCorriente: e.target.value,
                  }))
                }
              />
            </div>
            <div>
              <label className="font-semibold">Pasivo Corriente</label>
              <Input
                id="pasivoCorriente"
                type="number"
                placeholder="0.0"
                value={state.pasivoCorriente}
                onChange={(e) =>
                  setState((prevState) => ({
                    ...prevState,
                    pasivoCorriente: e.target.value,
                  }))
                }
              />
            </div>
            <div>
              <label className="font-semibold">Total Pasivo</label>
              <Input
                id="totalPasivo"
                type="number"
                placeholder="0.0"
                value={state.totalPasivo}
                onChange={(e) =>
                  setState((prevState) => ({
                    ...prevState,
                    totalPasivo: e.target.value,
                  }))
                }
              />
            </div>
            <div>
              <label className="font-semibold">Total Activo</label>
              <Input
                id="totalActivo"
                type="number"
                placeholder="0.0"
                value={state.totalActivo}
                onChange={(e) =>
                  setState((prevState) => ({
                    ...prevState,
                    totalActivo: e.target.value,
                  }))
                }
              />
            </div>
            <div>
              <label className="font-semibold">Beneficio Neto</label>
              <Input
                id="beneficioNeto"
                type="number"
                placeholder="0.0"
                value={state.beneficioNeto}
                onChange={(e) =>
                  setState((prevState) => ({
                    ...prevState,
                    beneficioNeto: e.target.value,
                  }))
                }
              />
            </div>
            <div>
              <label className="font-semibold">Capital Propio</label>
              <Input
                id="capitalPropio"
                type="number"
                placeholder="0.0"
                value={state.capitalPropio}
                onChange={(e) =>
                  setState((prevState) => ({
                    ...prevState,
                    capitalPropio: e.target.value,
                  }))
                }
              />
            </div>
            <div>
              <label className="font-semibold">Ventas totales</label>
              <Input
                id="ventasTotales"
                type="number"
                placeholder="0.0"
                value={state.ventasTotales}
                onChange={(e) =>
                  setState((prevState) => ({
                    ...prevState,
                    ventasTotales: e.target.value,
                  }))
                }
              />
            </div>
          </div>

          <DialogFooter className="mt-7">
            <Button
              className="w-full"
              onClick={() => {
                calculateRatios(
                  state.activoCorriente,
                  state.pasivoCorriente,
                  state.totalPasivo,
                  state.totalActivo,
                  state.beneficioNeto,
                  state.capitalPropio,
                  state.ventasTotales,
                  (result) =>
                    setState((prevState) => ({ ...prevState, ratios: result }))
                );
              }}
            >
              Calcular
            </Button>
          </DialogFooter>
        </div>
        <div className="w-1/2 flex flex-col justify-center items-center">
          {state.ratios ? (
            <div className="w-full h-full flex flex-col justify-center">
              <strong>Ratios calculados:</strong>
              <div className="mt-2 p-4 border rounded-lg shadow-sm bg-gray-50">
                <p>
                  <strong>Ratio de Liquidez Corriente:</strong>{" "}
                  {state.ratios.ratioLiquidez}
                </p>
                <p>
                  <strong>Ratio de Endeudamiento:</strong>{" "}
                  {state.ratios.ratioEndeudamiento}
                </p>
                <p>
                  <strong>ROE (Rentabilidad sobre el Capital):</strong>{" "}
                  {state.ratios.roe}
                </p>
                <p>
                  <strong>ROA (Rentabilidad sobre el Activo):</strong>{" "}
                  {state.ratios.roa}
                </p>
                <p>
                  <strong>Rotación de Activos:</strong>{" "}
                  {state.ratios.rotacionActivos}
                </p>
                <p>
                  <strong>Margen de Beneficio Neto:</strong>{" "}
                  {state.ratios.margenBeneficioNeto}
                </p>
                <p>
                  <strong>Capital de Trabajo:</strong>{" "}
                  {state.ratios.capitalTrabajo}
                </p>
              </div>
              <div className="w-full h-full">
                <FinancialPieChart
                  className="w-full h-full"
                  activoCorriente={state.activoCorriente}
                  pasivoCorriente={state.pasivoCorriente}
                  totalPasivo={state.totalPasivo}
                  totalActivo={state.totalActivo}
                  beneficioNeto={state.beneficioNeto}
                  capitalPropio={state.capitalPropio}
                  ventasTotales={state.ventasTotales}
                />
              </div>
            </div>
          ) : (
            <p>Por favor, introduce los valores necesarios.</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
