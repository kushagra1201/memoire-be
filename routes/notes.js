const express = require('express');
const {verifyToken} = require('../middlewares/authMiddleware');
const {addNote} = require('../controllers/notes');
const {getAllNotes} = require('../controllers/notes');
const {updateNote} = require('../controllers/notes');
const router = express.Router();

router.post("/add", verifyToken, addNote);
router.get("/getallnotes", verifyToken, getAllNotes);
router.put("/update/:noteId", verifyToken, updateNote);

module.exports = router;