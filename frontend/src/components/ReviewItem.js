import { Rating } from "./Rating";

export const ReviewItem = ({ rating, description }) => {
  return (
    <li className="mb-6 leading-6 break-words">
      <div className="absolute">
        <Rating amount={rating} />
      </div>
      <span className="ml-2 font-bold" style={{ paddingLeft: "7.5rem" }}>
        {rating}
      </span>
      , <span className="text-gray-500">{description}</span>
    </li>
  );
};
