import React, { ChangeEvent, InputHTMLAttributes, useState } from "react";

const useFieldText = (): [string, (e: ChangeEvent<HTMLInputElement>) => void] => {
  const [value, setValue] = useState("");

  function valueHandler(e: ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  return [value, valueHandler];
};

export default useFieldText;
