"use client";
import { useFormStatus } from "react-dom";

export const RegisterButton = () => {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium
               text-white uppercase hover:bg-blue-600 transition"
    >
      {pending ? "Registering.." : "Register"}
    </button>
  );
};
