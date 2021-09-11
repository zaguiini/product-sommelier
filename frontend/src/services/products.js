export const fetchProducts = () => {
  return fetch(`${process.env.API_URI}/products`).then((r) => r.json());
};

export const fetchProduct = ({ id }) => {
  return fetch(`${process.env.API_URI}/products/${id}`).then((r) => r.json());
};

export const addReview = ({ productId, rating, description }) => {
  return fetch(`${process.env.API_URI}/products/${productId}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "Application/JSON",
    },
    body: JSON.stringify({
      rating,
      description,
    }),
  }).then((r) => r.json());
};
