import Header from "../components/Header";
import { useState } from "react";

export default function Saque() {
  const [valor, setValor] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleSaque = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/saque", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ valor: parseFloat(valor) }),
    });
    const data = await res.json();
    setMensagem(data.message || data.error);
  };

  return (
    <>
      <Header />
      <main style={{ maxWidth: "500px", margin: "20px auto" }}>
        <div style={{
          background: "#111",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0 0 20px rgba(0, 255, 204, 0.2)"
        }}>
          <h1>Saque</h1>
          {mensagem && <p>{mensagem}</p>}
          <form onSubmit={handleSaque}>
            <input
              type="number"
              placeholder="Valor do saque"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              style={{ width: "100%" }}
            />
            <button style={{ width: "100%", marginTop: "10px" }}>
              Sacar
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
