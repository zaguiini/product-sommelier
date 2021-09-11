import { el } from "../dom";

const star = ({ active, click } = {}) =>
  el(
    "svg",
    {
      class: [
        "w-6 h-6 fill-current",
        active ? "text-yellow-400" : "text-gray-200",
        click ? "cursor-pointer" : "",
      ]
        .filter(Boolean)
        .join(" "),
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 20 20",
      click,
    },
    el("path", {
      d: "M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z",
    }),
  );

export const rating = ({ amount, click } = {}) =>
  el(
    "div",
    {
      class: "flex justify-center items-center",
    },
    el(
      "div",
      { class: "flex items-center" },
      ...new Array(5).fill(1).map((_, current) => {
        const props = { active: amount > current };

        if (click) {
          props.click = () => click(current + 1);
        }

        return star(props);
      }),
    ),
  );
