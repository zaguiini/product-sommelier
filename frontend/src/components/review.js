import ReactDOM from "react-dom";
import { el, text } from "../dom";
import { Rating } from "./Rating";

export const review = ({ rating, description }) => {
  const ratingElement = el("div", { class: "absolute" });

  ReactDOM.render(<Rating amount={rating} />, ratingElement);
  return el(
    "li",
    { class: "mb-6 leading-6 break-words" },
    ratingElement,
    el(
      "span",
      { class: "ml-2 font-bold", style: "padding-left: 7.5rem" },
      text(rating),
    ),
    text(", "),
    el("span", { class: "text-gray-500" }, text(description)),
  );
};
