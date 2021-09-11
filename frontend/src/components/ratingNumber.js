import { el, text } from "../dom";

export const ratingNumber = ({ rating, small }) =>
  el(
    "span",
    {
      class: [small ? "text-xl" : "text-3xl", "mr-2 flex items-center"].join(
        " ",
      ),
    },
    text(rating),
  );
