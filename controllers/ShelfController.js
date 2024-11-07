const errorMessages = require("../config/errorMessage");
const { getShelfItems, addToShelf } = require("../services/ShelfService");

const getShelfItemsController = async (req, res) => {
    const user = req.user;

    if (!user) {
        return res.status(401).send('Usuário não autenticado.')
    }

    const userId = user.id
    try {
        const shelfItems = await getShelfItems(userId)
        res.status(200).json(shelfItems)
    } catch(error) {
        res.status(500).json({ error: errorMessages.genericError })
    }
}

const addToShelfController = async (req, res) => {
    const user = req.user;

    if (!user) {
        return res.status(401).send('Usuário não autenticado.')
    }

    const userId = user.id
    try {
        const result = await addToShelf(userId);
        res.status(200).json({ message: 'Compra concluída com sucesso', data: result});
    } catch(error) {
        res.status(500).json({
            error: errorMessages.genericError,
            details: error.message
        })
    }
}

module.exports = { getShelfItemsController, addToShelfController }