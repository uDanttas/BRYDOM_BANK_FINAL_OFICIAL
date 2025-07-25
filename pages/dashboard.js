import { useEffect, useState } from "react";
import Header from "../components/Header";

export default function Dashboard() {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("usuario");
    if (!userData) {
      window.location.href = "/login";
    } else {
      setUsuario(JSON.parse(userData));
    }
  }, []);

  if (!usuario) return <p>Carregando...</p>;

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
          <h1>Bem-vindo, {usuario.nome}</h1>
          <p><strong>Saldo:</strong> R${usuario.saldo?.toFixed(2) || 0}</p>
          <p><strong>Bots Ativados:</strong> {usuario.bots?.length || 0}</p>
          <button onClick={() => window.location.href = "/bots"}>Ver Bots</button>
          <button onClick={() => window.location.href = "/saque"}>Sacar</button>
          <button onClick={() => window.location.href = "/deposito"}>Depositar</button>
        </div>
      </main>
    </>
  );
}
