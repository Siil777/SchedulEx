const express = require('express');
const {createExam, getExam, deleteExam} = require('../controllers/controller.js');
const router = express.Router();

router.post('/post/exam', createExam);
router.get('/get/exam', getExam);
router.delete('/delete/exam', deleteExam);

module.exports = router;

