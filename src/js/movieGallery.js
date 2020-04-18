"use strict";
import { getMovies } from "./apiService";
import movieTemp from "../templates/collections-temp.hbs";

const movies = document.querySelector("#movies");

async function renderMovies() {
  const data = await getMovies();
  const moviesMarkup = movieTemp(data);
  movies.insertAdjacentHTML("beforeend", moviesMarkup);
}

window.onload = function () {
  renderMovies();
};
