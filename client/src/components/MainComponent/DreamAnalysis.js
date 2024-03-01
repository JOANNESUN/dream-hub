import React, { useEffect, useState, useRef } from "react";
import Loader from "../Loader/Loader";
import StaticLoader from "../StaticLoader/StaticLoader";

function DreamAnalysis({ dataFromDreamInput, dataFromDreamResponse, loadingStatus }) {
    const [responseData, setResponseData] = useState(dataFromDreamResponse);
    const [inputData, setInputData] = useState(dataFromDreamInput);
    const [loaderRefresh, setLoaderRefresh] = useState(false);



    useEffect(() => {
        // Update responseData when dataFromDreamResponse changes
        setResponseData(dataFromDreamResponse);
      }, [dataFromDreamResponse]);
    
      useEffect(() => {
        if (!dataFromDreamInput) {
          // Clear responseData when input is cleared
          setResponseData("");
        }
      }, [dataFromDreamInput]);

  function handleSave() {
    console.log("hi");
  }

  return (
    <>
     {!loadingStatus && !responseData && <StaticLoader />}
      {loadingStatus && <Loader />}
      {!loadingStatus && responseData && dataFromDreamInput &&(
        <>
          <textarea
            readOnly
            className="interpretationField"
            value={responseData}
          ></textarea>
          <button
            className="video-game-button"
            type="submit"
            onClick={handleSave}
            style={{paddingLeft: "2em", paddingRight: "2em"}}
          >
            Save
          </button>
        </>
      )}
    </>
  );
}

export default DreamAnalysis;
