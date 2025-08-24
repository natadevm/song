const mongoose = require("mongoose");

const songSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Song title is required"],
      trim: true,
    },
    artist: {
      type: String,
      required: [true, "Artist is required"],
      trim: true,
    },
    album: {
      type: String,
      trim: true,
    },
    gener: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Song", songSchema);
