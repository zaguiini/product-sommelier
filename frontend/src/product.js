import "./styles.scss";
import ReactDOM from "react-dom";
import { getProductId } from "./getProductId";
import { addReview, fetchProduct } from "./services/products";
import { ReviewForm } from "./components/ReviewForm";
import { ReviewList } from "./components/ReviewList";
import { ProductInformation } from "./components/ProductInformation";
import { useState } from "react";

const Product = ({
  id,
  name,
  averageRating: initialAverageRating,
  onReviewSubmission,
}) => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [averageRating, setAverageRating] = useState(initialAverageRating);

  const submitReview = async (reviewForSubmission) => {
    try {
      const addedReview = await addReview({
        ...reviewForSubmission,
        productId: id,
      });

      onReviewSubmission([addedReview], { prependNewItems: true });
      setAverageRating(addedReview.newAverageRating);
      setShowReviewForm(false);
    } catch (e) {
      alert("Failed to add review. Please try again.");
    }
  };

  const handleAddReviewClick = () => {
    setShowReviewForm(true);
  };

  return (
    <>
      <ProductInformation
        name={name}
        averageRating={averageRating}
        showAddReviewButton={!showReviewForm}
        onAddReviewClick={handleAddReviewClick}
      />
      <hr className="my-6" />
      {showReviewForm && <ReviewForm onSubmit={submitReview} />}
    </>
  );
};

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

  insertReviews(product.reviews);

  ReactDOM.render(
    <Product
      id={product.id}
      name={product.name}
      averageRating={product.averageRating}
      onReviewSubmission={insertReviews}
    />,
    productInformationContainer,
  );

  app.classList.remove("hidden");
};

render({
  productId: getProductId(),
});
