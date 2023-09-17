const express = require("express");
const { getNotes, createNote, updateNote, deleteNote } = require("../controllers/notesController");
const auth = require("../middlewares/auth");
const noteRouter = express.Router();

noteRouter.get("/getNotes", auth, getNotes)

noteRouter.post("/createNotes", auth, createNote);

noteRouter.put("/:id", auth, updateNote);

noteRouter.delete("/:id", auth, deleteNote);

module.exports = noteRouter;