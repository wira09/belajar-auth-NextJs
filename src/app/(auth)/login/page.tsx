import FormLogin from "@/components/auth/form-login";

// jadi pada saat login dia tidak bisa redirect /login

import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { GoogleButton } from "@/components/auth/social-button";

const Login = async () => {
  const session = await auth();
  if (session) redirect("/dashboard");
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold text-gray-900">Sign In your account</h1>
      <FormLogin />
      <div className="my-4 flex items-center before:content-[''] before:flex-1 before:border-t before:border-gray-300 after:content-[''] after:flex-1 after:border-t after:border-gray-300">
        <p className="mx-4 mb-0 text-center font-semibold text-gray-600">Or</p>
      </div>
      <GoogleButton />
    </div>
  );
};

export default Login;
