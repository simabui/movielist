"use strict";
import { getMovies } from "./apiService";
import movieTemp from "../templates/collections-temp.hbs";
import favTemp from "../templates/favTemp.hbs";
import FavoriteList from "./favorite";
import { getData } from "./localStorage";
import { showModal } from "./modal";
//object
export const favMovies = new FavoriteList();
let moviesCollection = [];

const movies = document.querySelector("#movies");
const favorite = document.querySelector(".favorite-list");
const genres = document.querySelector("#genre");

movies.addEventListener("click", handleMovie);
favorite.addEventListener("click", handleDelete);
genres.addEventListener("change", handleGenres);

// render Movies
async function renderMovies() {
  const data = await getMovies();
  moviesCollection.push(...editGenres(data));
  const moviesMarkup = movieTemp(moviesCollection);
  movies.insertAdjacentHTML("beforeend", moviesMarkup);
}

window.onload = function () {
  renderListFromLocal();
  renderMovies().then(() => {
    // add stars to fav images from saved
    addStarToGallery();
  });
};

function handleMovie(e) {
  const parent = e.target.closest(".movie");
  if (e.target.classList.contains("star")) {
    // handleFavorite
    e.target.classList.toggle("star-img-active");
    const title = parent.getElementsByClassName("movie__title")[0].innerText;
    const id = parent.dataset.id;
    if (e.target.classList.contains("star-img-active")) {
      manageFav([{ title, id }], addToFav);
    }

    // remove if clicked again on star
    if (!e.target.classList.contains("star-img-active")) {
      favMovies.delete(id);
      renderFavorite();
    }
  }

  // show modal
  if (parent && !e.target.classList.contains("star")) {
    const id = parent.dataset.id;
    showModal(id);
  }
}

function addToFav(movies) {
  favMovies.collection = movies;
}

export function renderFavorite() {
  const edited = favMovies.collection.map((movie) => {
    return {
      movie: editTitle(movie.title),
      id: movie.id,
    };
  });
  const favMarkup = favTemp(edited);
  favorite.innerHTML = favMarkup;
}

function manageFav(title, callback) {
  // addToFav(title);
  callback(title);
  renderFavorite();
}

function editTitle(title) {
  let editTitle;

  if (title.length > 23) {
    editTitle = [...title].slice(0, 23); //cut title to 23 chars
    editTitle.push("...");
    return editTitle.join("");
  } else {
    return title;
  }
}

function handleDelete(e) {
  if (e.target.classList.contains("fav__delete")) {
    const id = e.target.closest(".fav__item").dataset.id;
    removeStarFromGallery(id);
    favMovies.delete(id);
    renderFavorite();
  }
}

/*  manage stars */
export function addStarToGallery() {
  const matchedElem = findMatched();
  matchedElem.map((movie) => movie[0].classList.add("star-img-active"));
}

export function removeStarFromGallery(id) {
  const moviesAll = document.querySelectorAll(".movie");
  const matched = [...moviesAll].filter((movie) => movie.dataset.id == id);
  const star = matched[0].getElementsByClassName("star");
  star[0].classList.remove("star-img-active");
}

function findMatched() {
  const moviesAll = document.querySelectorAll(".movie");
  const movies = getData();

  if (movies && movies.length > 0) {
    const locaclId = movies.map((movie) => movie.id);
    const matched = [...moviesAll].filter((movie) =>
      locaclId.includes(movie.dataset.id)
    );
    return matched.map((movie) => movie.getElementsByClassName("star"));
  } else {
    return [];
  }
}

// render from local
function renderListFromLocal() {
  const movies = getData();
  if (movies && movies.length > 0) {
    manageFav(movies, addToFav);
  }
}

// fix genres capitalize
function editGenres(data) {
  return data.map((movie) => {
    return {
      ...movie,
      genres: movie.genres.map((genre) => genre.toLowerCase()),
    };
  });
}

function handleGenres() {
  const genre = genres.value;
  const selectedMovies = moviesCollection.reduce((acc, currItem, id, arr) => {
    if (genre === "") {
      return arr;
    } else {
      const filtered = arr.filter((movie) => movie.genres.includes(genre));
      return filtered;
    }
  }, []);
  const moviesMarkup = movieTemp(selectedMovies);
  movies.innerHTML = moviesMarkup;
  addStarToGallery();
}
