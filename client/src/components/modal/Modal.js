import "./modal.scss";
import { ContentCopy, Launch } from "@mui/icons-material";
import { Alert, Snackbar } from "@mui/material";
import { useState } from "react";
import { makeStyles } from "@mui/styles";
import { v4 as uuidv4 } from "uuid";
import Item from "../item/Item";

const Modal = ({ setDisplayModal, displayModal, url, date, item, cats }) => {
  // console.log(id);
  const [state, setState] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });

  const useStyles = makeStyles({
    root: {
      backgroundColor: "#019740",
    },
  });

  const classes = useStyles();

  const { vertical, horizontal, open } = state;

  const handleClick = (newState) => () => {
    setState({ open: true, ...newState });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`${url}`);
    setState({ open: true, vertical: "bottom", horizontal: "center" });
  };

  console.log(cats);

  return (
    <>
      <div className={`Modal ${displayModal ? "Show" : ""}`}>
        <button
          className="Close"
          onClick={() => setDisplayModal(!displayModal)}
        >
          X
        </button>
        <div className="topPart">
          {/* <button className="checkBtn">Check More</button> */}
          <p className="countries">
            Countries: {cats.map((cat) => cat).join(",")}
          </p>
        </div>
        <hr className="line" />
        <div className="bottomPart">
          <div className="leftBottom">
            <span
              className="urlName"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <span style={{ marginBottom: "7px" }}>Playlist URL:</span>
              <span style={{ color: "gray" }}> {url}</span>
            </span>
            <span
              className="date"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <span style={{ marginBottom: "7px" }}> UPDATED AT:</span>
              <span style={{ color: "gray" }}>
                {new Date(date).toDateString()}
              </span>
            </span>
            <span
              className="copy"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <span style={{ marginBottom: "10px" }}> Copy List </span>
              <span>
                <ContentCopy
                  onClick={() => handleCopy()}
                  className="iconCopy"
                />
              </span>
              <span></span>
            </span>
          </div>
          <div className="rightBottom">
            <span
              className="androidPlayer"
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              Install mobile player 1{" "}
              <a
                href="https://play.google.com/store/apps/details?id=nialldown.com.ultiplayer"
                target="_link"
                className="link"
              >
                <Launch className="icon" />{" "}
              </a>
            </span>
            <span
              className="webPlayer"
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              Install mobile player 2{" "}
              <a
                href="https://play.google.com/store/apps/details?id=nialldown.com.youriptvplayer"
                target="_link"
                className="link"
              >
                <Launch className="icon" />
              </a>
            </span>
            <span
              className="cancel"
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              Launch web player
              <Launch className="icon" style={{ marginLeft: "auto" }} />
            </span>
          </div>
        </div>
      </div>
      <div
        className={`Overlay ${displayModal ? "Show" : ""}`}
        onClick={() => setDisplayModal(!displayModal)}
      />
      <Snackbar
        autoHideDuration={5000}
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message={`Great you've got the url - (${url})`}
        key={vertical + horizontal}
        ContentProps={{
          "aria-describedby": "message-id",
          className: classes.root,
        }}
      />
    </>
  );
};
export default Modal;
