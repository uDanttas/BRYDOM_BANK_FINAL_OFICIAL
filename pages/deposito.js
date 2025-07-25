import Header from "../components/Header";
import { useState } from "react";

export default function Deposito() {
  const [valor, setValor] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleDeposito = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/deposito", {
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
          <h1>Depósito</h1>
          {mensagem && <p>{mensagem}</p>}
          <form onSubmit={handleDeposito}>
            <input
              type="number"
              placeholder="Valor do depósito"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              style={{ width: "100%" }}
            />
            <button style={{ width: "100%", marginTop: "10px" }}>
              Depositar
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
