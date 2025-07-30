import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Iniciando seed...')

  await prisma.usuario.upsert({
    where: { cpf: '00000000000' },
    update: {},
    create: {
      cpf: '00000000000',
      nome: 'Mestre',
      senha: 'sagui',
      saldo: 100000,
      tipo: 'mestre', // <- CORRETO AGORA
    },
  })

  console.log('Seed concluída com sucesso.')
}

main()
  .catch((e) => {
    console.error('Erro na seed:', e)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
