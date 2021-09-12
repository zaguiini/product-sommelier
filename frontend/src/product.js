import "./styles.scss";
import ReactDOM from "react-dom";
import { getProductId } from "./getProductId";
import { addReview, fetchProduct } from "./services/products";
import { ReviewForm } from "./components/ReviewForm";
import { ReviewList } from "./components/ReviewList";
import { ProductInformation } from "./components/ProductInformation";

const insertReviews = (reviews, { prependNewItems = false } = {}) => {
  const reviewsContainer = document.querySelector("#reviews-list");

  ReactDOM.render(
    <ReviewList newReviews={reviews} prependNewItems={prependNewItems} />,
    reviewsContainer,
  );
};

const render = async ({ productId }) => {
  const product = await fetchProduct({ id: productId });

  document.title = product.name + " - " + document.title;

  const app = document.querySelector("#app");
  const productInformationContainer = document.querySelector(
    "#product-information",
  );
  const reviewForm = document.querySelector("#review-form");

  const submitReview = async (reviewForSubmission) => {
    try {
      const addedReview = await addReview({
        ...reviewForSubmission,
        productId,
      });

      toggleReviewForm();

      insertReviews([addedReview], { prependNewItems: true });

      ReactDOM.render(
        <ProductInformation
          name={product.name}
          averageRating={addedReview.newAverageRating}
          onAddReviewClick={toggleReviewForm}
          shouldShowAddReviewButton
        />,
        productInformationContainer,
      );
    } catch (e) {
      alert("Failed to add review. Please try again.");
    }
  };

  insertReviews(product.reviews);

  const toggleReviewForm = () => {
    if (reviewForm.classList.contains("hidden")) {
      ReactDOM.render(<ReviewForm onSubmit={submitReview} />, reviewForm);
      reviewForm.classList.remove("hidden");
    } else {
      ReactDOM.unmountComponentAtNode(reviewForm);
      reviewForm.classList.add("hidden");
    }
  };

  ReactDOM.render(
    <ProductInformation
      name={product.name}
      averageRating={product.averageRating}
      onAddReviewClick={toggleReviewForm}
      shouldShowAddReviewButton
    />,
    productInformationContainer,
  );

  app.classList.remove("hidden");
};

render({
  productId: getProductId(),
});
