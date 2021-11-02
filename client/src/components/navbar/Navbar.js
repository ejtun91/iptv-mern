import { Android, Facebook, Twitter } from "@mui/icons-material";
import UploadIcon from "@mui/icons-material/Upload";
import { useContext, useState } from "react";
import { logout } from "../../context/apiCalls";
import { Context } from "../../context/Context";
import Login from "../login/Login";
import Register from "../register/Register";
import Upload from "../upload/Upload";
import "./navbar.scss";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [openUpload, setOpenUpload] = useState(false);
  const [openReg, setOpenReg] = useState(false);
  const { user, dispatch } = useContext(Context);

  const handleLogout = () => {
    logout(dispatch);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleOpenUpload = () => {
    setOpenUpload(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseUpload = () => {
    setOpenUpload(false);
  };

  const handleOpenReg = () => {
    setOpenReg(true);
  };

  const handleCloseReg = () => {
    setOpenReg(false);
  };

  return (
    <div className="navbar">
      <div className="navbarWrapper">
        <div className="logo">
          <span className="logoTitle">Free Lists</span>
        </div>
        <div className="socialIcons">
          <a
            href="https://play.google.com/store/apps/details?id=stpeter.com.freelists"
            className="icon"
            target="_link"
          >
            <Android className="icon" />
          </a>
          <Facebook className="icon" />
          <Twitter className="icon" />
        </div>
      </div>

      <div className="regLogin">
        {!user ? (
          <ul className="reg">
            <li onClick={handleOpenReg} className="regLink link">
              Register
            </li>
            <li className="regLink"> /&nbsp;</li>
            <li onClick={handleOpen} className="regLink link">
              Login
            </li>
          </ul>
        ) : (
          <>
            <span className="salut">Hi, {user.username}</span>
            <span className="logout" onClick={handleLogout}>
              Logout
            </span>
          </>
        )}
      </div>
      {user && (
        <div className="uploadContainer">
          <span onClick={handleOpenUpload} className="upload">
            UPLOAD <UploadIcon />
          </span>
        </div>
      )}
      <>
        <Login handleClose={handleClose} open={open} />
        <Register
          handleCloseReg={handleCloseReg}
          open={open}
          openReg={openReg}
        />
        <Upload handleCloseUpload={handleCloseUpload} openUpload={openUpload} />
      </>
    </div>
  );
};

export default Navbar;
