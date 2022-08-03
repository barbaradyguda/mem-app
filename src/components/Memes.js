import React, { useEffect, useState } from "react";
import axios from "axios";

const Mem = () => {
    const [memUrls, setMemUrls] = useState([])
    const [currentIndexLeft, setCurrentIndexLeft] = useState(0)
    const [currentIndexRight, setCurrentIndexRight] = useState(0)
    const [currentMemUrlLeft, setCurrentMemUrlLeft] = useState("")
    const [currentMemUrlRight, setCurrentMemUrlRight] = useState("")

    useEffect(() => {
        getMemData()
    }, []);

    useEffect(() => {
        setCurrentUrlLeft()
    }, [currentIndexLeft]);

    useEffect(() => {
        setCurrentUrlRight()
    }, [currentIndexRight]);

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

    const setCurrentUrlLeft = () => {
        setCurrentMemUrlLeft(memUrls[currentIndexLeft])
    }

    const setCurrentUrlRight = () => {
        setCurrentMemUrlRight(memUrls[currentIndexRight])
    }

    return (

        <div style={{ display: "flex", justifyContent: "center", backgroundColor: "#eaeaea", alignItems: "center", height: "100vh" }}>
            <div style={{ width: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {currentIndexLeft !== 0 && <button onClick={() => setCurrentIndexLeft(currentIndexLeft - 1)}>Prev</button>}
                <img src={currentMemUrlLeft} width="50%" />
                {currentIndexLeft !== 100 && <button onClick={() => setCurrentIndexLeft(currentIndexLeft + 1)}>Next</button>}
            </div>
            <div style={{ width: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {currentIndexRight !== 0 && <button onClick={() => setCurrentIndexRight(currentIndexRight - 1)}>Prev</button>}
                <img src={currentMemUrlRight} width="50%" />
                {currentIndexRight !== 100 && <button onClick={() => setCurrentIndexRight(currentIndexRight + 1)}>Next</button>}
            </div>

        </div>
    )
}

export default Mem