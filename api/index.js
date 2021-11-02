const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const playlistRoute = require("./routes/playlists");
const cors = require("cors");
const path = require("path");

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("mongo connected"))
  .catch((e) => console.log(e));

app.use("/images", express.static(path.join(__dirname, "public/images")));

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/playlists", playlistRoute);

app.listen(8080 || process.env.PORT, () => {
  console.log("server running");
});
