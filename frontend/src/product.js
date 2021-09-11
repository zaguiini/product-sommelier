import "./styles.scss";
import { rating } from "./components/rating";
import { getProductId } from "./getProductId";
import { ratingNumber } from "./components/ratingNumber";
import { review as reviewComponent } from "./components/review";
import { text } from "./dom";
import { fetchProduct } from "./services/products";

const render = async ({ productId }) => {
  const product = await fetchProduct({ id: productId });

  const app = document.querySelector("#app");
  const averageRatingContainer = document.querySelector("#average-rating");
  const addReviewButton = document.querySelector("#add-review");
  const reviewForm = document.querySelector("#review-form");
  const productTitle = document.querySelector("#product-title");
  const ratingPicker = document.querySelector("#rating-picker");
  const ratingFormItem = document.querySelector("#review-form [name=rating]");

  addReviewButton.addEventListener("click", () => {
    addReviewButton.classList.add("hidden");
    reviewForm.classList.remove("hidden");
  });

  reviewForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    console.log({
      rating: parseInt(formData.get("rating"), 10),
      description: formData.get("description"),
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
    ratingNumber({ rating: product.averageRating }),
  );
  averageRatingContainer.appendChild(rating({ amount: product.averageRating }));

  app.classList.remove("hidden");
};

render({
  productId: getProductId(),
});
