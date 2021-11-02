import { ConnectedTv, Delete, Link, ThumbUp } from "@mui/icons-material";
import { Snackbar } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../context/Context";
import { axiosInstance } from "../../requestMethod";
import "./item.scss";
const Item = ({ item }) => {
  const { user: currentUser } = useContext(Context);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [like, setLike] = useState(item.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [state, setState] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });

  const useStyles = makeStyles({
    root: {
      backgroundColor: "#5bc0de",
    },
  });

  const classes = useStyles();

  const { vertical, horizontal, open } = state;

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  useEffect(() => {
    setIsLiked(item?.likes.includes(currentUser?._id));
  }, [currentUser?._id, item?.likes]);

  const handleDelete = async (e) => {
    e.stopPropagation();
    try {
      await axiosInstance.delete(`/playlists/${item._id}`, {
        data: { username: currentUser.username },
      });
      window.location.reload();
    } catch (error) {}
  };

  const likeHandler = (e) => {
    e.stopPropagation();
    try {
      axiosInstance.put("/playlists/" + item._id + "/like", {
        userId: currentUser._id,
      });
    } catch (error) {}
    if (currentUser) {
      setLike(isLiked ? like - 1 : like + 1);
      setIsLiked(!isLiked);
    } else {
      setState({ open: true, vertical: "bottom", horizontal: "center" });
    }
  };

  return (
    <>
      <div className="item">
        <div className="iconTV">
          <ConnectedTv className="icon" />
        </div>
        <div className="itemDetails">
          <span className="listTitle">{item.name}</span>
          <span className="date">
            Updated at: {new Date(item.createdAt).toDateString()}
          </span>
          <div className="userAndLike">
            <span className="playlistID">User: {item.user}</span>
            <span className="like">
              <ThumbUp
                className="likeIcon"
                onClick={likeHandler}
                alt=""
                style={{ position: "absolute", bottom: "0", right: "20px" }}
              />
            </span>
            <span className="postLikeCounter">{like}</span>
          </div>
        </div>
        <Link className="linkIcon" />

        {currentUser?.username === item.user && (
          <span onClick={handleDelete} className="close">
            <Delete className="delIcon" />
          </span>
        )}
        {currentUser?.isAdmin && (
          <span onClick={handleDelete} className="close">
            <Delete className="delIcon" />
          </span>
        )}
      </div>
      <Snackbar
        autoHideDuration={5000}
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message={`Please register/login to like the playlist.`}
        key={vertical + horizontal}
        ContentProps={{
          "aria-describedby": "message-id",
          className: classes.root,
        }}
      />
    </>
  );
};

export default Item;
