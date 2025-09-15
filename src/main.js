import { Carousel } from "./carousel";

const carousel = new Carousel(
  document.getElementById("carousel-container"),
  document.getElementById("carousel-dots")
);

carousel.init();
