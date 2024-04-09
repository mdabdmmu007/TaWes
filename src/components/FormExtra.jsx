import React from "react";
import { Link } from "react-router-dom";

function FormExtra() {
  return (
    <div className="flex items-center justify-between ">
      <div className="flex items-center">
        <input
          id="remember-me"
          name="remember-me"
          type="checkbox"
          className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded cursor-pointer"
        />
        <label
          htmlFor="remember-me"
          className="ml-2 block text-sm text-purple-600 hover:text-purple-400 cursor-pointer"
        >
          Remember me
        </label>
      </div>

      <div className="text-sm">
        <Link
          to="/forgot-password"
          className="font-medium text-purple-600 hover:text-purple-400"
        >
          Forgot your password?
        </Link>
      </div>
    </div>
  );
}

export default FormExtra;
