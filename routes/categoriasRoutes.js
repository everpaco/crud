'use strict';
const express = require('express');
const router = express.Router();
const categoriasCtrl = require('../controllers/categoriasController');
const auth = require('../middlewares/authMiddleware');

router.get('/', categoriasCtrl.list);
router.post('/', auth, categoriasCtrl.create);

module.exports = router;
