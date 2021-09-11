import { el, text } from "../dom";
import { rating as ratingComponent } from "./rating";

export const review = ({ rating, description }) =>
  el(
    "li",
    { class: "mb-6 leading-6" },
    el("div", { class: "absolute" }, ratingComponent({ amount: rating })),
    el(
      "span",
      { class: "ml-2 font-bold", style: "padding-left: 7.5rem" },
      text(rating),
    ),
    text(", "),
    el("span", { class: "text-gray-500" }, text(description)),
  );
