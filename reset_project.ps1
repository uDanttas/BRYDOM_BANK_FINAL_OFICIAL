
# Script para resetar projeto BRYDOM_BANK_FINAL_OFICIAL
# Remove node_modules, package-lock.json, gera Prisma Client, instala dependências e roda dev server Next.js

# Caminho do projeto - ajuste se necessário
$projectPath = "C:\Users\Dantas\Downloads\BRYDOM_BANK_FINAL_OFICIAL (4)"

Write-Host "Indo para a pasta do projeto:" $projectPath
Set-Location -Path $projectPath

Write-Host "Removendo node_modules e package-lock.json..."
Remove-Item -Recurse -Force .\node_modules\ -ErrorAction SilentlyContinue
Remove-Item -Force .\package-lock.json -ErrorAction SilentlyContinue

Write-Host "Gerando Prisma Client..."
npx prisma generate

Write-Host "Instalando dependências..."
npm install

Write-Host "Rodando servidor Next.js..."
npm run dev
