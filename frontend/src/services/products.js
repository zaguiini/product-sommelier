export const fetchProducts = () => {
  return fetch(`${process.env.API_URI}/products`).then((r) => r.json());
};

export const fetchProduct = ({ id }) => {
  return fetch(`${process.env.API_URI}/products/${id}`).then((r) => r.json());
};
