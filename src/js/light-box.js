import * as basicLightbox from "basiclightbox";
import "basiclightbox/dist/basicLightbox.min.css";

export function showOverlay(img) {
  const template = `<img src=${img} width="800" height="600">`;
  const lightbox = basicLightbox.create(template);

  lightbox.show();
}
