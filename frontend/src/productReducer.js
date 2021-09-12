export const INSERT_PRODUCT_ACTION = "INSERT_PRODUCT_ACTION";
export const INSERT_REVIEW_ACTION = "INSERT_REVIEW_ACTION";

export const productReducer = (state, action) => {
  switch (action.type) {
    case INSERT_PRODUCT_ACTION:
      return action.payload;

    case INSERT_REVIEW_ACTION:
      const averageRating = action.payload.newAverageRating;

      return {
        ...state,
        reviews: [action.payload, ...state.reviews],
        averageRating,
      };

    default:
      return state;
  }
};
