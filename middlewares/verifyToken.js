const jwt = require('jsonwebtoken');
require('dotenv').config();
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function authenticateToken(req, res, next) {
    try {
        const token = req.cookies.jwt; 
        if (!token) {
            req.user = null;
            return next();
        }
  

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
   
        const user = await prisma.user.findFirst({ where: { id: decoded.userId } });
        if (!user) {
            req.user = null;
        } else {
            req.user = user;
        }
    } catch (error) {
        req.user = null;
        console.error('Error during token authentication:', error); 
    }

    next(); 
}

module.exports = { authenticateToken };