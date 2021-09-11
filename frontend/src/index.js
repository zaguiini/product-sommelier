import "./styles.scss";
import { rating } from "./components/rating";
import { ratingNumber } from "./components/ratingNumber";
import { text } from "./dom";

const render = () => {
  const app = document.querySelector("#app");
  const averageRatingContainer = document.querySelector("#average-rating");
  const productTitle = document.querySelector("#product-title");

  const productName = "My product...";

  document.title = productName + " - " + document.title;

  productTitle.appendChild(text(productName));

  const averageRating = 3;

  averageRatingContainer.appendChild(ratingNumber({ rating: averageRating }));
  averageRatingContainer.appendChild(rating({ amount: averageRating }));

  app.classList.remove("hidden");
};

render();
