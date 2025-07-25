import prisma from "../../lib/prisma";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { userId, valor } = req.body;

      if (!userId || !valor || valor <= 0) {
        return res.status(400).json({ error: "Dados inválidos para saque." });
      }

      const usuario = await prisma.usuario.findUnique({
        where: { id: parseInt(userId) },
      });

      if (!usuario || usuario.saldo < valor) {
        return res.status(400).json({ error: "Saldo insuficiente." });
      }

      await prisma.usuario.update({
        where: { id: parseInt(userId) },
        data: { saldo: { decrement: parseFloat(valor) } },
      });

      await prisma.transacao.create({
        data: {
          usuarioId: parseInt(userId),
          tipo: "saque",
          valor: parseFloat(valor),
        },
      });

      return res.status(200).json({ message: "Saque realizado com sucesso!" });
    } catch (error) {
      console.error("Erro saque:", error);
      return res.status(500).json({ error: "Erro interno ao sacar." });
    }
  } else {
    return res.status(405).json({ error: "Método não permitido" });
  }
}
