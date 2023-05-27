const express = require('express');
const {premium} = require('../datos/usuarios.js').usuarios;
const routerPremium = express.Router();
const {ordenarPorCantidadDeSeguidores} = require('./estandar.js')

routerPremium.use(express.json());

routerPremium.get('/', (req,res) => {
    if(req.query.ordenar === 'seguidores') ordenarPorCantidadDeSeguidores(premium);
    res.send(premium);
});

routerPremium.post('/',(req,res) => {
    const nuevoUsuario = req.body;
    premium.push(nuevoUsuario);
    res.send(premium);
});

routerPremium.put('/:id', (req,res) => {
    const modificarTodo = req.body;
    const id = req.params.id;
    const indice = premium.findIndex(usuario => usuario.id == id);
    if(indice >= 0){
        premium[indice] = modificarTodo;
        res.send(premium)
    }else res.status(404).send(`No existe el usuario con el identificador ${id}`);
});

routerPremium.patch('/:id', (req,res) => {
    const editado = req.body;
    const id = req.params.id;
    const indice = premium.findIndex(usuario => usuario.id == id);
    if(indice >= 0){ 
        Object.assign(premium[indice], editado);
        res.send(premium);
    }else res.status(404).send(`No se encuentra el usuario con el identificador ${id}`);
});

routerPremium.delete('/:id', (req,res) => {
    const id = req.params.id;
    const indice = premium.findIndex(curso => curso.id == id);
    if (indice >= 0){
        premium.splice(indice, 1);
        return res.send(premium);
    };
    res.status(404).send(`No se encuentra el usuario con el identificador ${id}`);
})


module.exports = routerPremium;
