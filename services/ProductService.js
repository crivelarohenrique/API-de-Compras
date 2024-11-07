const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const getAllProductsService = async() => {
    const products = await prisma.product.findMany();
    return products
};

const getProductBySlugService = async(slug) => {
    try {
        const product = await prisma.product.findFirst({ where: { slug } });
        if (!product) {
            throw new Error('Livro não encontrado');
        }
        return product;
    } catch(error) {
        return { error: errorMessages.genericError };
    }
}

const getProductByTitleService = async(title) => {
    try {
        const product = await prisma.product.findFirst({ where: { title: new RegExp(title, 'i') }});
        if (!product) {
            throw new Error('Livro não encontrado');
        }
        return product;
    } catch(error) {
        return { error: errorMessages.genericError };
    }
}

module.exports = {
    getAllProductsService,
    getProductBySlugService,
    getProductByTitleService
};