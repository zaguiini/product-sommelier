import { useEffect, useState } from "react";

import { ProductItem } from "../components/ProductItem";
import { fetchProducts } from "../services/products";

export const Products = () => {
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
              href={`/product?id=${id}`}
              averageRating={averageRating}
            />
          ))}
        </ul>
      </main>
    </div>
  );
};
