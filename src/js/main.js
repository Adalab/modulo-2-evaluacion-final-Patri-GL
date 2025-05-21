"use strict";

//CONNECTION TO THE HTML
const movieList = document.querySelector(".js_movieList");
const searchBox = document.querySelector(".js_searchBox");
const searchInput = document.querySelector(".js_searchInput");
const searchBtn = document.querySelector(".js_searchBtn");
const favouriteMovies = document.querySelector(".js_favouriteMovies");
const resetBtn = document.querySelector(".js_resetBtn");

//DATA TO BE USED LATER ON
const oneMovie = {
  mal_id: "20",
  image_url: "https://cdn.myanimelist.net/images/anime/1141/142503.jpg",
  title: "Naruto",
};
let allMovies = [];
let myAnimeMovies = [];
let imageUrl;

//FUNCTIONS
//1. TO CREATE ONE MOVIE CARD. USING TERNIARY CONDITIONAL, BECAUSE IF-ELSE GAVE BACK AN ERROR THAT WOULD BREAK MY WHOLE JS
function renderOneMovie(oneMovie) {
  const html = `<li  class="listItem js_listitem" data-mal_hook="${
    oneMovie.mal_id
  }">
         <figure> <img
            src="${
              oneMovie.images?.jpg?.image_url === null
                ? "https://placehold.co/210x300/ffffff/555555?text=TV"
                : oneMovie.images?.jpg?.image_url
            }"
            alt="${oneMovie.title}"
          />
          <figcaption>${oneMovie.title}</figcaption> </figure>
        </li>`;
  console.log("The conditional for images null works");
  return html;
}

//2. TO SHOW ALL MOVIE CARDS, WE ARE ADDING THE QUERY SELECTOR ALL HERE BECAUSE WE NEED ASIGN EVENTS LATER ON THUS WE ARE USING A LOOP.
function renderAllMovies() {
  let html = "";
  for (const oneMovie of allMovies) {
    html += renderOneMovie(oneMovie);
  }
  movieList.innerHTML = html;

  const allListItems = document.querySelectorAll(".js_listitem");
  for (const oneListItem of allListItems) {
    oneListItem.addEventListener("click", handleClickMovie);
  }
}

function renderAllFavouriteMovies() {
  let html = "";
  for (const oneMovie of myAnimeMovies) {
    html += renderOneMovie(oneMovie);
  }
  favouriteMovies.innerHTML = html;
}

//3. ARROW FUNCTION TO MAKE SEARCHES FILTERING ACROSS THE API DATABASE. USING TRIM SO THE MACHINE WILL ADAPT TO ANY MISTAKES OF THE USER, SINCE WE WERE NOT REQUESTED TO GIVE BACK AN ERROR WHEN MISYTPING
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
//4. ADDING AN EVENT LISTENER CLICK FOR THE FILTER MOVIE FUNCTION
searchBtn.addEventListener("click", filterMovie);

//5. FUNCTION LINKED TO N2 TO ADD AND REMOVE THE FAVOURITE CLASS TO EACH CARD UPON CLICKING, WENT TROUGH CHALLENGES HERE TO RECOGNISE THE 'HOOK'
function handleClickMovie(ev) {
  const clickedListItem = ev.currentTarget;
  clickedListItem.classList.toggle("favourite");

  const idMal_hook = parseInt(clickedListItem.dataset.mal_hook);

  //5.1 FINDING THE POSITION OF MY SELECTED FAVORITE CARD AMONGST ALL FAVOURITE MOVIES SO I CAN DO MY CONDITIONALS LATER
  const moviePositionInFavs = myAnimeMovies.findIndex(
    (oneMovie) => oneMovie.mal_id === idMal_hook
  );
  //5.2 ADDING MY FAVOURITE ANIME MOVIE CARDS TO MY ARRAY myAnimeMovies = [] AND MY LIST ON THE LEFT
  if (moviePositionInFavs === -1) {
    const clickedMovieCard = allMovies.find(
      (oneMovie) => oneMovie.mal_id === idMal_hook
    );
    myAnimeMovies.push(clickedMovieCard);
    localStorage.setItem("favouriteMovies", JSON.stringify(myAnimeMovies));
    const htmlOneMovieCard = renderOneMovie(clickedMovieCard);
    favouriteMovies.innerHTML += htmlOneMovieCard;
  } else {
    //5.3 REMOVING A MOVIE FROM MY ARRAY AND THE LIST TO AVOID DUPLICATES.
    const [removingMovies] = myAnimeMovies.splice(moviePositionInFavs, 1);
    const favItemToRemove = favouriteMovies.querySelector(
      `[data-mal_hook="${removingMovies.mal_id}"]`
    );
    if (favItemToRemove !== null) {
      favItemToRemove.remove();
    }
  }
}
// 6. FETCHING DATA, IE LINKING TO THE API DB AND SHOWING ALL DATA ON MY SIDE
fetch("https://api.jikan.moe/v4/anime?q=")
  .then((res) => res.json())
  .then((data) => {
    allMovies = data.data;

    renderAllMovies();
  });

//7. THIS LINKS MY LOCAL STORAGE TO MY FAVOURITE ANIME MOVIES LIST, STORING
const myMoviesfromLS = JSON.parse(localStorage.getItem("favouriteMovies"));
if (myMoviesfromLS !== null) {
  myAnimeMovies = myMoviesfromLS;
  renderAllFavouriteMovies();
}

//8. REMOVING LOCALSTORAGE AND DELETING FAVOURITE LIST ON CLICK
const removeLocalStorage = (event) => {
  event.preventDefault();
  localStorage.clear();
  if (localStorage.length === 0) favouriteMovies.innerHTML = "";
};
resetBtn.addEventListener("click", removeLocalStorage);
