// criaação do server e configuração da porta 

const app = require('./app');
require('dotenv').config();

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => console.log(`server running or port ${PORT}`));

