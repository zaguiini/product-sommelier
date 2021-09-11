import { el, text } from "../dom";
import { productRating } from "./productRating";

export const productItem = ({ href, name, averageRating }) => {
  return el(
    "a",
    {
      href,
      class: "text-xl font-bold flex justify-between items-center mb-4",
    },
    text(name),
    productRating({ rating: averageRating, small: true }),
  );
};
