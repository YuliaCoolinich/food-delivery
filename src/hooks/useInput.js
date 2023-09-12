import { useState } from "react";

const useInput = (validateInput) => {
  const [value, setValue] = useState('');
  const [isTouched, setIsTouched] = useState(false);

  const isValid = validateInput(value);
  const showError = !isValid && isTouched;

  const onBlur = () => {
    setIsTouched(true);
  };

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const reset = () => {
    setIsTouched(false);
    setValue('');
  };

  return {
    value,
    isTouched,
    isValid,
    showError,
    onBlur,
    onChange,
    reset,
  };
};

export default useInput;
