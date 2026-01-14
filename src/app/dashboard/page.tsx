// jadi pada saat belum login dia tidak bisa redirect /dashboard
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const Dashboard = async () => {
  const session = await auth();
  if (!session) redirect("/login");

  return (
    <div className="max-w-screen-xl mx-auto py-6 p-4">
      <div className="text-2xl">Dashboard</div>
      <h2 className="text-xl">
        Welcome Back : <span className="font-bold">{session?.user?.name}</span>
      </h2>
    </div>
  );
};

export default Dashboard;
