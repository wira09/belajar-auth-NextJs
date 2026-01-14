// Impor pustaka dan modul yang diperlukan
import NextAuth from "next-auth"; // Pustaka utama NextAuth
import { PrismaAdapter } from "@auth/prisma-adapter"; // Adapter untuk menghubungkan NextAuth dengan Prisma
import { prisma } from "./lib/prisma"; // Instance Prisma client
import Credentials from "next-auth/providers/credentials"; // Penyedia otentikasi berbasis kredensial (email/password)
import { SignInSchema } from "@/lib/zod"; // Skema validasi Zod untuk data login
import { compareSync } from "bcrypt-ts"; // Fungsi untuk membandingkan hash password

// Konfigurasi utama NextAuth
export const { handlers, signIn, signOut, auth } = NextAuth({
  // Menggunakan PrismaAdapter untuk menyimpan data sesi dan pengguna ke database melalui Prisma
  adapter: PrismaAdapter(prisma),
  // Mengatur strategi sesi menjadi JSON Web Tokens (JWT)
  session: { strategy: "jwt" },
  // Mendefinisikan halaman kustom untuk proses otentikasi
  pages: {
    signIn: "/login", // Mengarahkan pengguna ke halaman /login untuk sign-in
  },
  // Daftar penyedia otentikasi yang digunakan
  providers: [
    // Menggunakan penyedia 'Credentials' untuk login dengan email dan password
    Credentials({
      // Definisikan field yang diharapkan untuk kredensial
      credentials: {
        email: {},
        password: {},
      },
      // Fungsi 'authorize' untuk memvalidasi kredensial pengguna
      authorize: async (credentials) => {
        // Validasi input kredensial menggunakan skema Zod
        const validateFields = SignInSchema.safeParse(credentials);

        // Jika validasi gagal, kembalikan null (otentikasi gagal)
        if (!validateFields.success) {
          return null;
        }

        // Baris ini tampaknya tidak melakukan apa-apa dan bisa dihapus
        const { } = validateFields.data;

        // Ekstrak email dan password dari data yang tervalidasi
        const { email, password } = validateFields.data;

        // Cari pengguna di database berdasarkan email
        const user = await prisma.user.findUnique({
          where: { email },
        });

        // Jika pengguna tidak ditemukan atau tidak memiliki password, lempar error
        if (!user || !user.password) {
          throw new Error("No user found");
        }

        // Bandingkan password yang diberikan dengan hash password di database
        const passwordMath = compareSync(password, user.password);

        // Jika password tidak cocok, kembalikan null (otentikasi gagal)
        if (!passwordMath) return null;

        // Jika otentikasi berhasil, kembalikan objek pengguna
        return user;
      },
    }),
  ],
  // Callbacks untuk mengontrol alur otentikasi
  callbacks: {
    // Callback 'jwt' dipanggil setiap kali JWT dibuat atau diperbarui
    jwt({ token, user }) {
      // Jika objek 'user' ada (saat login pertama), tambahkan peran (role) pengguna ke dalam token
      if (user) token.role = user.role;
      // Kembalikan token yang telah dimodifikasi
      return token;
    },

    // Callback 'session' dipanggil setiap kali sesi diakses
    session({ session, token }) {
      // Tambahkan 'id' pengguna dari token (sub) ke objek sesi
      session.user.id = token.sub;
      // Tambahkan 'role' pengguna dari token ke objek sesi
      session.user.role = token.role;
      // Kembalikan sesi yang telah dimodifikasi
      return session;
    }
  }
});
