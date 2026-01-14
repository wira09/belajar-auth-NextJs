// Menandakan bahwa ini adalah Client Component, yang berarti akan dirender di sisi klien (browser)
"use client";

// Impor hook useFormState dari react-dom untuk mengelola state form
import { useFormState } from "react-dom";
// Impor komponen Link dari Next.js untuk navigasi
import Link from "next/link";
// Impor server action 'signInCredentials' untuk menangani proses login
import { signInCredentials } from "@/lib/actions";
// Impor komponen tombol login
import { LoginButton } from "@/components/button";


// Definisikan komponen FormLogin
const FormLogin = () => {
  // Gunakan hook useFormState untuk mengelola state form.
  // 'signInCredentials' adalah server action yang akan dipanggil saat form disubmit.
  // 'null' adalah state awal.
  // 'state' berisi status terakhir dari form (sukses, error, data).
  // 'formAction' adalah fungsi yang akan dipicu oleh atribut 'action' pada form.
  const [state, formAction] = useFormState(signInCredentials, null);

  return (
    // elemen form dengan server action dan styling
    <form action={formAction} className="space-y-5">
      {/* alert */}
      {/* Tampilkan pesan alert jika ada pesan dalam state */}
      {state?.message ? (
        <div
          className="p-4 mb-4 text-sm text-red-500 rounded-lg bg-red-100"
          role="alert"
        >
          <span className="font-medium">{state?.message}</span>
        </div>
      ) : null}

      {/* Input untuk Email */}
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
          // Mengisi kembali nilai email jika ada di state (misalnya, setelah submit gagal)
          defaultValue={state?.data?.email || ""}
          className="w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm
                 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
        />
        {/* Tampilkan pesan error validasi untuk field email */}
        <p className="mt-1 text-sm text-red-500">{state?.error?.email}</p>
      </div>

      {/* Input untuk Password */}
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
          // Mengisi kembali nilai password jika ada di state
          defaultValue={state?.data?.password || ""}
          className="w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm
                 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
        />
        {/* Tampilkan pesan error validasi untuk field password */}
        <p className="mt-1 text-sm text-red-500">{state?.error?.password}</p>
      </div>

      {/* Tombol untuk submit form */}
      <LoginButton />

      {/* Tautan untuk ke halaman registrasi */}
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

// Ekspor komponen FormLogin sebagai default
export default FormLogin;
