export default function Cadastro() {
  return (
    <main style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Cadastro</h1>
      <form>
        <label>CPF:</label><br />
        <input type="text" placeholder="Digite seu CPF" /><br /><br />
        <label>Senha:</label><br />
        <input type="password" placeholder="Crie uma senha" /><br /><br />
        <button type="submit">Cadastrar</button>
      </form>
    </main>
  );
}
