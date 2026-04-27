'use strict';
const { Categoria } = require('../models');

exports.list = async (req, res) => {
  try {
    const categorias = await Categoria.findAll();
    return res.json(categorias);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error del servidor' });
  }
};

exports.create = async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;
    if (!nombre) return res.status(400).json({ message: 'Nombre requerido' });
    const cat = await Categoria.create({ nombre, descripcion });
    return res.status(201).json(cat);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error del servidor' });
  }
};
