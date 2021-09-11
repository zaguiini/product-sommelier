import { productItem } from "./components/productItem";
import "./styles.scss";

const render = () => {
  const products = [
    {
      id: 1,
      name: "The Minimalist Entrepreneur",
      averageRating: 3,
    },
  ];

  const app = document.querySelector("#app");
  const productsList = document.querySelector("#products-list");

  products.forEach(({ id, name, averageRating }) => {
    productsList.appendChild(
      productItem({
        href: `/product.html?id=${id}`,
        name,
        averageRating,
      }),
    );
  });

  app.classList.remove("hidden");
};

render();
