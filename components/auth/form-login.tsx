"use client";

import { useFormState } from "react-dom";
import Link from "next/link";
import { signInCredentials } from "@/lib/actions";
import { LoginButton } from "@/components/button";


const FormLogin = () => {
  const [state, formAction] = useFormState(signInCredentials, null);
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

      {/* Button */}
      <LoginButton />

      {/* Link */}
      <p className="text-center text-sm text-gray-500">
        Don&apos;t have an account yet?
        <Link
          href="/register"
          className="ml-1 font-medium text-blue-700 hover:text-blue-500"
        >
          Register
        </Link>
      </p>
    </form>
  );
};

export default FormLogin;
