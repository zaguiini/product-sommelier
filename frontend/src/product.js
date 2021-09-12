import "./styles.scss";
import ReactDOM from "react-dom";
import { getProductId } from "./getProductId";
import { text } from "./dom";
import { addReview, fetchProduct } from "./services/products";
import { ProductRating } from "./components/ProductRating";
import { ReviewForm } from "./components/ReviewForm";
import { ReviewList } from "./components/ReviewList";

const setProductTitle = (title) => {
  const productTitle = document.querySelector("#product-title");

  document.title = title + " - " + document.title;
  productTitle.appendChild(text(title));
};

const insertReviews = (reviews, { prependNewItems = false } = {}) => {
  const reviewsContainer = document.querySelector("#reviews-list");

  ReactDOM.render(
    <ReviewList newReviews={reviews} prependNewItems={prependNewItems} />,
    reviewsContainer,
  );
};

const setProductRating = (averageRating) => {
  const averageRatingContainer = document.querySelector("#average-rating");

  ReactDOM.render(
    <ProductRating rating={averageRating} />,
    averageRatingContainer,
  );
};

const render = async ({ productId }) => {
  const product = await fetchProduct({ id: productId });

  const app = document.querySelector("#app");
  const addReviewButton = document.querySelector("#add-review");
  const reviewForm = document.querySelector("#review-form");

  const submitReview = async (reviewForSubmission) => {
    try {
      const addedReview = await addReview({
        ...reviewForSubmission,
        productId,
      });

      toggleReviewForm();

      insertReviews([addedReview], { prependNewItems: true });
      setProductRating(addedReview.newAverageRating);
    } catch (e) {
      alert("Failed to add review. Please try again.");
    }
  };

  setProductTitle(product.name);
  setProductRating(product.averageRating);
  insertReviews(product.reviews);

  const toggleReviewForm = () => {
    if (reviewForm.classList.contains("hidden")) {
      ReactDOM.render(<ReviewForm onSubmit={submitReview} />, reviewForm);
      reviewForm.classList.remove("hidden");
    } else {
      ReactDOM.unmountComponentAtNode(reviewForm);
      reviewForm.classList.add("hidden");
    }

    addReviewButton.classList.toggle("hidden");
  };

  addReviewButton.addEventListener("click", toggleReviewForm);

  app.classList.remove("hidden");
};

render({
  productId: getProductId(),
});
