import { alert, success } from "./notify-alert";
import imagesLoaded from "imagesloaded/imagesloaded";
import Mansory from "masonry-layout";
import InfiniteScroll from "infinite-scroll";
import collectionTemplate from "../templates/collections-temp.hbs";

const baseURL =
  "https://pixabay.com/api/?image_type=photo&orientation=horizontal&per_page=12&order=popular";
const CORSPROXY = "https://cors-anywhere.herokuapp.com/";
const KEY = "&key=15109703-4df3afa39634f93d9eb19fc69";
let input = "";
const grid = document.querySelector(".gallery");
const button = document.querySelector("#load");
const loadError = document.querySelector(".scroll-error");

export function recieveValue(value) {
  return (input = value);
}
// Masonry
const msnryOptions = {
  columnWidth: 33.3333,
  itemSelector: ".photo-card",
  percentPosition: true,
  transitionDuration: "0.3s",
  visibleStyle: { transform: "translateY(0)", opacity: 1 },
  hiddenStyle: { transform: "translateY(100px)", opacity: 0 }
};

// Infinite scroll
const scrollOptions = {
  responseType: "text",
  scrollThreshold: 100,
  history: false,
  path() {
    return (
      `${CORSPROXY + baseURL + KEY}` + `&q=${input}` + `&page=${this.pageIndex}`
    );
  }
};

export function fetchResponse() {
  const msnry = new Mansory(grid, msnryOptions);
  const infScroll = new InfiniteScroll(grid, scrollOptions);

  infScroll.on("load", response => {
    const images = JSON.parse(response);
    const markup = images.hits.map(image => collectionTemplate(image)).join("");

    if (images.hits.length > 1) {
      success();
    }
    if (images.hits.length < 1) {
      alert();
      //render error text
      loadError.classList.add("isActive");
    }

    const placeholder = document.createElement("div");
    placeholder.innerHTML = markup;
    const parsedItems = placeholder.querySelectorAll(".photo-card");
    imagesLoaded(parsedItems, () => {
      infScroll.appendItems(parsedItems);
      msnry.appended(parsedItems);
    });
  });
  infScroll.loadNextPage();
  button.classList.add("isDisplayed");
}

export function resetButton() {
  msnry.remove(parsedItems);
  // layout remaining item elements
  msnry.layout();
}
