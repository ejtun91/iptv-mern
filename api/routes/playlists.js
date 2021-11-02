const router = require("express").Router();
const CryptoJS = require("crypto-js");
const Playlist = require("../models/Playlist");
const User = require("../models/User");

//CREATE PLAYLIST
router.post("/", async (req, res) => {
  const newList = new Playlist(req.body);
  try {
    const savedList = newList.save();
    res.status(200).json(savedList);
  } catch (error) {
    res.status(500).json(error);
  }
});

//UPDATE PLAYLIST
router.put("/:id", async (req, res) => {
  try {
    const updatedPlaylist = await Playlist.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedPlaylist);
  } catch (error) {
    res.status(500).json(error);
  }
});

//like/Dislike
router.put("/:id/like", async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id);
    if (!playlist.likes.includes(req.body.userId)) {
      await playlist.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("you liked the post");
    } else {
      await playlist.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("you disliked the playlist");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

//DELETE PLAYLIST
router.delete("/:id", async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id);
    const user = await User.findOne({ isAdmin: true });
    if (playlist.user === req.body.username || user) {
      try {
        await playlist.delete();
        res.status(200).json("playlist has been deleted...");
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      res.status(401).json("you cannot delete this playlist");
    }
  } catch (error) {
    res.status(404).json("playlist not found");
  }
});

//GET PLAYLIST
router.get("/:id", async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id);
    res.status(200).json(playlist);
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET ALL PLAYLISTS
router.get("/", async (req, res) => {
  const query = req.query.new;
  try {
    const playlists = query
      ? await Playlist.find().sort({ _id: -1 })
      : await Playlist.find();
    res.status(200).json(playlists);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
