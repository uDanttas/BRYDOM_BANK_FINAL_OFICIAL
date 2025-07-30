import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Teste de conexão Prisma iniciado.');

  // Cria um usuário mínimo só pra teste
  await prisma.usuario.create({
    data: {
      cpf: '99999999999',
      nome: 'Teste Seed',
      senha: 'teste',
      saldo: 10,
    },
  });

  console.log('Usuário teste criado.');
}

main()
  .catch(e => {
    console.error('Erro no seed-test:', e);
    process.exit(1);
  })
  .finally(async () => {
    console.log('Conexão Prisma encerrada.');
    await prisma.$disconnect();
  });
