import fetch from "node-fetch";

export default {
  async message(switchAnime, switchTvShow, switchFilme) {
    let email = "";
    if (switchAnime) {
      const anime = await getAnime();
      email += `Você recebeu uma recomendação de anime! Título do anime: ${anime} \n`;
    }
    if (switchTvShow) {
      const tvShow = await getTvShow();
      email += `Você recebeu uma recomendação de programa de TV! Título do programa: ${tvShow} \n`;
    }
    if (switchFilme) {
      const filme = await getFilme();
      email += `Você recebeu uma recomendação de filme! Título do filme: ${filme} \n`;
    }
    return email;
  },
};

 const getAnime = async () => {
  const animeData = await fetch(process.env.URL_API_ANIME)
    .then((response) => response.json())
    .catch((err) => console.log("Erro: ", err));
  return animeData.anime;
}; 

const getTvShow = async () => {
  const endpoint = ["top_rated", "on_the_air", "airing_today", "popular"];
  const sortEndpoint = Math.floor(Math.random() * 4);
  let range;
  if (sortEndpoint == 0) {
    range = 133;
  } else if (sortEndpoint == 1) {
    range = 61;
  } else if (sortEndpoint == 2) {
    range = 13;
  } else {
    range = 500;
  }

  const page = Math.floor(Math.random() * range) + 1;

  const tvShowData = await fetch(
    `${process.env.URL_API_TV}${endpoint[sortEndpoint]}?api_key=${process.env.TMDB_API_KEY}&page=${page}&language=en-US`
  )
    .then((response) => response.json())
    .catch((err) => console.log("Erro: ", err));

  const sortTvShow = Math.floor(Math.random() * tvShowData.results.length);

  return tvShowData.results[sortTvShow].name;
};

const getFilme = async () => {
  const page = Math.floor(Math.random() * 500) + 1;
  const endpoint = ["top_rated", "popular"];
  const sortEndpoint = Math.floor(Math.random() * 2);
  const filmeData = await fetch(
    `${process.env.URL_API_FILME}${endpoint[sortEndpoint]}?api_key=${process.env.TMDB_API_KEY}&page=${page}`
  )
    .then((response) => response.json())
    .catch((err) => console.log("Erro: ", err));

  const sortFilme = Math.floor(Math.random() * filmeData.results.length);

  return filmeData.results[sortFilme].title;
};
