import prisma from "../../lib/prisma";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { userId, valor } = req.body;

      if (!userId || !valor || valor <= 0) {
        return res.status(400).json({ error: "Dados inválidos para depósito." });
      }

      const usuario = await prisma.usuario.update({
        where: { id: parseInt(userId) },
        data: { saldo: { increment: parseFloat(valor) } },
      });

      await prisma.transacao.create({
        data: {
          usuarioId: parseInt(userId),
          tipo: "depósito",
          valor: parseFloat(valor),
        },
      });

      return res.status(200).json({ message: "Depósito realizado com sucesso!", saldo: usuario.saldo });
    } catch (error) {
      console.error("Erro deposito:", error);
      return res.status(500).json({ error: "Erro interno ao depositar." });
    }
  } else {
    return res.status(405).json({ error: "Método não permitido" });
  }
}
