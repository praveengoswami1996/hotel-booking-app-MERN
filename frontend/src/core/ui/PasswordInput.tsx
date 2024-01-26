import { ChangeEventHandler, useState } from "react";
import { twMerge } from "tailwind-merge";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";

type PasswordInputProps = {
    label?: string;
    placeholder?: string;
    className?: string;
    value: string;
    onChange: ChangeEventHandler<HTMLInputElement>
    error?: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ value, onChange, label, className, placeholder, error }) => {
  const [type, setType] = useState<string>("password");

  const Icon = type === "password" ? FaEye : FaEyeSlash ;

  const handleClick = () => {
    const currentType = type === "password" ? "text": "password";
    setType(currentType); 
  }

  return (
    <label className="text-gray-700 text-sm font-bold w-full flex flex-col gap-1">
      <span>{label}</span>
      <div className="w-full relative">
        <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={twMerge(
            "border w-full py-2.5 pl-3 pr-10 text-sm font-normal",
            className
            )}
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center">
            <button type="button" onClick={handleClick}>
                <Icon className="text-lg text-gray-500"/>
            </button>
        </div>
      </div>
      <span className="h-4 text-red-600 text-xs font-bold last:gap-0">
        {error}
      </span>
    </label>
  );
};

export default PasswordInput;
