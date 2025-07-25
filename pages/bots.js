import { useState, useEffect } from "react";
import Header from "../components/Header";

export default function Bots() {
  const [botsClientes, setBotsClientes] = useState([]);
  const [lucroBhacanna, setLucroBhacanna] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarDados();
    const interval = setInterval(carregarDados, 10000);
    return () => clearInterval(interval);
  }, []);

  const carregarDados = async () => {
    try {
      const res = await fetch("/api/bots");
      const data = await res.json();
      if (res.ok) {
        setBotsClientes(data.botsClientes || []);
        setLucroBhacanna(data.bhacanna?.lucroTotal || 0);
      }
    } catch (err) {
      console.error("Erro ao carregar bots:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main style={{ padding: "20px" }}>
        <h1>Bots em Operação</h1>
        <p>
          <strong>Lucro Total dos 3.000 Bhacanna:</strong> R$
          {lucroBhacanna.toFixed(2)}
        </p>
        {loading ? (
          <p>Carregando...</p>
        ) : (
          <>
            <h2>Bots dos Clientes</h2>
            {botsClientes.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Usuário</th>
                    <th>Saldo Operacional</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {botsClientes.map((bot) => (
                    <tr key={bot.id}>
                      <td>{bot.id}</td>
                      <td>{bot.usuario?.nome || "Desconhecido"}</td>
                      <td>R${bot.saldoOperacional.toFixed(2)}</td>
                      <td>{bot.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>Nenhum bot de cliente ativo.</p>
            )}
          </>
        )}
      </main>
    </>
  );
}
