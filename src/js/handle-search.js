import { recieveValue, fetchResponse, resetButton } from "./apiService";
import { showOverlay } from "./light-box";
import { debounce } from "lodash";

export const refs = {
  input: document.querySelector("#search-form"),
  gallery: document.querySelector(".gallery")
};

refs.input.addEventListener("input", debounce(handleSearch, 500));
refs.gallery.addEventListener("click", handleOverlay);
document.querySelector("#load").addEventListener("click", handleReset);

// Input event
function handleSearch(e) {
  e.preventDefault();
  const input = e.target.value;
  recieveValue(input);
  fetchResponse();
}

function handleOverlay({ target }) {
  if (target.nodeName !== "IMG") return;
  const image = target.dataset.large;
  // Display big image
  showOverlay(image);
}

function handleReset() {
  resetButton;
}
