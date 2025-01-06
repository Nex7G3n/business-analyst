import { useState, useEffect } from "react";
import { Card, CardHeader, CardFooter, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Skeleton } from "./ui/skeleton";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog";
import { Pagination } from "@/components/ui/pagination";
import { useSearch } from "@/context/search.context";

function ImageWithSkeleton({ src, alt, className, pageKey }) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => setIsLoaded(false), [pageKey]);

  return (
    <div className="relative w-full h-full">
      {!isLoaded && <Skeleton className="w-full h-40 rounded-md" />}
      <img
        src={src}
        alt={alt}
        className={`${className} ${!isLoaded ? "hidden" : ""}`}
        onLoad={() => setIsLoaded(true)}
        onError={() => setIsLoaded(true)}
      />
    </div>
  );
}

function News() {
  const [currentPage, setCurrentPage] = useState(1);
  const { searchData } = useSearch();

  useEffect(() => {
    setCurrentPage(1);
  }, [searchData]);

  if (searchData.state === "No Search") return <></>;

  const itemsPerPage = 6;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems =
    searchData.data?.articles?.slice(indexOfFirstItem, indexOfLastItem) || [];
  const totalPages = searchData.data?.articles?.length
    ? Math.ceil(searchData.data.articles.length / itemsPerPage)
    : 0;

  if (searchData.state === "Loading") {
    return (
      <div className="p-6 grid gap-6">
        <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gray-900 drop-shadow-lg">
          Últimas noticias
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <Card key={index}>
              <CardHeader>
                <Skeleton className="w-full h-40 rounded-md" />
                <Skeleton className="h-6 w-3/4 mt-4" />
                <Skeleton className="h-4 w-1/4 mt-2" />
              </CardHeader>
              <CardFooter>
                <Skeleton className="h-10 w-1/2" />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 grid gap-6">
      <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gray-900 drop-shadow-lg">
        Últimas noticias
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentItems.map((article, index) => (
          <Card
            key={`${currentPage}-${index}`}
            className="hover:shadow-lg transition-shadow duration-300"
          >
            <CardHeader>
              <ImageWithSkeleton
                src={article.urlToImage}
                alt={article.title}
                className="w-full h-40 object-cover rounded-md"
                pageKey={`${currentPage}-${index}`}
              />
              <CardTitle>{article.title}</CardTitle>
              <Badge variant="outline">{article.source.name}</Badge>
            </CardHeader>
            <CardFooter className="flex justify-between">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">Ver más</Button>
                </DialogTrigger>
                <DialogContent className="p-10">
                  <DialogHeader>
                    <DialogTitle>{article.title}</DialogTitle>
                  </DialogHeader>
                  <ImageWithSkeleton
                    src={article.urlToImage}
                    alt={article.title}
                    className="w-full h-64 object-cover rounded-md mb-4"
                    pageKey={`${currentPage}-${index}-dialog`}
                  />
                  <p>{article.content || "Contenido no disponible."}</p>
                  <DialogFooter>
                    <Button asChild>
                      <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        Leer más en la fuente
                      </a>
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        ))}
      </div>
      {totalPages > 1 && (
        <Pagination className="mt-8">
          <Button
            variant="outline"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Anterior
          </Button>
          <span className="mx-6 my-2">
            Página {currentPage} de {totalPages}
          </span>
          <Button
            variant="outline"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Siguiente
          </Button>
        </Pagination>
      )}
    </div>
  );
}

export default News;
