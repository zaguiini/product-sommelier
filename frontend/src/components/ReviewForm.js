import { useState } from "react";
import { RatingPicker } from "./RatingPicker";

export const ReviewForm = ({ onSubmit }) => {
  const [rating, setRating] = useState(3);
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      rating,
      description,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      id="review-form"
      className="flex flex-col items-start"
    >
      <h1 className="text-2xl font-bold">What's your rating?</h1>
      <div className="mt-4">
        <RatingPicker name="rating" onChange={setRating} value={rating} />
      </div>
      <textarea
        required
        minLength="30"
        name="description"
        className="self-start w-full my-4"
        placeholder="Tell us what you think about it..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <button className="px-4 py-2 bg-blue-600 rounded-md text-white outline-none focus:ring-4 flex self-start">
        Submit review
      </button>
      <hr className="my-6" />
    </form>
  );
};
