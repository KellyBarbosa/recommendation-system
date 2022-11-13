import fetch from "node-fetch";

export const message = async (switchAnime, switchTvShow, switchFilme) => {
  let email = "";
  if (switchAnime) {
    let anime = await getAnime();
    email += `Você recebeu uma recomendação de anime! Título do anime: ${anime} \n`;
  }
  if (switchTvShow) {
    let tvShow = await getTvShow();
    email += `Você recebeu uma recomendação de programa de TV! Título do programa: ${tvShow} \n`;
  }
  if (switchFilme) {
    let filme = await getFilme();
    email += `Você recebeu uma recomendação de filme! Título do filme: ${filme} \n`;
  }
  return email;
};

const getAnime = async () => {
  let animeData = await fetch(process.env.URL_API_ANIME).then((response) =>
    response.json()
  );
  return animeData.anime;
};

const getTvShow2 = async () => {
  let id = Math.floor(Math.random() * 129999) + 1;
  let tvShowData = await fetch(
    `${process.env.URL_API_TV}${id}?api_key=${process.env.TMDB_API_KEY}`
  ).then((response) => response.json());

  if (!tvShowData.hasOwnProperty("status_code") && tvShowData !== undefined) {
    return tvShowData.name;
  }
  /* console.log(
    "Url: " +
      `${process.env.URL_API_TV}${id}?api_key=${process.env.TMDB_API_KEY}`
  );
  console.log(tvShowData.name); */
  getTvShow();
};

const getTvShow = async () => {
  const endpoint = ["top_rated", "on_the_air", "airing_today", "popular"];
  const sortEndpoint = Math.floor(Math.random() * 4);
  let range = 500;
  if (sortEndpoint == 0) {
    range = 133;
  }
  if (sortEndpoint == 1) {
    range = 61;
  }
  if (sortEndpoint == 2) {
    range = 13;
  }
  //console.log("Range page: " + range);
  const page = Math.floor(Math.random() * range) + 1;

  let tvShowData = await fetch(
    `${process.env.URL_API_TV}${endpoint[sortEndpoint]}?api_key=${process.env.TMDB_API_KEY}&page=${page}&language=en-US`
  ).then((response) => response.json());
  //console.log(tvShowData);
  /* console.log(
    "Url: " +
      `${process.env.URL_API_TV}${endpoint[sortEndpoint]}?api_key=${process.env.TMDB_API_KEY}&page=${page}`
  ); */
  const sortTvShow = Math.floor(Math.random() * tvShowData.results.length);

  //console.log("Itens retornados: " + tvShowData.results.length);
  return tvShowData.results[sortTvShow].name;
};

const getFilme = async () => {
  const page = Math.floor(Math.random() * 500) + 1;
  const endpoint = ["top_rated", "popular"];
  const sortEndpoint = Math.floor(Math.random() * 2);
  let filmeData = await fetch(
    `${process.env.URL_API_FILME}${endpoint[sortEndpoint]}?api_key=${process.env.TMDB_API_KEY}&page=${page}`
  ).then((response) => response.json());

  const sortFilme = Math.floor(Math.random() * filmeData.results.length);

  //console.log(filmeData);
  //console.log("Url: " +`${process.env.URL_API_FILME}${endpoint[sortEndpoint]}?api_key=${process.env.TMDB_API_KEY}&page=${page}`);
  //console.log("Itens retornados: " + filmeData.results.length);
  return filmeData.results[sortFilme].title;
};
