import React, { useEffect, useState } from 'react';
import axios from 'axios';

function News() {
  const [news, setNews] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(''); // Para controlar lo que escribe el usuario
  const [search, setSearch] = useState('finance'); // Este será el término de búsqueda que se usará en la solicitud
  const [visibleCount, setVisibleCount] = useState(9); // Mostrar 9 artículos inicialmente

  useEffect(() => {
    const apiKey = '75a1603eecb042598d28343256620698'; // Reemplaza con tu propia API Key de NewsAPI
    const url = `https://newsapi.org/v2/everything?q=${search}&language=es&sortBy=publishedAt&apiKey=${apiKey}`;

    axios.get(url)
      .then(response => {
        setNews(response.data.articles);
      })
      .catch(error => {
        setError('Error al obtener las noticias.');
        console.error('Error al hacer la solicitud:', error);
      });
  }, [search]); // La petición se realizará cada vez que 'search' cambie

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      setSearch(searchTerm);
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  const getIcon = (sourceName) => {
    const icons = {
      'CNN': 'fa-newspaper-o',
      'BBC': 'fa-globe',
    };
    return icons[sourceName] || 'fa-globe';
  };

  const filteredNews = news.filter(article => {
    return (
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const loadMore = () => {
    setVisibleCount(prevCount => prevCount + 12);
  };

  return (
    <div>
      <h2 className="text-2xl">Últimas noticias sobre Finanzas</h2>

      <div className='search-container'>
        <i className='fa fa-search search-icon fa-lg'></i>
        <input 
          type="text" 
          placeholder="Search ..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress} // Detecta cuando el usuario presiona "Enter"
          className="search-input" 
        />
      </div>

      <div className="news-grid">
        {filteredNews.slice(0, visibleCount).map((article, index) => (
          <div key={index} className="news-card">
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              <img src={article.urlToImage} alt={article.title} className="news-image" />
              <div className="news-source">
                <i className={`fa ${getIcon(article.source.name)}`}></i>{' '}
                <span>{article.source.name}</span>
              </div>
              <h3 className="news-title">{article.title}</h3>
              <p className="news-description">{article.description}</p>
            </a>
          </div>
        ))}
      </div>

      {filteredNews.length > visibleCount && (
        <button onClick={loadMore} className="load-more-button">Mostrar más</button>
      )}

    </div>
  );
}

export default News;
