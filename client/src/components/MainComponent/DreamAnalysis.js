import React, { useEffect, useState, useRef } from "react";
import Loader from "../Loader/Loader";
import StaticLoader from "../StaticLoader/StaticLoader";
import { useNavigate } from "react-router-dom";
import getDate from "../../helper/date";

function DreamAnalysis({
  dataFromDreamInput,
  dataFromDreamResponse,
  loadingStatus,
}) {
  const [responseData, setResponseData] = useState(dataFromDreamResponse);
  const [inputData, setInputData] = useState(dataFromDreamInput);
  const [loaderRefresh, setLoaderRefresh] = useState(false);
  let navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(getDate());

  useEffect(() => {
    // Update responseData when dataFromDreamResponse changes
    setResponseData(dataFromDreamResponse);
    setInputData(dataFromDreamInput);
  }, [dataFromDreamResponse, dataFromDreamInput]);

  useEffect(() => {
    if (!dataFromDreamInput) {
      // Clear responseData when input is cleared
      setResponseData("");
    }
  }, [dataFromDreamInput]);

  function handleSave() {
    const userId = 1; // Assuming a fixed user ID for demonstration
    const dream = inputData; // Assuming `responseData` contains the dream description
    const currentDate = new Date().toISOString().slice(0, 10);
    const analysis = responseData;

    console.log("Posting:", {
      user_id: userId,
      date: currentDate,
      dream: dream,
      analysis: analysis,
    });

    fetch(`${process.env.REACT_APP_BACKEND_URL}/save-journal`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: userId,
        date: currentDate,
        dream: dream,
        analysis: analysis,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
      navigate("/journal");
  }

  return (
    <>
      {!loadingStatus && !responseData && <StaticLoader />}
      {loadingStatus && <Loader />}
      {!loadingStatus && responseData && dataFromDreamInput && (
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
            style={{ paddingLeft: "2em", paddingRight: "2em" }}
          >
            Save
          </button>
        </>
      )}
    </>
  );
}

export default DreamAnalysis;
