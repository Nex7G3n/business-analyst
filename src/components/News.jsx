import React, { useEffect, useState } from 'react';
import axios from 'axios';

function News({ news }) {
  console.log(news);
  return (
    <div>
      <div className="news-grid">
        {!!news && news.slice(5).map((article, index) => (
          <div> 
            <div className="news-card">
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              <img src={article.urlToImage} alt={article.title} className="news-image" />
              <h3 className="news-title">{article.title}</h3>
              <p className="news-description">{article.description}</p>
            </a>
          </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default News;
