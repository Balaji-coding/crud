const express = require('express');
const { Alldatas } = require('../controllers/Alldatas');
const router = express.Router();
// const Alldata = require('../models/Alldata');
// Route to get all data
const { verifyToken } = require('../controllers/authMiddle');
router.get('/alldata', verifyToken, Alldatas);
router.post('/adddata', require('../controllers/addData').addData);
router.put('/edit', verifyToken, require('../controllers/EditData').EditData);
router.delete('/delete', verifyToken, require('../controllers/Delete').Delete);
router.post('/login', require('../controllers/Login').Login);
module.exports = router;
