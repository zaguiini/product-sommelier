import { el } from "../dom";

import { ratingNumber } from "./ratingNumber";
import { rating as ratingComponent } from "./rating";

export const productRating = ({ rating, small }) => {
  return el(
    "div",
    { class: "flex" },
    ratingNumber({
      rating: rating % 1 === 0 ? rating : rating.toFixed(2),
      small,
    }),
    ratingComponent({ amount: rating }),
  );
};
