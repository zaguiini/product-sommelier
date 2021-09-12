export const getProductId = (queryParams) => {
  const urlSearchParams = new URLSearchParams(queryParams);

  return urlSearchParams.get("id");
};
