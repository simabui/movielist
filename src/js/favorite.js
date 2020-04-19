"use strict";
import { setData } from "./localStorage";

export default class Favoritelist {
  constructor() {
    this._collection = [];
  }

  get collection() {
    return this._collection;
  }

  set collection(val) {
    this._collection.push(...val);
    setData("movies", this._collection);
  }

  delete(id) {
    this._collection = this._collection.filter((movie) => movie.id !== id);
    setData("movies", this._collection);
  }
}
