// Dentro do bloco do Mestre
<div style={{ marginTop: "15px", display: "flex", gap: "10px", justifyContent: "center" }}>
  <button onClick={() => window.location.href = "/saque"}>Saque</button>
  <button onClick={() => window.location.href = "/deposito"}>Depósito</button>
  <button
    onClick={() => window.location.href = "/bhacanna"}
    style={{
      background: "#00ffcc",
      color: "#111",
      padding: "10px 20px",
      borderRadius: "8px",
      border: "none",
      cursor: "pointer",
      fontWeight: "bold",
    }}
  >
    Ver Bhacanna
  </button>
</div>
