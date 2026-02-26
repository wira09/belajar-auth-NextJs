// Impor komponen dan fungsi yang diperlukan dari Next.js dan auth.ts
import Link from "next/link";
import Image from "next/image";
import { auth, signOut } from "@/auth";

// Definisikan komponen fungsional async 'navbar'
const navbar = async () => {
  // Ambil data sesi pengguna menggunakan fungsi auth()
  const session = await auth();

  // Kembalikan JSX untuk render komponen navbar
  return (
    // Kontainer utama navbar dengan gaya latar belakang putih dan garis bawah abu-abu
    <nav className="bg-white border-gray-200 border-b">
      {/* Kontainer untuk memusatkan dan membatasi lebar konten */}
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        {/* Tautan ke halaman utama yang berisi logo */}
        <Link href="/">
          <Image
            src={"/gambar/logo.jpeg"}
            alt="Logo"
            width={60}
            height={36}
            priority // Prioritaskan pemuatan gambar ini
          />
        </Link>
        {/* menu */}
        {/* Kontainer untuk menu navigasi dan tombol-tombol */}
        <div className="flex items-center gap-3">
          {/* Daftar menu utama, disembunyikan di layar kecil */}
          <ul className="hidden md:flex items-center gap-4 mr-5 font-semibold text-gray-600 hover:text-gray-800">
            <li>
              {/* Tautan ke halaman utama */}
              <Link href={"/"}>Home</Link>
            </li>
            {/* menu ini akan tampil setelah login */}
            {/* Tampilkan menu tambahan jika pengguna sudah login */}
            {session && (
              <>
                <li>
                  {/* Tautan ke halaman produk */}
                  <Link href={"/product"}>Products</Link>
                </li>
                <li>
                  {/* Tautan ke halaman dashboard */}
                  <Link href={"/dashboard"}>Dashboard</Link>
                </li>
                {/* Tampilkan menu 'Users' hanya jika peran pengguna adalah 'admin' */}
                {session.user.role === "admin" ? (
                  <li>
                    <Link href={"/user"}>Users</Link>
                  </li>
                ) : null}
              </>
            )}
          </ul>
          {/* Tampilkan informasi pengguna jika sudah login */}
          {session && (
            <div className="flex gap-3 items-center">
              {/* Kontainer untuk menampilkan nama dan peran pengguna */}
              <div className="flex flex-col justify-center -space-y-1">
                <span className="font-semibold text-gray-500 text-right capitalize">
                  {/* Tampilkan nama pengguna */}
                  {session.user.name}
                </span>
                <span className="font-xs text-gray-400 text-right capitalize">
                  {/* Tampilkan peran pengguna */}
                  {session.user.role}
                </span>
              </div>
              {/* Tombol dengan gambar avatar pengguna */}
              <button
                type="button"
                className="text-sm ring-2 bg-gray-100 rounded-full"
              >
                <Image
                  // Gunakan gambar pengguna jika ada, jika tidak gunakan avatar default
                  src={session.user.image || "/gambar/avatar.svg"}
                  alt="avatar"
                  width={64}
                  height={64}
                  className="w-8 h-8 rounded-full"
                ></Image>
              </button>
            </div>
          )}
          {/* Tampilkan tombol 'Sign Out' jika pengguna sudah login, jika tidak tampilkan tombol 'Sign In' */}
          {session ? (
            // Form untuk proses sign out
            <form
              action={async () => {
                "use server"; // Menandakan bahwa ini adalah server action
                // Panggil fungsi signOut dan arahkan pengguna ke halaman login
                await signOut({ redirectTo: "/login" });
              }}
            >
              <button
                type="submit"
                className="bg-red-400 text-white px-4 py-2 rounded-md hover:bg-red-500"
              >
                Sign Out
              </button>
            </form>
          ) : (
            // Tautan ke halaman login jika pengguna belum login
            <Link
              href="/login"
              className="bg-red-400 text-white px-4 py-2 rounded-md hover:bg-red-500"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

// Ekspor komponen navbar sebagai default
export default navbar;
