// scripts/agendador.js
import cron from 'node-cron';
import { exec } from 'child_process';

// Agendar para iniciar todos os dias às 00:00
cron.schedule('0 0 * * *', () => {
  console.log('⏰ Iniciando bots às 00:00');
  exec('node scripts/operacaoBots.js', (error, stdout, stderr) => {
    if (error) {
      console.error(`Erro ao iniciar bots: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });
});

// Agendar para parar todos os dias às 23:55
cron.schedule('55 23 * * *', () => {
  console.log('🛑 Parando bots às 23:55');
  exec('pm2 delete brydom-bots', (error, stdout, stderr) => {
    if (error) {
      console.error(`Erro ao parar bots: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });
});

console.log('✅ Agendador Brydom iniciado e monitorando horário...');
