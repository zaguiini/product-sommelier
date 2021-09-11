import { productItem } from "./components/productItem";
import { fetchProducts } from "./services/products";
import "./styles.scss";

const render = async () => {
  const products = await fetchProducts();

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
