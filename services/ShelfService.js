const errorMessages = require('../config/errorMessage');
const { getAllCartByUserService, clearCartService } = require('./CartService');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getShelfItems = async (userId) => {
    try {
        const shelf = await prisma.shelf.findFirst({
            where: { userId: userId },
            include: {
                items: {
                    include: {
                        product: true
                    }
                }
            }
        });
        
        return shelf ? shelf.items : [];
    } catch (error) {
        console.error(error);
        return { error: errorMessages.genericError };
    }
};

const addToShelf = async (userId) => {
    try {
        const cartItems = await getAllCartByUserService(userId);

        if (cartItems.length === 0) {
            return { error: 'Carrinho não possui nenhum item.' };
        }

        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            return { error: 'Usuário não encontrado' };
        }

        let shelf = await prisma.shelf.findFirst({
            where: { userId: userId },
            include: { items: true }
        });

        if (!shelf) {
            shelf = await prisma.shelf.create({
                data: {
                    userId: userId,
                    items: { create: [] }
                }
            });
        }

        const newCartItems = cartItems.filter(cartItem =>
            !shelf.items.some(shelfItem => shelfItem.productId === cartItem.id)
        );

        let lastAddedItem;

        await prisma.$transaction(async (prisma) => {
            let totalCost = 0;

            for (const cartItem of newCartItems) {
                if (user.balance < totalCost + cartItem.price) {
                    throw new Error('Saldo insuficiente para concluir a compra');
                }
                totalCost += cartItem.price;

                lastAddedItem = await prisma.shelfItem.create({
                    data: {
                        shelfId: shelf.id,
                        productId: cartItem.id
                    },
                    include: {
                        product: true
                    }
                });
            }

            await prisma.user.update({
                where: { id: userId },
                data: { balance: user.balance - totalCost }
            });

            await prisma.cartItem.deleteMany({
                where: {
                    cart: {
                        userId: userId
                    }
                }
            });
        });

        return lastAddedItem;
    } catch (error) {
        console.error(error);
        return { error: error.message || errorMessages.genericError };
    }
};

module.exports = { getShelfItems, addToShelf };
