const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const prisma = new PrismaClient()

async function migrateBooks() {
  try {
    const data = fs.readFileSync('./config/books.json', 'utf8');
    const productsData = JSON.parse(data);
    
    await prisma.product.createMany({data: productsData});

    console.log('Migração de dados concluída com sucesso.');
  } catch (err) {
    console.error('Erro ao migrar dados', err);
  } finally {
    await prisma.$disconnect()
  }
};

migrateBooks()