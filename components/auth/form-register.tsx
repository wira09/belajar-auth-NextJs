import React from "react";
import Link from "next/link";

const FormRegister = () => {
  return (
    <form className="space-y-5">
      {/* Name */}
      <div>
        <label
          htmlFor="name"
          className="block mb-1 text-sm font-medium text-gray-700"
        >
          Name
        </label>
        <input
          id="name"
          type="text"
          name="name"
          placeholder="John Doe"
          className="w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm
                 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
        />
        <p className="mt-1 text-sm text-red-500">message</p>
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="block mb-1 text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="johndoe@gmail.com"
          className="w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm
                 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
        />
        <p className="mt-1 text-sm text-red-500">message</p>
      </div>

      {/* Password */}
      <div>
        <label
          htmlFor="password"
          className="block mb-1 text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          name="password"
          placeholder="••••••••"
          className="w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm
                 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
        />
        <p className="mt-1 text-sm text-red-500">message</p>
      </div>

      {/* Confirm Password */}
      <div>
        <label
          htmlFor="confirmPassword"
          className="block mb-1 text-sm font-medium text-gray-700"
        >
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          type="password"
          name="confirmPassword"
          placeholder="••••••••"
          className="w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm
                 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
        />
        <p className="mt-1 text-sm text-red-500">message</p>
      </div>

      {/* Button */}
      <button
        type="submit"
        className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium
               text-white uppercase hover:bg-blue-600 transition"
      >
        Register
      </button>

      {/* Link */}
      <p className="text-center text-sm text-gray-500">
        Already have an account?
        <Link
          href="/login"
          className="ml-1 font-medium text-blue-700 hover:text-blue-500"
        >
          Sign In
        </Link>
      </p>
    </form>
  );
};

export default FormRegister;
