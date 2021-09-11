import { el, text } from "../dom";

export const ratingNumber = ({ rating }) =>
  el("span", { class: "text-3xl mr-2 flex items-center" }, text(rating));
