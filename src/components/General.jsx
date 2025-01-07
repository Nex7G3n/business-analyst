import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "./ui/card";
import { Separator } from "./ui/separator";
import { Globe, Info, DollarSign, TrendingUp } from "lucide-react";
import { useSearch } from "@/context/search.context";
import { Skeleton } from "./ui/skeleton";

const CompanyDetails = () => {
  const { searchData } = useSearch();
  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription((prev) => !prev);
  };

  if(searchData.state === "No Search") return <></>;

  if (searchData.state === "Loading") {
    return (
      <div className="p-6 grid gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <Skeleton className="w-full h-40 rounded-md" />
              <Skeleton className="h-6 w-3/4 mt-4" />
              <Skeleton className="h-4 w-1/4 mt-2" />
            </CardHeader>
            <CardFooter>
              <Skeleton className="h-10 w-1/2" />
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <Skeleton className="w-full h-40 rounded-md" />
              <Skeleton className="h-6 w-3/4 mt-4" />
              <Skeleton className="h-4 w-1/4 mt-2" />
            </CardHeader>
            <CardFooter>
              <Skeleton className="h-10 w-1/2" />
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 text-left">
      <Card className="w-full bg-white shadow-md rounded-lg xl:col-span-2">
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Globe className="w-6 h-6 text-blue-600" />
            {searchData.data.general.Name}
          </CardTitle>
          <p className="text-sm text-gray-600">
            {showFullDescription
              ? searchData.data.general.Description
              : `${searchData.data.general.Description.slice(0, 150)}...`}
            <button
              onClick={toggleDescription}
              className="text-blue-600 hover:underline ml-2"
            >
              {showFullDescription ? "Ver menos" : "Ver más"}
            </button>
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-700 flex gap-2">
                <Info className="w-5 h-5 text-gray-500" />
                Información General
              </h3>
              <Separator className="my-2" />
              <p>
                <strong>Símbolo:</strong> {searchData.data.general.Symbol}
              </p>
              <p>
                <strong>Intercambio:</strong> {searchData.data.general.Exchange}
              </p>
              <p>
                <strong>Industria:</strong> {searchData.data.general.Industry}
              </p>
              <p>
                <strong>Sector:</strong> {searchData.data.general.Sector}
              </p>
              <p>
                <strong>Dirección:</strong> {searchData.data.general.Address}
              </p>
              <p>
                <strong>Sitio Oficial:</strong>{" "}
                <a
                  href={searchData.data.general.OfficialSite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {searchData.data.general.OfficialSite}
                </a>
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-green-500" />
                Finanzas
              </h3>
              <Separator className="my-2" />
              <p>
                <strong>Capitalización de Mercado:</strong>{" "}
                {searchData.data.general.MarketCapitalization}
              </p>
              <p>
                <strong>EBITDA:</strong> {searchData.data.general.EBITDA}
              </p>
              <p>
                <strong>Ratio P/E:</strong> {searchData.data.general.PERatio}
              </p>
              <p>
                <strong>Rendimiento de Dividendos:</strong>{" "}
                {searchData.data.general.DividendYield}
              </p>
              <p>
                <strong>Beta:</strong> {searchData.data.general.Beta}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="w-full bg-white shadow-md rounded-lg h-full">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-green-500" />
            Valoración y Rendimiento
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <p>
              <strong>Precio Objetivo:</strong> $
              {searchData.data.general.AnalystTargetPrice}
            </p>
            <p>
              <strong>EPS:</strong> {searchData.data.general.EPS}
            </p>
            <p>
              <strong>Máximo 52 Semanas:</strong> 239.35
            </p>
            <p>
              <strong>Mínimo 52 Semanas:</strong> 153.95
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompanyDetails;
