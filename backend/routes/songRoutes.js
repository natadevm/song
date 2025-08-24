const express = require("express");
const {
  getSongs,
  createSong,
  updateSong,
  deleteSong,
  getStats
} = require("../controllers/songController"); // 👈 we’ll create this file next

const router = express.Router();

// GET all songs
router.get("/", getSongs);

// CREATE a new song
router.post("/", createSong);

// UPDATE a song
router.put("/:id", updateSong);

// DELETE a song
router.delete("/:id", deleteSong);
router.get("/stats", getStats);

module.exports = router;
