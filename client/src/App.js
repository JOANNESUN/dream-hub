/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import "./Button.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import DreamInputField from "./components/MainComponent/DreamInputField";
import DreamAnalysis from "./components/MainComponent/DreamAnalysis";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import DreamTable from "./components/DreamTable/DreamTable";

function App() {
  const [loader, setLoader] = useState(false);
  const [inputData, setInputData] = useState("");
  const [responseData, setResponseData] = useState("");

  function handleUpdateInput(inputDataFromChild) {
    setInputData(inputDataFromChild);
  }

  function handleResponseData(responseDataFromChild) {
    setResponseData(responseDataFromChild);
  }

  function handleLoadingStatus(loadingStatus) {
    setLoader(loadingStatus);
  }

  return (
    <div>
      <BrowserRouter>
        <Header />
        <div className="container">
          <Routes>

            <Route
              path="/"
              element={
                <>
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
                </>
              }
            />
            <Route
              path="/journal"
              element={
                <DreamTable
                  dataFromDreamInput={inputData}
                  dataFromDreamResponse={responseData}
                />
              }
            />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
