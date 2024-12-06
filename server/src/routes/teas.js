const express = require('express');
const router = express.Router();
const Tea = require('../models/Tea');

router.get('/', async (req, res) => {
    const teas = await Tea.getAllTeas();
    res.json(teas);
});

router.post('/search', async (req, res) => {
    const teas = await Tea.searchTeas(req.body);
    res.json(teas);
});

router.post('/', async (req, res) => {
    const newTea = await Tea.addTea(req.body);
    res.status(201).json(newTea);
});

router.put('/:id', async (req, res) => {
    const updatedTea = await Tea.updateTea(req.params.id, req.body);
    res.json(updatedTea);
});

router.delete('/:id', async (req, res) => {
    await Tea.deleteTea(req.params.id);
    res.status(204).send();
});

module.exports = router;