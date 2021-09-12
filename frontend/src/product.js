import "./styles.scss";
import ReactDOM from "react-dom";
import { getProductId } from "./getProductId";
import { addReview, fetchProduct } from "./services/products";
import { ReviewForm } from "./components/ReviewForm";
import { ReviewList } from "./components/ReviewList";
import { ProductInformation } from "./components/ProductInformation";
import { useEffect, useReducer, useState } from "react";
import {
  INSERT_PRODUCT_ACTION,
  INSERT_REVIEW_ACTION,
  productReducer,
} from "./productReducer";

const Product = ({ id }) => {
  const [product, dispatch] = useReducer(productReducer, null);
  const [showReviewForm, setShowReviewForm] = useState(false);

  useEffect(() => {
    fetchProduct({ id })
      .then((product) => {
        document.title = product.name + " - " + document.title;

        dispatch({
          type: INSERT_PRODUCT_ACTION,
          payload: product,
        });
      })
      .catch(() => {
        alert("Failed to fetch product.");
      });
  }, []);

  const submitReview = async (reviewForSubmission) => {
    try {
      const addedReview = await addReview({
        ...reviewForSubmission,
        productId: id,
      });

      dispatch({
        type: INSERT_REVIEW_ACTION,
        payload: addedReview,
      });

      setShowReviewForm(false);
    } catch (e) {
      alert("Failed to add review. Please try again.");
    }
  };

  const handleAddReviewClick = () => {
    setShowReviewForm(true);
  };

  if (!product) {
    return null;
  }

  return (
    <div className="flex justify-center">
      <div className="flex-1 max-w-2xl mt-24 px-4 w-full">
        <ProductInformation
          name={product.name}
          averageRating={product.averageRating}
          showAddReviewButton={!showReviewForm}
          onAddReviewClick={handleAddReviewClick}
        />
        <hr className="my-6" />
        {showReviewForm && <ReviewForm onSubmit={submitReview} />}
        <ReviewList reviews={product.reviews} />
      </div>
    </div>
  );
};

const render = async ({ productId }) => {
  const app = document.querySelector("#app");

  ReactDOM.render(<Product id={productId} />, app);
};

render({
  productId: getProductId(),
});
