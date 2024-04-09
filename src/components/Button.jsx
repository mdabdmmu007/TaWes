import React from "react";

function Button({ onClick, children }) {
  return (
    <button
      className=" mx-auto relative min-w-10 py-1.5 px-10 mobile:px-14 border border-transparent text-md font-semibold rounded-md text-black bg-neutral-300 hover:bg-neutral-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-400"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
