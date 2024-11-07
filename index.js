const express = require('express');
const router = require('./routes/index')
const cookieParser = require('cookie-parser');
const path = require('path');
const { swaggerUi, swaggerDocs } = require('./swagger');
require('dotenv').config()

const PORT = 5000;
const app = express()

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(express.json());
app.use(cookieParser())
app.use('/imagens', express.static(path.join(__dirname, 'public', 'assets' )))
app.use('/api', router);

app.get('/',(req,res)=>{
    res.send('Hello World')
})
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor rodando na porta http://localhost:${PORT}`)
    console.log('Acesse o endpoint /api/docs para ver a documentação.')
})

module.exports = app;
