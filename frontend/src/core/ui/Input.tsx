import { ChangeEventHandler } from "react";
import { twMerge } from "tailwind-merge";

type InputProps = {
    type?: string;
    label?: string;
    placeholder?: string;
    className?: string;
    value: string;
    onChange: ChangeEventHandler<HTMLInputElement>
    error?: string;
}

const Input: React.FC<InputProps>= ({ type="text", value, onChange, label, placeholder, className, error }) => {
  return (
    <label className="text-gray-700 text-sm font-bold w-full flex flex-col gap-1">
      <span>{ label }</span>
      <input 
        type={ type }
        value={value}
        onChange={onChange}
        placeholder={ placeholder}
        className={ twMerge("border rounded w-full py-2.5 px-2 text-sm  font-normal", className) }
      />
      <span className="h-4 text-red-600 text-xs font-bold last:gap-0">
        { error }
      </span>
    </label>
  );
};

export default Input;
