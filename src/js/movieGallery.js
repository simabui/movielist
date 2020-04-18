"use strict";
import { getMovies, getMovie } from "./apiService";
import movieTemp from "../templates/collections-temp.hbs";
import modalTemp from "../templates/modalTemp.hbs";
import favTemp from "../templates/favTemp.hbs";
import FavoriteList from "./favorite";
import { getData } from "./localStorage";
//object
const favMovies = new FavoriteList();

const movies = document.querySelector("#movies");
const modal = document.querySelector(".modal");
const modalOverlay = document.querySelector(".modal-overlay");
const favorite = document.querySelector(".favorite-list");

movies.addEventListener("click", handleMovie);
modalOverlay.addEventListener("click", handleClose);
favorite.addEventListener("click", handleDelete);

// render Movies
async function renderMovies() {
  const data = await getMovies();
  const moviesMarkup = movieTemp(data);
  movies.insertAdjacentHTML("beforeend", moviesMarkup);
}

window.onload = function () {
  renderMovies();
};

async function handleMovie(e) {
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
    const data = await getMovie(id);
    const movieMarkup = modalTemp(data);
    modal.innerHTML = movieMarkup;
    modalOverlay.classList.add("modal-visible");

    window.addEventListener("keydown", handleKeyDown);
  }
}

// close modal
function handleClose(e) {
  if (e.target.classList.contains("modal__close")) {
    closeModal();
  }
  if (e.target === e.currentTarget) {
    closeModal();
  }
}

function closeModal() {
  modalOverlay.classList.remove("modal-visible");
  window.removeEventListener("keydown", handleKeyDown);
}

function handleKeyDown(e) {
  if (e.code !== "Escape") return;
  closeModal();
}

function addToFav(movies) {
  favMovies.collection = movies;
}

function renderFavorite() {
  const edited = favMovies.collection.map((movie) => {
    return {
      movie: editTitle(movie.title),
      id: movie.id,
    };
  });
  const favMarkup = favTemp(edited);
  favorite.innerHTML = favMarkup;
}

function manageFav(title, func) {
  // addToFav(title);
  func(title);
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
    favMovies.delete(id);
    renderFavorite();
  }
}

// render from local
(function () {
  const movies = getData();
  if (movies && movies.length > 0) {
    manageFav(movies, addToFav);
  }
})();
