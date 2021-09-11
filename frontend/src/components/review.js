import { el, text } from "../dom";
import { rating as ratingComponent } from "./rating";

export const review = ({ rating, description }) =>
  el(
    "li",
    { class: "flex mb-4" },
    ratingComponent({ amount: rating }),
    el(
      "div",
      { class: "ml-4" },
      el("span", { class: "font-bold" }, text(rating)),
      text(", "),
      el("span", { class: "text-gray-500" }, text(description)),
    ),
  );
