/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import "./App.css";
import "./Button.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import DreamInputField from "./components/MainComponent/DreamInputField";
import DreamAnalysis from "./components/MainComponent/DreamAnalysis";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import DreamTable from "./components/DreamTable/DreamTable";
import UserProfile from "./components/UserProfile/UserProfile";
import RedirectOnRefresh from "./components/RefreshRoute";


function App() {
  const [loader, setLoader] = useState(false);
  const [inputData, setInputData] = useState("");
  const [responseData, setResponseData] = useState("");

  useEffect(() => {
    const handleRefresh = (event) => {
      window.location.pathname = '/';
    };

    window.addEventListener('beforeunload', handleRefresh);

    // Clean up the event listener on component unmount
    return () => window.removeEventListener('beforeunload', handleRefresh);
  }, []);

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
      <BrowserRouter basename="/">
        <RedirectOnRefresh />
        <Header />
        <div className="container">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <div className="dream-input">
                    <DreamInputField
                      handleUpdateInput={handleUpdateInput}
                      handleResponseData={handleResponseData}
                      handleLoadingStatus={handleLoadingStatus}
                    />
                  </div>
                  <div className="dream-analysis">
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
                <>
                  <div className="user-profile">
                    <UserProfile />
                  </div>
                  <div className="dream-table-component">
                    <DreamTable
                      dataFromDreamInput={inputData}
                      dataFromDreamResponse={responseData}
                    />
                  </div>
                </>
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
