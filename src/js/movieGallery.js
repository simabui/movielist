"use strict";
import { getMovies, getMovie } from "./apiService";
import movieTemp from "../templates/collections-temp.hbs";
import modalTemp from "../templates/modalTemp.hbs";

const movies = document.querySelector("#movies");
const modal = document.querySelector(".modal");
const modalOverlay = document.querySelector(".modal-overlay");

movies.addEventListener("click", handleMovie);
modalOverlay.addEventListener("click", handleClose);

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
  // show modal
  const parent = e.target.closest(".movie");
  if (parent) {
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
