import Header from "../components/Header";
import { useEffect, useState } from "react";

export default function Bhacanna() {
  const [lucro, setLucro] = useState(0);

  useEffect(() => {
    fetch("/api/bhacanna")
      .then((res) => res.json())
      .then((data) => setLucro(data.lucroTotal || 0));
  }, []);

  return (
    <>
      <Header />
      <main style={{ maxWidth: "800px", margin: "20px auto" }}>
        <div style={{
          background: "#111",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0 0 20px rgba(0, 255, 204, 0.2)"
        }}>
          <h1>Bhacanna - Bots do Mestre</h1>
          <p>Lucro acumulado: R${lucro.toFixed(2)}</p>
        </div>
      </main>
    </>
  );
}
