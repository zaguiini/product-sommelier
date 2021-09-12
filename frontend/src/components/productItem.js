import { Link } from "react-router-dom";
import { ProductRating } from "./ProductRating";

export const ProductItem = ({ href, name, averageRating }) => {
  return (
    <Link
      to={href}
      className="text-xl font-bold flex justify-between items-center mb-4"
    >
      {name}
      <ProductRating rating={averageRating} small />
    </Link>
  );
};
