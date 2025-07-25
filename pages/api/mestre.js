export default async function handler(req, res) {
  try {
    // Dados simulados (vamos integrar ao Prisma depois)
    const lucroTotal = 150000; // soma de todos os lucros
    const metaDia = 2200;      // número de bots que bateram R$500 hoje
    const metaSemana = 18000;  // bots que bateram meta na semana

    res.status(200).json({
      lucroTotal,
      metaDia,
      metaSemana,
      totalBots: 3000,
    });
  } catch (error) {
    console.error("Erro no painel do mestre:", error);
    res.status(500).json({ error: "Erro ao carregar dados do mestre." });
  }
}
