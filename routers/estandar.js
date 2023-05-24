const express = require('express');
const {estandar} = require('../datos/usuarios.js').usuarios;

const routerEstandar = express.Router();
routerEstandar.use(express.json());

const ordenarPorCantidadDeSeguidores = (arr) => {
    return arr.sort((a,b) => b.seguidores - a.seguidores);
}

routerEstandar.get('/', (req,res) => {
    if(req.query.ordenar === 'seguidores') return res.send(ordenarPorCantidadDeSeguidores(estandar));
    
    res.send(estandar)
});

routerEstandar.get('/:id', (req,res) => {
    const id = req.params.id;
    const resultado = estandar.filter(usuario => usuario.id == id);
    if(resultado.length === 0) return res.status(204).send(`El identificardor ${id} no esta asociado a un usuario.`);
    res.send(resultado)
})


module.exports = routerEstandar;