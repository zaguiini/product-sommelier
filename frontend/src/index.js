import { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import { ProductItem } from "./components/ProductItem";
import { fetchProducts } from "./services/products";
import "./styles.scss";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts()
      .then((fetchedProducts) => {
        setProducts(fetchedProducts);
      })
      .catch(() => {
        alert("Failed to fetch products");
      });
  }, []);

  return (
    <div className="flex justify-center">
      <main className="flex-1 max-w-2xl mt-24 px-4 w-full">
        <h1 className="text-4xl font-bold">Products</h1>
        <hr className="my-6" />
        <ul id="products-list" className="mt-3">
          {products.map(({ id, name, averageRating }) => (
            <ProductItem
              key={id}
              name={name}
              href={`/product.html?id=${id}`}
              averageRating={averageRating}
            />
          ))}
        </ul>
      </main>
    </div>
  );
};

const render = async () => {
  const app = document.querySelector("#app");

  ReactDOM.render(<Products />, app);
};

render();
