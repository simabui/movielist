"use strict";
import { setData, getData } from "./localStorage";

export default class Favoritelist {
  constructor() {
    this._collection = [];
  }

  get collection() {
    return this._collection;
  }

  set collection(val) {
    this._collection.push(...val);
    setData(this._collection);
  }

  delete(id) {
    this._collection = this._collection.filter((movie) => movie.id !== id);
    setData(this._collection);
  }
}
