"use strict";

export const getMovies = async () => {
  try {
    const response = await fetch(
      "http://my-json-server.typicode.com/moviedb-tech/movies/list"
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};
