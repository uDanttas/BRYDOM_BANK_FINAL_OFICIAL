let bhacannaBots = Array.from({ length: 3000 }, (_, i) => ({
  id: i + 1,
  status: "ativo",
  lucro: 0,
}));

// Simulação de operação automática
function atualizarLucros() {
  bhacannaBots = bhacannaBots.map(bot => ({
    ...bot,
    lucro: bot.lucro + Math.random() * 5, // adiciona lucro aleatório entre 0 e 5
  }));
}
setInterval(atualizarLucros, 5000); // atualiza a cada 5s

export default function handler(req, res) {
  if (req.method === "GET") {
    const lucroTotal = bhacannaBots.reduce((acc, bot) => acc + bot.lucro, 0);
    return res.status(200).json({ bots: bhacannaBots, lucroTotal });
  } else {
    return res.status(405).json({ error: "Método não permitido" });
  }
}
