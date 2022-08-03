import React, { useEffect, useState } from "react";

const Mem = ({ memUrls,currentMemUrl, setCurrentMemUrl }) => {

    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        setCurrentUrl()
    }, [currentIndex]);


    const setCurrentUrl = () => {
        setCurrentMemUrl(memUrls[currentIndex])
    }

    return (

        <div style={{ width: "50vw", display: "flex", justifyContent: "center", backgroundColor: "#eaeaea", alignItems: "center", height: "100vh" }}>

            {currentIndex !== 0 && <button onClick={() => setCurrentIndex(currentIndex - 1)}>Prev</button>}
            <img src={currentMemUrl} width="50%" />
            {currentIndex !== 100 && <button onClick={() => setCurrentIndex(currentIndex + 1)}>Next</button>}

        </div>
    )
}

export default Mem