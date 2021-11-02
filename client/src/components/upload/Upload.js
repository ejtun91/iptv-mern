import { Backdrop, Fade, Modal } from "@mui/material";
import { Input, AddLink, ListAlt } from "@mui/icons-material";
import { useContext, useRef, useState } from "react";
import "./upload.scss";
import { Context } from "../../context/Context";
import { axiosInstance } from "../../requestMethod";

const Upload = ({ handleCloseUpload, openUpload }) => {
  const nameRef = useRef();
  const linkRef = useRef();
  const [cat, setCat] = useState([]);
  const [failure, setFailure] = useState(false);
  const { user } = useContext(Context);

  const handleCat = (e) => {
    setCat(e.target.value.split(","));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPlaylist = {
      name: nameRef.current.value,
      link: linkRef.current.value,
      user: user.username,
      categories: cat,
    };
    if (linkRef.current.value.startsWith("http")) {
      try {
        await axiosInstance.post("/playlists", newPlaylist);
        window.location.reload();
      } catch (error) {
        setFailure(true);
      }
    } else {
      setFailure(true);
    }
  };

  const body = (
    <div className="modalContainerUpload">
      <h2 id="simple-modal-title" className="uploadTitle">
        Upload
      </h2>
      <form className="uploadForm" onSubmit={handleSubmit}>
        <div className="uploadWrapper">
          <Input className="iconUpload name" />
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Name of the playlist"
            className="inputUpload"
            ref={nameRef}
            required
          />
          <AddLink className="iconUpload" />
          <input
            type="text"
            name="link"
            id="link"
            placeholder="Place your playlist - (http://example.m3u)"
            className="inputUpload"
            ref={linkRef}
          />
          <ListAlt className="iconUpload cat" />
          <input
            type="text"
            name="link"
            id="link"
            placeholder="(Optional) UK,USA,DE,IT"
            className="inputUpload"
            onChange={handleCat}
          />
          <button type="submit" className="uploadBtn">
            Upload
          </button>
        </div>
        {failure && (
          <span
            style={{ position: "absolute", bottom: "5px", color: "crimson" }}
          >
            Upload failed, check your links.
          </span>
        )}
      </form>
    </div>
  );

  return (
    <>
      <Modal
        open={openUpload}
        onClose={handleCloseUpload}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openUpload}>{body}</Fade>
      </Modal>
    </>
  );
};

export default Upload;
