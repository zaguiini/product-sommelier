import { ProductRating } from "./ProductRating";

export const ProductItem = ({ href, name, averageRating }) => {
  return (
    <a
      href={href}
      className="text-xl font-bold flex justify-between items-center mb-4"
    >
      {name}
      <ProductRating rating={averageRating} small />
    </a>
  );
};
