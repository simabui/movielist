"use strict";

export function setData(data) {
  const dataJSON = JSON.stringify(data);
  localStorage.setItem("movies", dataJSON);
}

export function getData() {
  const data = localStorage.getItem("movies");
  return JSON.parse(data);
}
