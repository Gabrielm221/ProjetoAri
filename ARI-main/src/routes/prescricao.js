const express = require('express');
const router = express.Router();

const prescricaoController = require('../controllers/prescricao');
const {autenticarToken} = require('../authMiddleware');
router.post('/',autenticarToken, prescricaoController.criaPrescricao);
router.get('/', autenticarToken, prescricaoController.listaPrescricao);
router.get('/agenda', autenticarToken, prescricaoController.listaAgendaPrescricao);
router.get('/lastpresc', autenticarToken, prescricaoController.lastPresc);
router.put('/:id', autenticarToken, prescricaoController.atualizaPrescricao);
router.delete('/:id', autenticarToken, prescricaoController.deletaPrescricao);

module.exports = router;