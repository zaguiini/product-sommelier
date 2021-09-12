import { ReviewItem } from "./ReviewItem";

export const ReviewList = ({ reviews }) => {
  return (
    <section>
      <h2 className="text-xl font-bold">Reviews</h2>
      <ul className="mt-3">
        {reviews.map((review) => (
          <ReviewItem key={review.id} {...review} />
        ))}
      </ul>
    </section>
  );
};
