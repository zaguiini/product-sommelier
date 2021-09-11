export const getProductId = () => {
  const urlSearchParams = new URLSearchParams(window.location.search);

  return urlSearchParams.get("id");
};
