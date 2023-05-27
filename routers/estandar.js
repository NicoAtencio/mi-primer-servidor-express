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
    if(resultado.length === 0) return res.status(404).send(`El identificardor ${id} no esta asociado a un usuario.`);
    res.send(resultado)
});

routerEstandar.post('/', (req,res) => {
    const usuarioNuevo = req.body;
    estandar.push(usuarioNuevo);
    res.send(estandar);
});

routerEstandar.put('/:id', (req,res) => {
    const modificarCompletamente = req.body;
    const id = req.params.id;
    const indice = estandar.findIndex(usuario => usuario.id == id);
    if(indice >= 0) estandar[indice] = modificarCompletamente;
    else return res.status(404).send(`No existe el usuario con el identificador ${id}`)
    res.send(estandar);
});

routerEstandar.patch('/:id', (req,res) => {
    const editarUsuario = req.body;
    const id = req.params.id;
    const indice = estandar.findIndex(usuario => usuario.id == id);
    if(indice >= 0) Object.assign(estandar[indice], editarUsuario)
    else return res.status(404).send(`No existe el usuario con el identificador ${id}`);
    res.send(estandar)
});

routerEstandar.delete('/:id', (req,res) => {
    const id = req.params.id;
    const indice = estandar.findIndex(usuario => usuario.id == id);
    if(indice >= 0){
        estandar.splice(indice,1);
        res.send(estandar)
    }else{
        res.status(404).send(`No existe el usuario con el identificador ${id}`)
    }
})


module.exports = routerEstandar;
module.exports.ordenarPorCantidadDeSeguidores = ordenarPorCantidadDeSeguidores;