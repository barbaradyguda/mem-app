import './App.css';
import Mem from "./components/Mem"
import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [memUrls, setMemUrls] = useState([])
  const [currentMemUrlLeft, setCurrentMemUrlLeft] = useState("")
  const [currentMemUrlRight, setCurrentMemUrlRight] = useState("")

  useEffect(() => {
    getMemData()
  }, []);

  const getMemData = async () => {
    await axios
      .get(`https://api.imgflip.com/get_memes`)
      .then(async (response) => {
        const memData = response.data;
        getUrls(memData.data.memes)
      })
      .catch((err) => console.debug(err));
  };

  const getUrls = (memes) => {
    const pluck = (arr, key) => arr.map(i => i[key]);
    let urls = pluck(memes, 'url')
    setMemUrls(urls);
    setCurrentMemUrlLeft(urls[0])
    setCurrentMemUrlRight(urls[0])
  }


  return (
    <div style={{ display: "flex" }}>
      <Mem memUrls={memUrls} currentMemUrl={currentMemUrlLeft} setCurrentMemUrl={setCurrentMemUrlLeft} />
      <Mem memUrls={memUrls} currentMemUrl={currentMemUrlRight} setCurrentMemUrl={setCurrentMemUrlRight} />
    </div>
  );
}

export default App;
