import ReactDOM from "react-dom";

import { el, text } from "../dom";
import { ProductRating } from "./ProductRating";

export const productItem = ({ href, name, averageRating }) => {
  const container = el("a", {
    href,
    class: "text-xl font-bold flex justify-between items-center mb-4",
  });

  ReactDOM.render(<ProductRating rating={averageRating} small />, container);

  container.prepend(text(name));

  return container;
};
