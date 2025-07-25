import Link from "next/link";
import "../styles/globals.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <div>
      <nav>
        <Link href="/login">Login</Link>
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/saque">Saque</Link>
        <Link href="/deposito">Depósito</Link>
        <Link href="/mestre">Mestre</Link>
        <Link href="/bhacanna">Bhacanna</Link>
        <Link href="/bots">Bots</Link>
      </nav>
      <main>
        <Component {...pageProps} />
      </main>
    </div>
  );
}
