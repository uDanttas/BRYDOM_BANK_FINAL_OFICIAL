import prisma from "../../lib/prisma";

let bhacannaBots = Array.from({ length: 3000 }, (_, i) => ({
  id: i + 1,
  status: "ativo",
  lucro: 0,
}));

// --- FUNÇÃO PARA SIMULAR OPERAÇÕES ---
async function operarBotsClientes() {
  try {
    const botsClientes = await prisma.bot.findMany({
      where: { status: "ativo" },
      include: { usuario: true },
    });

    for (const bot of botsClientes) {
      const lucro = parseFloat((Math.random() * 5).toFixed(2)); // lucro aleatório até R$5
      let novoSaldo = bot.saldoOperacional + lucro;

      // Verifica meta diária de R$500
      if (novoSaldo >= 500) {
        // Lucro extra vai para o mestre
        await prisma.usuario.update({
          where: { cpf: "00000000000" }, // Mestre
          data: { saldo: { increment: lucro } },
        });
      } else {
        // Lucro fica com o bot
        await prisma.bot.update({
          where: { id: bot.id },
          data: { saldoOperacional: novoSaldo },
        });
      }
    }
  } catch (error) {
    console.error("Erro ao operar bots de clientes:", error);
  }
}

// --- FUNÇÃO PARA SIMULAR BHACANNA ---
function operarBhacanna() {
  bhacannaBots = bhacannaBots.map((bot) => ({
    ...bot,
    lucro: bot.lucro + Math.random() * 10, // lucro aleatório até R$10
  }));
}

// --- EXECUÇÃO AUTOMÁTICA A CADA 10 SEGUNDOS ---
setInterval(() => {
  operarBotsClientes();
  operarBhacanna();
}, 10_000);

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const botsClientes = await prisma.bot.findMany({
        include: { usuario: true },
      });

      const lucroBhacanna = bhacannaBots.reduce((acc, bot) => acc + bot.lucro, 0);

      return res.status(200).json({
        mensagem: "Operação de bots em execução.",
        botsClientes,
        bhacanna: {
          total: 3000,
          lucroTotal: lucroBhacanna,
        },
      });
    } catch (error) {
      return res.status(500).json({ error: "Erro ao buscar status dos bots." });
    }
  } else {
    return res.status(405).json({ error: "Método não permitido" });
  }
}
