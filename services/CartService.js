const errorMessages = require('../config/errorMessage');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllCartByUserService = async (userId) => {
    try {
        const cart = await prisma.cart.findFirst({
            where: { userId: userId },
            include: {
                items: {
                    include: {
                        product: true
                    }
                }
            }
        });
        
        if (!cart) {
            return null;
        }
        
        const products = cart.items.map(item => item.product);
        return products;
    } catch (error) {
        console.error(error);
        throw new Error(errorMessages.genericError);
    }
};

const deleteItemCartService = async (userId, productId) => {
    try {
        const cart = await prisma.cart.findFirst({
            where: { userId: userId },
            include: {
                items: true
            }
        });

        if (!cart) {
            throw new Error('Carrinho não encontrado');
        }

        const updatedItems = cart.items.filter(item => item.productId !== productId);
        
        await prisma.cart.update({
            where: { id: cart.id },
            data: {
                items: {
                    set: updatedItems.map(item => ({ id: item.id }))
                }
            }
        });

        return await prisma.cart.findFirst({
            where: { id: cart.id },
            include: {
                items: {
                    include: {
                        product: true
                    }
                }
            }
        });
    } catch (error) {
        console.error(error);
        throw new Error(errorMessages.genericError);
    }
};

const addItemToCartService = async (userId, username, productId) => {
    try {
        let cart = await prisma.cart.findFirst({
            where: { userId: userId },
            include: {
                items: true
            }
        });

        if (!cart) {
            cart = await prisma.cart.create({
                data: {
                    userId: userId,
                    username: username,
                    items: {
                        create: []
                    }
                }
            });
        }

        const product = await prisma.product.findUnique({
            where: { id: productId }
        });
        
        if (!product) {
            throw new Error('Produto inválido');
        }

        const existingCartItem = cart.items.find(item => item.productId === productId);
        
        if (!existingCartItem) {
            await prisma.cartItem.create({
                data: {
                    productId: productId,
                    cartId: cart.id
                }
            });
        }

        return await prisma.cart.findFirst({
            where: { id: cart.id },
            include: {
                items: {
                    include: {
                        product: true
                    }
                }
            }
        });
    } catch (error) {
        console.error(error);
        throw new Error(errorMessages.genericError);
    }
};

module.exports = {
    getAllCartByUserService,
    deleteItemCartService,
    addItemToCartService
};
