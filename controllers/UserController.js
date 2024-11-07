const errorMessages = require('../config/errorMessage');
const UserService = require('../services/UserService');
const jwt = require('jsonwebtoken');
require('dotenv').config()

const getUserInfoController = async (req, res) => {
    const user = req.user; 
    if (!user) {
        return res.status(401).send({ message: 'Usuário não autenticado.' });
    }
    const userId = user.id; ;
    try {
        const [balance, username] = await UserService.getUserInfoService(userId);
        res.status(200).send({ balance, username })
    } catch(error) {
        res.status(500).send({ error: errorMessages.genericError });
    }
}

const loginUserController = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await UserService.loginUserService(username, password);

        if (user.error === 'Usuário não encontrado' || user.error === 'Senha inválida') {
            return res.status(401).send({ message: 'Usuário ou senha inválidos' });
        }

        const token = jwt.sign(
            { username: user.username, userId: user.id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.cookie('jwt', token, {
            httpOnly: true,
            secure: true, 
            sameSite: 'none',
            maxAge: 24 * 60 * 60 * 1000 
        });

        res.status(200).send({ message: 'Logado com sucesso', token, user });
    } catch (error) {
        res.status(500).send({ error: errorMessages.genericError });
    }
}

const createUserController = async(req, res) => {
    try {
        const { username, password } = req.body;
        const user = await UserService.createUserService(username, password);
        if (user.error) {
            return res.status(400).send({ message: user.error })
        }
        return res.status(201).send({ message: "Usuário criado com sucesso", username });
    } catch (error) {
        if(error.message === 'Usuário já existe') {
            return res.status(400).send(error.message);
        }
        return res.status(500).send({ error: errorMessages.genericError });
    }
};

module.exports = {
    getUserInfoController,
    loginUserController,
    createUserController,
}
