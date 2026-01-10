"use client";

import { useFormState } from "react-dom";
import Link from "next/link";
import { signUpCredentials } from "@/lib/actions";
import { RegisterButton } from "@/components/button";

const FormRegister = () => {
  const [state, formAction] = useFormState(signUpCredentials, null);
  return (
    <form action={formAction} className="space-y-5">
      {/* alert */}
      {state?.message ? (
        <div
          className="p-4 mb-4 text-sm text-red-500 rounded-lg bg-red-100"
          role="alert"
        >
          <span className="font-medium">{state?.message}</span>
        </div>
      ) : null}

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
          placeholder="Masukan nama anda"
          defaultValue={state?.data?.name || ""}
          className="w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm
                 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
        />
        <p className="mt-1 text-sm text-red-500">{state?.error?.name}</p>
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
          placeholder="Masukan email anda"
          defaultValue={state?.data?.email || ""}
          className="w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm
                 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
        />
        <p className="mt-1 text-sm text-red-500">{state?.error?.email}</p>
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
          defaultValue={state?.data?.password || ""}
          className="w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm
                 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
        />
        <p className="mt-1 text-sm text-red-500">{state?.error?.password}</p>
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
          defaultValue={state?.data?.confirmPassword || ""}
          className="w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm
                 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
        />
        <p className="mt-1 text-sm text-red-500">
          {state?.error?.confirmPassword}
        </p>
      </div>

      {/* Button */}
      <RegisterButton />

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
