export default function AtivarBot() {
  return (
    <main style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Ativar Bot</h1>
      <form>
        <label>Saldo Operacional (mínimo R$50):</label><br />
        <input type="number" placeholder="Digite o valor" /><br /><br />
        <button type="submit">Ativar Bot</button>
      </form>
    </main>
  );
}
