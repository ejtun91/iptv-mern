import Modal from "../modal/Modal";
import { useState } from "react";
import Item from "../item/Item";
import "./listitems.scss";
import { v4 as uuidv4 } from "uuid";

const ListItems = ({ list }) => {
  const [displayModal, setDisplayModal] = useState(false);
  const [url, setUrl] = useState("");
  const [date, setDate] = useState("");
  const [item, setItem] = useState({});
  const [cats, setCats] = useState([]);

  const handleModal = (item) => {
    setDisplayModal(!displayModal);
    setUrl(item.link);
    setDate(item.createdAt);
    setItem(item);
    setCats(item.categories);
  };

  return (
    <div className="listItem">
      <div className="listItemWrapper">
        {list
          .map((item, i) => (
            <div
              key={uuidv4()}
              onClick={() => handleModal(item)}
              className="itemLink"
            >
              <Item item={item} />
            </div>
          ))
          .reverse()}
        <Modal
          item={item}
          cats={cats}
          url={url}
          date={date}
          setDisplayModal={setDisplayModal}
          displayModal={displayModal}
        />
      </div>
    </div>
  );
};

export default ListItems;
