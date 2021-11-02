const mongoose = require("mongoose");

const PlaylistSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    categories: {
      type: Array,
    },
    likes: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Playlist", PlaylistSchema);
