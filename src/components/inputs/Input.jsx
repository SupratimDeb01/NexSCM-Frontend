
import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

const Input = ({ value, onChange, label, placeholder, type }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleOnClick = () => setShowPassword((prev) => !prev);

  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className="w-full mb-2">
      <label className="block font-semibold mb-1.5">{label}</label>
      <div className="relative">
        <input
          type={inputType}
          placeholder={placeholder}
          className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-300"
          value={value}
          onChange={onChange}
        />
        {isPassword && (
        <span
        className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
        onClick={toggleOnClick}
        >
            {showPassword ? <FaRegEye size={20}/> :  <FaRegEyeSlash size={20} />}
          </span>
        )}
      </div>
    </div>
  );
};

export default Input;
