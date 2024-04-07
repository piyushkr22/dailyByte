import React from "react";

export default function Button({
  children,
  type = "button",
  bgColor = "bg-blue-800",
  textColor = "text-white",
  className = "",
  ...props
}) {
  return (
    <button
      className={`px-4 py-2 hover:cursor-pointer hover:bg-cyan-400 text-white rounded-lg hover:text-gray-800 hover:font-bold transition duration-200 shadow-lg ${bgColor} ${textColor} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
