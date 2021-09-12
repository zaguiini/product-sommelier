import { useLayoutEffect, useState } from "react";
import { ProductRating } from "./ProductRating";

export const ProductInformation = ({
  name,
  averageRating,
  onAddReviewClick,
  shouldShowAddReviewButton,
}) => {
  const [showAddReviewButton, setShowAddReviewButton] = useState(false);

  useLayoutEffect(() => {
    setShowAddReviewButton(shouldShowAddReviewButton);
  }, [shouldShowAddReviewButton]);

  const handleAddReviewClick = () => {
    setShowAddReviewButton(false);
    onAddReviewClick();
  };

  return (
    <header className="flex flex-col">
      <h1 className="text-4xl font-bold">{name}</h1>
      <div className="flex my-3 justify-between h-10">
        <div className="flex">
          <ProductRating rating={averageRating} />
        </div>
        {showAddReviewButton && (
          <button
            id="add-review"
            onClick={handleAddReviewClick}
            className="px-4 py-2 bg-blue-600 rounded-md text-white outline-none focus:ring-4 flex"
          >
            Add review
          </button>
        )}
      </div>
    </header>
  );
};
