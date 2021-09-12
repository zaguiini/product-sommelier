const Star = ({ onClick, active }) => {
  const className = [
    "w-6 h-6 fill-current",
    active ? "text-yellow-400" : "text-gray-200",
    onClick ? "cursor-pointer" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      onClick={onClick}
    >
      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
    </svg>
  );
};

const ratingSlots = new Array(5).fill(1);

export const Rating = ({ amount, onClick }) => (
  <div className="flex justify-center items-center">
    <div className="flex items-center">
      {ratingSlots.map((_, current) => (
        <Star
          key={current}
          active={amount > current}
          onClick={onClick ? () => onClick(current + 1) : undefined}
        />
      ))}
    </div>
  </div>
);
