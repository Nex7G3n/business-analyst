import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Skeleton } from './ui/skeleton';
import { Button } from './ui/button';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { Pagination } from '@/components/ui/pagination';

function News({ news, loading }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = news ? news.slice(indexOfFirstItem, indexOfLastItem) : [];
  const totalPages = news ? Math.ceil(news.length / itemsPerPage) : 0;

  if (loading) {
    // Mostrar Skeleton mientras se cargan las noticias
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

  if (!news || news.length === 0) {
    return null
  }

  return (
    <div className="p-6 grid gap-6">
      <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gray-900 drop-shadow-lg">
        Últimas noticias
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentItems.map((article, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <img
                src={article.urlToImage}
                alt={article.title}
                className="w-full h-40 object-cover rounded-md"
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
                  <img
                    src={article.urlToImage}
                    alt={article.title}
                    className="w-full h-64 object-cover rounded-md mb-4"
                  />
                  <p>{article.content || 'Contenido no disponible.'}</p>
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
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
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
