import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../components/header/Header";
import ListItems from "../components/listItems/ListItems";
import ReactGA from "react-ga";
import "./home.scss";
import { axiosInstance } from "../requestMethod";

const Home = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    ReactGA.initialize("UA-76137557-4");
    // ReactGA.pageview("/");
  }, []);

  // useEffect(() => {
  //   const getList = async () => {
  //     const res = await axios
  //       .get(process.env.REACT_APP_API_URL)
  //       .then((item) => setList(item.data))
  //       .catch((error) => console.log(error));
  //   };
  //   getList();
  // }, []);

  useEffect(() => {
    const getPlaylists = async () => {
      const res = await axiosInstance.get("/playlists");
      setList(res.data);
    };
    getPlaylists();
  }, []);

  return (
    <div className="home">
      <Header />
      <ListItems list={list} />
    </div>
  );
};

export default Home;
