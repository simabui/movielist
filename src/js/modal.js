"use strict";
import { getMovie } from "./apiService";
import modalTemp from "../templates/modalTemp.hbs";
import { getData } from "./localStorage";
import {
  favMovies,
  renderFavorite,
  addStarToGallery,
  removeStarFromGallery,
} from "./movieGallery";

const modalOverlay = document.querySelector(".modal-overlay");
const modal = document.querySelector(".modal");

modalOverlay.addEventListener("click", handleModal);

let movie = {};

export async function showModal(id) {
  const data = await getMovie(id);
  movie = {
    title: data.name,
    id: `${data.id}`,
  };
  const movieMarkup = modalTemp(data);
  modal.innerHTML = movieMarkup;
  modalOverlay.classList.add("modal-visible");
  checkIfFav(id);
  window.addEventListener("keydown", handleKeyDown);
}

// handle modal events
function handleModal(e) {
  handleModalStar(e);
  handleClose(e);
}

function handleModalStar(e) {
  if (e.target.classList.contains("modal__star")) {
    e.target.classList.toggle("star-img-active");

    if (e.target.classList.contains("star-img-active")) {
      favMovies.collection = [movie];
      renderFavorite();
      addStarToGallery();
    }

    // remove if clicked again on star
    if (!e.target.classList.contains("star-img-active")) {
      favMovies.delete(movie.id);
      removeStarFromGallery(movie.id);
      renderFavorite();
    }
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

// check if already added to fav
function checkIfFav(id) {
  const movies = getData();

  if (movies && movies.length > 0) {
    const modalStar = document.querySelector(".modal__star");
    const locaclId = movies.map((movie) => movie.id);
    const matched = locaclId.includes(id);
    if (matched) {
      modalStar.classList.add("star-img-active");
    }
  }
}
