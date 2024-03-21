import React, { useEffect, useState, useRef } from "react";
import Loader from "../Loader/Loader";
import StaticLoader from "../StaticLoader/StaticLoader";
import { useNavigate } from "react-router-dom";
import getDate from "../../helper/date";
import "./MainComponent.css";

function DreamAnalysis({
  dataFromDreamInput,
  dataFromDreamResponse,
  loadingStatus,
  loginStatus,
  signupStatus
}) {
  const [responseData, setResponseData] = useState(dataFromDreamResponse);
  const [inputData, setInputData] = useState(dataFromDreamInput);
  let navigate = useNavigate();

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

    if (!loginStatus) {
      alert('Please login or sign up first');
      return;
    }
    const dream = inputData;
    const currentDate = new Date().toISOString().slice(0, 10);
    const analysis = responseData;
    const token = localStorage.getItem("token");
    console.log(token)
    fetch(`${process.env.REACT_APP_BACKEND_URL}/save-journal`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        date: currentDate,
        dream: dream,
        analysis: analysis,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        navigate("/journal");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <>
      {!loadingStatus && !responseData && <StaticLoader />}
      {loadingStatus && <Loader />}
      {!loadingStatus && responseData && dataFromDreamInput && (
        <>
          <textarea
            readOnly
            className="dream-interpretation-box"
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
