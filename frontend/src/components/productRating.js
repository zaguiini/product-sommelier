import { Rating } from "./Rating";

export const ProductRating = ({ rating, small }) => {
  const numberClassName = [
    small ? "text-xl" : "text-3xl",
    "mr-2 flex items-center",
  ].join(" ");

  return (
    <div className="flex">
      <div className={numberClassName}>
        {rating % 1 === 0 ? rating : rating.toFixed(2)}
      </div>
      <Rating amount={rating} />
    </div>
  );
};
