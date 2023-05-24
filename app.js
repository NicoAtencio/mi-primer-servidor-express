const express = require('express');
const app = express();
const {usuarios}= require('./datos/usuarios.js');

const routerEstandar = require('./routers/estandar.js');
app.use('/usuarios/estandar', routerEstandar);

const routerPremium = require('./routers/premium.js');
app.use('/usuarios/premium', routerPremium);

app.get('/', (req,res) => {
    res.send('Bienvenido a mi primer servidor con express.')    
});

app.get('/usuarios',(req,res) => {
    res.send(usuarios)
})

const PUERTO = process.env.PORT || 2000;
app.listen(PUERTO, () => {
    console.log(`El servidor esta escuchando en el puerto ${PUERTO}...`)
});

// console.log(usuarios);


