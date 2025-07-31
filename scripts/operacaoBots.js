import prisma from '../lib/prisma.js';

console.log('🔁 Script iniciado.');
let executando = false;

// ⏰ Agenda reset diário para 00:00
function agendarResetDiario() {
  const agora = new Date();
  const proximoReset = new Date();
  proximoReset.setHours(0, 0, 0, 0); // 00:00:00

  if (agora > proximoReset) {
    proximoReset.setDate(proximoReset.getDate() + 1);
  }

  const msAteReset = proximoReset - agora;
  console.log(`⏳ Reset diário agendado para daqui a ${Math.floor(msAteReset / 1000)} segundos.`);

  setTimeout(() => {
    resetarMetasEDisponibilidade();
    agendarResetDiario(); // reagenda para o próximo dia
  }, msAteReset);
}

// 🔁 Função principal de operação dos bots
async function operarBots() {
  const agora = new Date();
  const hora = agora.getHours();
  const minuto = agora.getMinutes();

  // ❌ Para tudo às 23:55 ou depois
  if (hora === 23 && minuto >= 55) {
    console.log('⏹️ Encerrando operação dos bots - fim do ciclo diário.');
    process.exit();
  }

  if (executando) return;
  executando = true;

  try {
    console.log(`[${agora.toLocaleTimeString()}] Iniciando operação dos bots...`);

    const usuarios = await prisma.usuario.findMany({
      where: { tipo: 'cliente' },
      include: { bots: true },
    });

    for (const usuario of usuarios) {
      let lucroHoje = 0;

      for (const bot of usuario.bots) {
        if (!bot.ativo || bot.metaBatida) continue;

        const lucro = Math.floor(Math.random() * 30) + 1; // R$1 ~ R$30
        lucroHoje += lucro;

        await prisma.historico.create({
          data: {
            usuarioId: usuario.id,
            botId: bot.id,
            valor: lucro,
            data: new Date(),
          },
        });

        await prisma.bot.update({
          where: { id: bot.id },
          data: {
            saldoOperacional: { decrement: 0 },
            lucroHoje: { increment: lucro },
          },
        });

        const botAtualizado = await prisma.bot.findUnique({
          where: { id: bot.id },
        });

        if (botAtualizado.lucroHoje >= 500) {
          await prisma.bot.update({
            where: { id: bot.id },
            data: { metaBatida: true },
          });
        }
      }

      // Se cliente passou da meta, redireciona lucro pro mestre
      if (lucroHoje > 0) {
        const clienteMeta = usuario.bots.filter(b => b.ativo).length * 500;
        const totalLucroCliente = await prisma.historico.aggregate({
          _sum: { valor: true },
          where: {
            usuarioId: usuario.id,
            data: {
              gte: new Date(new Date().setHours(0, 0, 0, 0)),
            },
          },
        });

        if (totalLucroCliente._sum.valor >= clienteMeta) {
          await prisma.usuario.update({
            where: { tipo: 'mestre' },
            data: {
              saldo: { increment: lucroHoje },
            },
          });
        } else {
          await prisma.usuario.update({
            where: { id: usuario.id },
            data: {
              saldo: { increment: lucroHoje },
            },
          });
        }
      }
    }

    // Atualiza bots Bhacanna (do mestre)
    const bhacannas = await prisma.bot.findMany({
      where: { usuario: { tipo: 'mestre' } },
    });

    for (const bot of bhacannas) {
      const lucro = Math.floor(Math.random() * 30) + 1;
      await prisma.historico.create({
        data: {
          usuarioId: bot.usuarioId,
          botId: bot.id,
          valor: lucro,
          data: new Date(),
        },
      });

      await prisma.bot.update({
        where: { id: bot.id },
        data: {
          saldoOperacional: { decrement: 0 },
          lucroHoje: { increment: lucro },
        },
      });

      await prisma.usuario.update({
        where: { id: bot.usuarioId },
        data: {
          saldo: { increment: lucro },
        },
      });
    }

    console.log(`[${new Date().toLocaleTimeString()}] Operação dos bots finalizada.`);
  } catch (error) {
    console.error('❌ Erro durante operação dos bots:', error);
  } finally {
    executando = false;
  }
}

// 🔁 Reseta metas dos bots todo dia às 00:00
async function resetarMetasEDisponibilidade() {
  try {
    await prisma.bot.updateMany({
      data: {
        metaBatida: false,
        lucroHoje: 0,
      },
    });
    console.log(`[${new Date().toLocaleTimeString()}] ✅ Metas e lucros resetados.`);
  } catch (error) {
    console.error('Erro ao resetar bots:', error);
  }
}

// ⏱️ Intervalo de operação a cada 10 segundos
setInterval(operarBots, 10 * 1000);
agendarResetDiario();
