'use strict';
const { Mueble, Categoria } = require('../models');

exports.list = async (req, res) => {
  try {
    const muebles = await Mueble.findAll({ include: [{ model: Categoria, as: 'categoria' }] });
    return res.json(muebles);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error del servidor' });
  }
};

exports.create = async (req, res) => {
  try {
    const { nombre, tipo, costo, categoriaId } = req.body;
    if (!nombre) return res.status(400).json({ message: 'Nombre requerido' });
    const m = await Mueble.create({ nombre, tipo, costo, categoriaId });
    return res.status(201).json(m);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error del servidor' });
  }
};
