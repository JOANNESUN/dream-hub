/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import "./Button.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Loader from "./components/Loader/Loader";
import StaticLoader from "./components/StaticLoader/StaticLoader";

function App() {
  const [inputQuery, setInputQuery] = useState("");
  const [response, setResponse] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const textAreaRef = useRef();
  const [wordCount, setWordCount] = useState(0);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (inputQuery === "") {
      setLoader(false);
      setResponse("");
    }
  }, [inputQuery]);

  function handleInput(e) {
    e.preventDefault();
    const text = textAreaRef.current.value;
    setWordCount(text.split(" ").length);
    setInputQuery(e.target.value);
    setErrorMsg("");
    if (text === "") {
      setLoader(false);
      setResponse("");
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const wordCount = inputQuery.trim().split(/\s+/).length;

    if (wordCount < 5 || wordCount > 30) {
      setErrorMsg(
        "Please enter a dream description between 5 and 30 characters."
      );
      setResponse("");
      setLoader(false);
      return;
    }
    setLoader(true);
    fetch(`${process.env.REACT_APP_BACKEND_URL}/generate-text`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: inputQuery }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("frontend res=>", data.reply);
        setResponse(data.reply);
        setLoader(false);
      })
      .catch((error) => {
        console.error("Error posting to the server:", error);
      });
  }

  const shouldShowStaticLoader = !response && !loader;
  const shouldShowLoader = loader;
  const shouldShowResponse = !loader && response;

  function handleSave(){
    console.log(inputQuery, response)
  }

  return (
    <div>
      <Header />
      <div className="container">
        <form className="mainColumns" onSubmit={handleSubmit}>
          <h1 className="oxygenBold">
            Share your dream here, and we'll unveil deeper meanings and insights
            hidden within.
          </h1>
          <div className="inputWrapper">
            <textarea
              className="inputField"
              ref={textAreaRef}
              onChange={handleInput}
              value={inputQuery}
              required
            />
            <span className="wordCount">word counts: {wordCount}</span>
          </div>
          <p className="errorMsg">{errorMsg}</p>
          <button className="video-game-button" type="submit">
            Submit
          </button>
        </form>
        <div>
          {shouldShowStaticLoader && <StaticLoader />}
          {shouldShowLoader && <Loader />}
          {shouldShowResponse && (
            <>
              <textarea
                readOnly
                className="interpretationField"
                value={response}
              ></textarea>
              <button className="video-game-button" type="submit" onClick={handleSave}>
                Save your dream and analysis
              </button>
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
