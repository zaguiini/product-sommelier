export const fetchProducts = () => {
  return fetch(`${process.env.API_URI}/products`).then((r) => r.json());
};
