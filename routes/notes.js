const express = require('express');
const {verifyToken} = require('../middlewares/authMiddleware');
const {addNote} = require('../controllers/notes');
const {getAllNotes} = require('../controllers/notes');
const {updateNote,deleteNote} = require('../controllers/notes');
const router = express.Router();

router.post("/add", verifyToken, addNote);
router.get("/getallnotes", verifyToken, getAllNotes);
router.put("/update/:noteId", verifyToken, updateNote);
router.delete("/delete/:noteId", verifyToken, deleteNote);

module.exports = router;