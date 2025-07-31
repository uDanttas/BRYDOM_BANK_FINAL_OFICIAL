import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Cria Mestre
  const mestreExistente = await prisma.mestre.findFirst();
  if (!mestreExistente) {
    await prisma.mestre.create({
      data: {
        nome: 'Dom - Mestre',
        saldo: 10000,
      },
    });
    console.log('Mestre criado.');
  }

  // Hashear senhas dos usuários
  const senhaCliente1 = await bcrypt.hash('leao', 10);
  const senhaCliente2 = await bcrypt.hash('tigre', 10);

  // Usuários de teste
  const usuarios = [
    { cpf: '11111111111', senha: senhaCliente1, saldo: 500 },
    { cpf: '22222222222', senha: senhaCliente2, saldo: 800 },
  ];

  for (const u of usuarios) {
    const existe = await prisma.usuario.findUnique({ where: { cpf: u.cpf } });
    if (!existe) {
      await prisma.usuario.create({ data: u });
      console.log(`Usuário ${u.cpf} criado.`);
    }
  }

  console.log('Seed concluído com sucesso.');
}

main()
  .catch((e) => {
    console.error('Erro no seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
