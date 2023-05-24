const express = require('express');
const {premium} = require('../datos/usuarios.js').usuarios;
const routerPremium = express.Router();

routerPremium.use(express.json());

module.exports = routerPremium;
