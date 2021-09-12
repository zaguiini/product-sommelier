import ReactDOM from "react-dom";
import { el } from "../dom";
import { Rating } from "./Rating";

import { ratingNumber } from "./ratingNumber";

export const productRating = ({ rating, small }) => {
  const container = el("div", { class: "flex" });

  ReactDOM.render(<Rating amount={rating} />, container);

  container.prepend(
    ratingNumber({
      rating: rating % 1 === 0 ? rating : rating.toFixed(2),
      small,
    }),
  );

  return container;
};
