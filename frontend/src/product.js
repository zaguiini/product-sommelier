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
  reviews: initialReviews,
}) => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [averageRating, setAverageRating] = useState(initialAverageRating);
  const [reviews, setReviews] = useState(initialReviews);

  const submitReview = async (reviewForSubmission) => {
    try {
      const addedReview = await addReview({
        ...reviewForSubmission,
        productId: id,
      });

      setReviews((existingReviews) => [addedReview, ...existingReviews]);
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
    <div className="flex justify-center">
      <div className="flex-1 max-w-2xl mt-24 px-4 w-full">
        <ProductInformation
          name={name}
          averageRating={averageRating}
          showAddReviewButton={!showReviewForm}
          onAddReviewClick={handleAddReviewClick}
        />
        <hr className="my-6" />
        {showReviewForm && <ReviewForm onSubmit={submitReview} />}
        <ReviewList reviews={reviews} />
      </div>
    </div>
  );
};

const render = async ({ productId }) => {
  const product = await fetchProduct({ id: productId });

  document.title = product.name + " - " + document.title;

  const app = document.querySelector("#app");

  ReactDOM.render(
    <Product
      id={product.id}
      name={product.name}
      averageRating={product.averageRating}
      reviews={product.reviews}
    />,
    app,
  );
};

render({
  productId: getProductId(),
});
