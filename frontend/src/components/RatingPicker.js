import { useEffect, useRef } from "react";
import { rating } from "./rating";

export const RatingPicker = ({ name, onChange, value }) => {
  const ratingNode = useRef();

  useEffect(() => {
    if (ratingNode.current) {
      ratingNode.current.replaceChildren(
        rating({
          amount: value,
          click: onChange,
        }),
      );
    }
  }, [onChange, value]);

  return (
    <>
      <input type="hidden" name={name} value={value} />
      <div ref={ratingNode} />
    </>
  );
};
