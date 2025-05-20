"use strict";

console.log(">> Ready :)");

const movieList = document.querySelector(".js_movieList");
const searchBox = document.querySelector(".js_searchBox");
const searchInput = document.querySelector(".js_searchInput");
const searchBtn = document.querySelector(".js_searchBtn");
const favouritesMovies = document.querySelector(".js_favouritesMovies");
const resetBtn = document.querySelector(".js_resetBtn");

const oneMovie = {
  mal_id: "20",
  image_url: "https://cdn.myanimelist.net/images/anime/1141/142503.jpg",
  title: "Naruto",
};

let allMovies = [];
let favourite = [];

function renderOneMovie(oneMovie) {
  const html = `<li  class="listItem js_listitem">
         <figure> <img
            src="${oneMovie.images?.jpg?.image_url}"
            alt="${oneMovie.title}"
          />
          <figcaption>${oneMovie.title}</figcaption> </figure>
        </li>`;

  return html;
}

function renderAllMovies() {
  let html = "";
  for (const oneMovie of allMovies) {
    html += renderOneMovie(oneMovie);
  }
  movieList.innerHTML = html;
}

const filterMovie = (event) => {
  event.preventDefault();
  const searchQuery = searchInput.value.trim();
  movieList.innerHTML = "<li>Loading...</li>";
  fetch(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(searchQuery)}`)
    .then((res) => res.json())
    .then((data) => {
      allMovies = data.data;
      renderAllMovies(allMovies);
    });
};
searchBtn.addEventListener("click", filterMovie);

fetch("https://api.jikan.moe/v4/anime?q=naruto")
  .then((res) => res.json())
  .then((data) => {
    allMovies = data.data;

    renderAllMovies();
  });
