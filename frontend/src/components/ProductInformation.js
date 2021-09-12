import { ProductRating } from "./ProductRating";

export const ProductInformation = ({
  name,
  averageRating,
  onAddReviewClick,
  showAddReviewButton,
}) => {
  return (
    <header className="flex flex-col">
      <h1 className="text-4xl font-bold">{name}</h1>
      <div className="flex my-3 justify-between h-10">
        <ProductRating rating={averageRating} />
        {showAddReviewButton && (
          <button
            id="add-review"
            onClick={onAddReviewClick}
            className="px-4 py-2 bg-blue-600 rounded-md text-white outline-none focus:ring-4 flex"
          >
            Add review
          </button>
        )}
      </div>
    </header>
  );
};
