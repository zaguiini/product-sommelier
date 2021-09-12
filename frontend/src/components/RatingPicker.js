import { Rating } from "./Rating";

export const RatingPicker = ({ name, onChange, value }) => (
  <>
    <input type="hidden" name={name} value={value} />
    <Rating onClick={onChange} amount={value} />
  </>
);
