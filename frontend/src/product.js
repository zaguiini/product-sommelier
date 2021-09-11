import "./styles.scss";
import { rating } from "./components/rating";
import { getProductId } from "./getProductId";
import { review as reviewComponent } from "./components/review";
import { text } from "./dom";
import { addReview, fetchProduct } from "./services/products";
import { productRating } from "./components/productRating";

const DEFAULT_PICKER_VALUE = 3;

const setProductTitle = (title) => {
  const productTitle = document.querySelector("#product-title");

  document.title = title + " - " + document.title;
  productTitle.appendChild(text(title));
};

const insertReviews = (reviews, { prepend = false } = {}) => {
  const reviewsContainer = document.querySelector("#reviews-list");

  reviews.forEach((review) => {
    const reviewNode = reviewComponent(review);
    reviewsContainer[prepend ? "prepend" : "appendChild"](reviewNode);
  });
};

const setProductRating = (averageRating) => {
  const averageRatingContainer = document.querySelector("#average-rating");

  averageRatingContainer.replaceChildren(
    productRating({
      rating: averageRating,
    }),
  );
};

const setRatingPickerOnForm = (defaultPickerValue) => {
  const ratingPicker = document.querySelector("#rating-picker");
  const ratingFormItem = document.querySelector("#review-form [name=rating]");

  const onRatingPickerClick = (pickedRating) => {
    ratingFormItem.value = pickedRating;

    ratingPicker.replaceChildren(
      rating({ amount: ratingFormItem.value, click: onRatingPickerClick }),
    );
  };

  onRatingPickerClick(defaultPickerValue);
};

const render = async ({ productId }) => {
  const product = await fetchProduct({ id: productId });

  const app = document.querySelector("#app");
  const addReviewButton = document.querySelector("#add-review");
  const reviewForm = document.querySelector("#review-form");

  setProductTitle(product.name);
  setProductRating(product.averageRating);
  insertReviews(product.reviews);

  const toggleReviewForm = () => {
    reviewForm.reset();
    setRatingPickerOnForm(DEFAULT_PICKER_VALUE);

    addReviewButton.classList.toggle("hidden");
    reviewForm.classList.toggle("hidden");
  };

  addReviewButton.addEventListener("click", toggleReviewForm);

  reviewForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      const addedReview = await addReview({
        productId,
        rating: parseInt(formData.get("rating"), 10),
        description: formData.get("description"),
      });

      toggleReviewForm();

      insertReviews([addedReview], { prepend: true });
      setProductRating(addedReview.newAverageRating);
    } catch (e) {
      alert("Failed to add review. Please try again.");
    }
  });

  app.classList.remove("hidden");
};

render({
  productId: getProductId(),
});
