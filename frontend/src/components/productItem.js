import { el, text } from "../dom";
import { ratingNumber } from "./ratingNumber";
import { rating as ratingComponent } from "./rating";

export const productItem = ({ href, name, averageRating }) => {
  return el(
    "a",
    {
      href,
      class: "text-xl font-bold flex justify-between items-center mb-4",
    },
    text(name),
    el(
      "div",
      { class: "flex" },
      ratingNumber({ rating: averageRating, small: true }),
      ratingComponent({ amount: 3 }),
    ),
  );
};
