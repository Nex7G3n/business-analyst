import axios from "axios";

const apikey_news = 'b5a3aca5a3e843cebc952c471d7cd32d';

export const getArticles = async (symbol) => {
  axios
    .get(
      `https://newsapi.org/v2/everything?q=${symbol}&language=es&sortBy=publishedAt&apiKey=${apikey_news}`
    )
    .then((response) => {
      setNews(response.data.articles.slice(0, 20));
      console.log("Noticias:", response.data.articles);
    })
    .catch((error) => {
      console.error("Error al hacer la solicitud de noticias:", error);
    });
};
