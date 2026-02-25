const express = require('express');
const PrivateRouter = require('./routers/PrivateRouter');
const PublicRouter = require('./routers/PublicRouter');
const app = express();
const HOST = 'localhost';
const PORT = 3000;

// require('./models');

app.use(express.json());


app.use(PublicRouter);
app.use(PrivateRouter);

app.listen(PORT, () => {
    console.log(`Servidor rodando nem http://${HOST}:${PORT}`)
})