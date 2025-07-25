export default function Header() {
  const logout = () => {
    localStorage.removeItem("usuarioCpf");
    window.location.href = "/login";
  };

  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 20px",
        background: "#000",
        color: "#00ffcc",
        boxShadow: "0 0 15px rgba(0, 255, 204, 0.2)",
      }}
    >
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <img
          src="/logo.png"
          alt="BryDom Bank"
          style={{ height: "40px", borderRadius: "8px" }}
        />
        <h2 style={{ margin: 0 }}>BryDom Bank</h2>
      </div>

      {/* Menu */}
      <nav style={{ display: "flex", gap: "15px" }}>
        <a href="/dashboard" style={{ color: "#00ffcc", textDecoration: "none" }}>
          Dashboard
        </a>
        <a href="/bots" style={{ color: "#00ffcc", textDecoration: "none" }}>
          Bots
        </a>
        <a href="/historico" style={{ color: "#00ffcc", textDecoration: "none" }}>
          Histórico
        </a>
        <a href="/saque" style={{ color: "#00ffcc", textDecoration: "none" }}>
          Saque
        </a>
        <a href="/deposito" style={{ color: "#00ffcc", textDecoration: "none" }}>
          Depósito
        </a>
        <a href="/mestre" style={{ color: "#00ffcc", textDecoration: "none" }}>
          Mestre
        </a>
        <a href="/bhacanna" style={{ color: "#00ffcc", textDecoration: "none" }}>
          Bhacanna
        </a>
      </nav>

      {/* Botão Logout */}
      <button
        onClick={logout}
        style={{
          background: "#00ffcc",
          color: "#111",
          border: "none",
          padding: "6px 12px",
          borderRadius: "6px",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </header>
  );
}
