import prisma from "../../lib/prisma";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { cpf, senha } = req.body;

      if (!cpf || !senha) {
        return res.status(400).json({ error: "CPF e senha são obrigatórios." });
      }

      const usuario = await prisma.usuario.findUnique({ where: { cpf } });

      if (!usuario || usuario.senha !== senha) {
        return res.status(401).json({ error: "CPF ou senha inválidos." });
      }

      return res.status(200).json({ message: "Login realizado com sucesso!", usuario });
    } catch (error) {
      console.error("Erro login:", error);
      return res.status(500).json({ error: "Erro interno no login." });
    }
  } else {
    return res.status(405).json({ error: "Método não permitido" });
  }
}
