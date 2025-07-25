import { useState } from "react";
import { useRouter } from "next/router";

export default function Login() {
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cpf, senha }),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("usuario", JSON.stringify(data.usuario));
        router.push("/dashboard");
      } else {
        setMensagem(data.error || "Erro no login.");
      }
    } catch (error) {
      setMensagem("Erro ao conectar ao servidor.");
    }
  };

  return (
    <main style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Login</h1>
      {mensagem && <p style={{ color: "red" }}>{mensagem}</p>}
      <form onSubmit={handleLogin}>
        <label>CPF:</label><br />
        <input type="text" value={cpf} onChange={(e) => setCpf(e.target.value)} required /><br />
        <label>Senha:</label><br />
        <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required /><br /><br />
        <button type="submit">Entrar</button>
      </form>
    </main>
  );
}
