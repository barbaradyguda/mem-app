import React, { useEffect, useState } from "react";
import axios from "axios";

const Mem = () => {
    const [memUrls, setMemUrls] = useState([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [currentMemUrl, setCurrentMemUrl] = useState("")

    useEffect(() => {
        getMemData()
    }, []);


    useEffect(() => {
        setCurrentUrl()
    }, [currentIndex]);

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
        setCurrentMemUrl(urls[0])
    }

    const setCurrentUrl = () => {
        setCurrentMemUrl(memUrls[currentIndex])
    }

    return (

        <div style={{ display: "flex", justifyContent: "center", backgroundColor: "#eaeaea", alignItems: "center", height: "100vh" }}>

            {currentIndex !== 0 && <button onClick={() => setCurrentIndex(currentIndex - 1)}>Prev</button>}
            <img src={currentMemUrl} width="50%" />
            {currentIndex !== 100 && <button onClick={() => setCurrentIndex(currentIndex + 1)}>Next</button>}

        </div>
    )
}

export default Mem