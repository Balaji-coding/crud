const express = require('express');
const { Alldatas } = require('../controllers/Alldatas');
const router = express.Router();
// const Alldata = require('../models/Alldata');
// Route to get all data
router.get('/alldata', Alldatas);
router.post('/adddata', require('../controllers/addData').addData);
router.put('/edit', require('../controllers/EditData').EditData);
router.delete('/delete', require('../controllers/Delete').Delete);
router.post('/login', require('../controllers/Login').Login);
module.exports = router;
