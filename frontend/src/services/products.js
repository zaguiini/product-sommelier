export const getAPIUri = () => process.env.API_URI || "";

export const fetchProducts = () => {
  return fetch(`${getAPIUri()}/products`).then((r) => r.json());
};

export const fetchProduct = ({ id }) => {
  return fetch(`${getAPIUri()}/products/${id}`).then((r) => r.json());
};

export const addReview = ({ productId, rating, description }) => {
  return fetch(`${getAPIUri()}/products/${productId}/reviews`, {
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
