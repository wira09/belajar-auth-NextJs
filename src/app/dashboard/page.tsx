// jadi pada saat belum login dia tidak bisa redirect /dashboard

// Impor fungsi 'auth' dari konfigurasi otentikasi dan 'redirect' dari Next.js
import { auth } from "@/auth";
import { redirect } from "next/navigation";

// Definisikan komponen fungsional async 'Dashboard'
const Dashboard = async () => {
  // Ambil data sesi pengguna menggunakan fungsi auth()
  const session = await auth();
  
  // Jika tidak ada sesi (pengguna belum login), alihkan ke halaman login
  if (!session) redirect("/login");

  // Kembalikan JSX untuk render halaman dashboard
  return (
    // Kontainer utama dengan padding dan pembatas lebar maksimum
    <div className="max-w-screen-xl mx-auto py-6 p-4">
      {/* Judul halaman */}
      <div className="text-2xl">Dashboard</div>
      {/* Pesan selamat datang yang dipersonalisasi */}
      <h2 className="text-xl">
        {/* Menampilkan nama pengguna dari data sesi */}
        Welcome Back : <span className="font-bold">{session?.user?.name}</span>
      </h2>
    </div>
  );
};

// Ekspor komponen Dashboard sebagai default
export default Dashboard;
