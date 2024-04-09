import React from "react";
import { Link } from "react-router-dom";

function Authentications({ symbol, text, linkUrl, onClick }) {
  return (
    <div className="flex">
      <Link to={linkUrl} className="flex items-center justify-center w-full">
        <button
          type="button"
          className="flex items-center justify-center w-full p-2 rounded-md text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          onClick={onClick}
        >
          {symbol}
          {text}
        </button>
      </Link>
    </div>
  );
}

export default Authentications;
