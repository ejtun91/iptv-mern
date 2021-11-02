import "./header.scss";

const Header = () => {
  return (
    <div className="header">
      <div className="headerWrapper">
        <div className="headerTitle">
          Hi folks, website got an update, you have the ability now to register
          and upload your own lists. For now it will be simple. Some playlists
          will be deleted if they get obsolete or not working after few days. A
          feedback system will be available soon to hear some ideas from you.
          Keep tuned.
        </div>
      </div>
    </div>
  );
};

export default Header;
