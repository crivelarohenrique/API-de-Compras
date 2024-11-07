const errorMessages = require('../config/errorMessage');
const bcrypt = require('bcrypt')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const getUserInfoService = async (userId) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { balance: true, username: true }
        });

        if (!user) {
            return { error: 'Usuário não encontrado' };
        }

        return [user.balance, user.username];
    } catch (error) {
        return { error: errorMessages.genericError };
    }
};

const loginUserService = async(username, password) => {
    try {
        const name = username.toLowerCase()
        const user = await prisma.user.findUnique({ where: { username: name } });
        if (!user) {
            return { error: 'Usuário não encontrado' };
            }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return { error: 'Senha inválida' };
        }
        const { password: _, ...userWithoutPassword } = user;
        return userWithoutPassword;
    } catch(error) {
        return { error: errorMessages.genericError };
    }
}

const createUserService = async(username, password) => {
    try {
        const name = username.toLowerCase()
        const existingUser = await prisma.user.findUnique({ where: { username } })
        if (existingUser) {
            return { error: 'Usuário já existe' }
        }

        const user = await prisma.user.create({ 
          data: { username: name, password } 
        });

        return user;
    } catch (error) {
        return { error: errorMessages.genericError };
    }
};

module.exports = {
    getUserInfoService,
    loginUserService,
    createUserService,
}