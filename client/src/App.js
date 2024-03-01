/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import "./Button.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Loader from "./components/Loader/Loader";
import StaticLoader from "./components/StaticLoader/StaticLoader";
import DreamInputField from "./components/MainComponent/DreamInputField";
import DreamAnalysis from "./components/MainComponent/DreamAnalysis";

function App() {
  const [inputQuery, setInputQuery] = useState("");
  const [response, setResponse] = useState("");
  const [loader, setLoader] = useState(false);
  const [inputData, setInputData] = useState("");
  const [responseData, setResponseData] = useState("");

  function handleUpdateInput(inputDataFromChild) {
    setInputData(inputDataFromChild);
  }

  function handleResponseData(responseDataFromChild) {
    setResponseData(responseDataFromChild);
  }

  function handleLoadingStatus(loadingStatus){
    setLoader(loadingStatus);
  }

  useEffect(() => {
    if (inputQuery === "") {
      setLoader(false);
      setResponse("");
    }
  }, [inputQuery]);

  return (
    <div>
      <Header />
      <div className="container">
        <DreamInputField
          handleUpdateInput={handleUpdateInput}
          handleResponseData={handleResponseData}
          handleLoadingStatus={handleLoadingStatus}
        />
        <div>
          <DreamAnalysis
            dataFromDreamInput={inputData}
            dataFromDreamResponse={responseData}
            loadingStatus={loader}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
