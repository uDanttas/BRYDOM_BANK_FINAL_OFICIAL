import prisma from '../../lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const usuarios = await prisma.usuario.findMany();
      return res.status(200).json(usuarios);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao buscar usuários' });
    }
  }

  if (req.method === 'POST') {
    try {
      const { cpf, senha } = req.body;
      const novoUsuario = await prisma.usuario.create({
        data: { cpf, senha },
      });
      return res.status(201).json(novoUsuario);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao criar usuário' });
    }
  }

  return res.status(405).json({ error: 'Método não permitido' });
}
