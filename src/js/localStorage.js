"use strict";

export function setData(name, data) {
  const dataJSON = JSON.stringify(data);
  localStorage.setItem(name, dataJSON);
}

export function getData() {
  const data = localStorage.getItem("movies");
  return JSON.parse(data);
}
