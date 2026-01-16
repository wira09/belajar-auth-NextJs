import { IoLogoGoogle } from "react-icons/io5";
import { signIn } from "@/auth";

export const GoogleButton = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google", { redirectTo: "/dashboard" });
      }}
    >
      <button
        type="submit"
        className="flex items-center justify-center gap-2 py-2.5 rounded-lg uppercase text-white text-sm bg-blue-500 hover:bg-blue-600 transition w-full"
      >
        <IoLogoGoogle className="text-lg" />
        Sign In with Google
      </button>
    </form>
  );
};
