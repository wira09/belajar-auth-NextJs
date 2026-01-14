// Menandakan bahwa ini adalah Client Component, yang akan dirender di sisi klien
"use client";
// Impor hook useFormStatus dari react-dom untuk mendapatkan status dari form submission
import { useFormStatus } from "react-dom";

// Definisikan komponen LoginButton
export const LoginButton = () => {
  // Dapatkan status 'pending' dari form terdekat di atas komponen ini
  // 'pending' akan bernilai true saat form sedang disubmit, dan false sebaliknya
  const { pending } = useFormStatus();

  return (
    <button
      type="submit" // Tipe tombol adalah submit untuk mengirim form
      disabled={pending} // Tombol dinonaktifkan jika form sedang dalam proses (pending)
      className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium
               text-white uppercase hover:bg-blue-600 transition"
    >
      {/* Teks tombol berubah berdasarkan status 'pending' */}
      {pending ? "Authenticating.." : "Sign In"}
    </button>
  );
};

// Definisikan komponen RegisterButton
export const RegisterButton = () => {
  // Dapatkan status 'pending' dari form
  const { pending } = useFormStatus();

  return (
    <button
      type="submit" // Tipe tombol adalah submit
      disabled={pending} // Tombol dinonaktifkan saat proses registrasi
      className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium
               text-white uppercase hover:bg-blue-600 transition"
    >
      {/* Teks tombol berubah berdasarkan status 'pending' */}
      {pending ? "Registering.." : "Register"}
    </button>
  );
};
