import FormLogin from "@/components/auth/form-login";
// jadi pada saat login dia tidak bisa redirect /login
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const Login = async () => {
  const session = await auth();
  if (session) redirect("/dashboard");
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold text-gray-900">Sign In your account</h1>
      <FormLogin />
    </div>
  );
};

export default Login;
