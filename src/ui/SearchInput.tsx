import React, { Dispatch, SetStateAction } from "react";
import Input from "./Input";

function SearchInput({
  text,
  setText,
  placeholderText,
}: {
  text: string;
  setText: Dispatch<SetStateAction<string>>;
  placeholderText: string;
}) {
  return (
    <Input
      placeholder={placeholderText}
      value={text}
      onChange={(e) => setText(e.target.value)}
      type="text"
    />
  );
}

export default SearchInput;
