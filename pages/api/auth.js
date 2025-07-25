export default function handler(req, res) {
  if (req.method === 'POST') {
    const { cpf, senha } = req.body;
    if (cpf === '12345678900' && senha === 'sagui') {
      return res.status(200).json({ message: 'Login realizado com sucesso', token: 'fake-token' });
    }
    return res.status(401).json({ error: 'CPF ou senha incorretos' });
  }
  return res.status(405).json({ error: 'Método não permitido.' });
}
