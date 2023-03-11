const API_KEY = "api_key=a4a21473f9ab93bf4ee2d3a59384f0dd";
const BaseURL = "https://api.themoviedb.org/3";
const API_URL = BaseURL + "/discover/movie?sort_by=popularity.desc&" + API_KEY;
const IMG_URL = "https://image.tmdb.org/t/p/w500/";
const SEARCH_URL = BaseURL + "/search/movie?&" + API_KEY;

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
const button = document.getElementById("button");

getMovie(API_URL);

function getMovie(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.results);
      showMovies(data.results);
    });
}

function showMovies(data) {
  main.innerHTML = "";
  data.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;
    const movieEle = document.createElement("div");
    movieEle.classList.add("movie");
    movieEle.innerHTML = `
        <div class="movie">
        <img
          src="${IMG_URL + poster_path}"
          alt="${title}"
        />
        <div class="movie-summary">
          <h3>${title}</h3>
          <span class="${getColour(vote_average)}">${vote_average}</span>
        </div>
        <div class="description">
          <h3>Synopsis</h3>
          ${overview}
        </div>
         `;

    main.appendChild(movieEle);
  });
}

function getColour(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchItem = search.value;
  if (searchItem) {
    getMovie(SEARCH_URL + "&query=" + searchItem);
  } else {
    getMovie(API_URL);
  }
});
button.addEventListener("click", () => {
  getMovie(API_URL);
});
