import React, { useState, useRef } from "react";
import "../../App.css";
import "./MainComponent.css";

function DreamInputField({
  handleUpdateInput,
  handleResponseData,
  handleLoadingStatus,
}) {
  const [inputQuery, setInputQuery] = useState("");
  const [response, setResponse] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const textAreaRef = useRef();
  const [wordCount, setWordCount] = useState(0);

  function handleSubmit(e) {
    e.preventDefault();
    const wordCount = (inputQuery.trim().split(/\s+/).length);

    if (wordCount < 5 || wordCount > 30) {
      setErrorMsg(
        "Please enter a dream description between 5 and 30 characters."
      );
      setResponse("");
      handleLoadingStatus(false);
      return;
    }
    handleLoadingStatus(true);
    fetch(`${process.env.REACT_APP_BACKEND_URL}/generate-text`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: inputQuery }),
    })
      .then((response) => response.json())
      .then((data) => {
        setResponse(data.reply);
        handleResponseData(data.reply);
        handleLoadingStatus(false);
      })
      .catch((error) => {
        console.error("Error posting to the server:", error);
      });
  }

  function handleInput(e) {
    e.preventDefault();
    const text = textAreaRef.current.value;
    setWordCount(text.split(" ").length);
    setInputQuery(e.target.value);
    handleUpdateInput(e.target.value);
    setErrorMsg("");
    if (text === "") {
      handleLoadingStatus(false);
      setResponse("");
    }
  }
  return (
    <>
      <form className="input-component-container" onSubmit={handleSubmit}>
        <span className="oxygenBold">
          Share your dream here, and we'll unveil deeper meanings and insights
          hidden within.
        </span>

        <div className="inputWrapper">
          <textarea
            className="inputField"
            ref={textAreaRef}
            onChange={handleInput}
            value={inputQuery}
            placeholder="minimum 5 and max 30 characters..."
            required
          />
          <span className="wordCount"> word counts: {wordCount}</span>
        </div>
        <p className="errorMsg">{errorMsg}</p>
        {/* <button
          className={`video-game-button ${response ? "clear-response" : ""}`}
          type="submit"
        >
          {response ? "Clear Input" : "Submit"}
        </button> */}
        {response ? (
          ""
        ) : (
          <button className="video-game-button" type="submit">
            Submit
          </button>
        )}
      </form>
    </>
  );
}

export default DreamInputField;
