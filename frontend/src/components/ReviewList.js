import { useEffect, useState } from "react";
import { ReviewItem } from "./ReviewItem";

export const ReviewList = ({ newReviews, prependNewItems }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (prependNewItems) {
      setReviews((existingReviews) => [...newReviews, ...existingReviews]);
    } else {
      setReviews((existingReviews) => [...existingReviews, ...newReviews]);
    }
  }, [newReviews, prependNewItems]);

  return reviews.map((review) => <ReviewItem key={review.id} {...review} />);
};
