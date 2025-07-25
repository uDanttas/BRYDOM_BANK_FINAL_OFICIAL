import prisma from '../lib/prisma.js';

async function main() {
  const mestre = await prisma.usuario.upsert({
    where: { cpf: '00000000000' },
    update: {},
    create: {
      cpf: '00000000000',
      senha: 'sagui',
      tipo: 'mestre',
      saldo: 0,
    },
  });

  console.log(`✅ Usuário mestre criado ou já existente: ${mestre.cpf}`);
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
