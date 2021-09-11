import "./styles.scss";
import { rating } from "./components/rating";
import { getProductId } from "./getProductId";
import { review as reviewComponent } from "./components/review";
import { text } from "./dom";
import { addReview, fetchProduct } from "./services/products";
import { productRating } from "./components/productRating";

const render = async ({ productId }) => {
  const product = await fetchProduct({ id: productId });

  const app = document.querySelector("#app");
  const averageRatingContainer = document.querySelector("#average-rating");
  const addReviewButton = document.querySelector("#add-review");
  const reviewForm = document.querySelector("#review-form");
  const productTitle = document.querySelector("#product-title");
  const ratingPicker = document.querySelector("#rating-picker");
  const ratingFormItem = document.querySelector("#review-form [name=rating]");

  const toggleReviewForm = () => {
    addReviewButton.classList.toggle("hidden");
    reviewForm.classList.toggle("hidden");
  };

  addReviewButton.addEventListener("click", toggleReviewForm);

  reviewForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    addReview({
      productId,
      rating: parseInt(formData.get("rating"), 10),
      description: formData.get("description"),
    })
      .then((addedReview) => {
        toggleReviewForm();

        reviewsContainer.prepend(reviewComponent(addedReview));

        averageRatingContainer.replaceChildren(
          productRating({
            rating: addedReview.newAverageRating,
          }),
        );
      })
      .catch(() => {
        alert("Failed to add review.");
      });
  });

  const onRatingPickerClick = (pickedRating) => {
    ratingFormItem.value = pickedRating;

    ratingPicker.firstChild.remove();

    ratingPicker.appendChild(
      rating({ amount: pickedRating, click: onRatingPickerClick }),
    );
  };

  ratingPicker.appendChild(
    rating({ amount: ratingFormItem.value, click: onRatingPickerClick }),
  );

  document.title = product.name + " - " + document.title;

  productTitle.appendChild(text(product.name));

  const reviewsContainer = document.querySelector("#reviews-list");

  product.reviews.forEach((review) => {
    const reviewNode = reviewComponent(review);
    reviewsContainer.appendChild(reviewNode);
  });

  averageRatingContainer.appendChild(
    productRating({
      rating: product.averageRating,
    }),
  );

  app.classList.remove("hidden");
};

render({
  productId: getProductId(),
});
