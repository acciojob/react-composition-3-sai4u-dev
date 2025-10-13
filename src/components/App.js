
import React from "react";
import './../styles/App.css';

function Tooltip({ text, children }) {
  return (
    <div className="tooltip">
      {children}
      <span className="tooltiptext">{text}</span>
    </div>
  )
}

function App() {
  return (
    <div style={{ padding: "50px" }}>
      <Tooltip text="This is a tooltip">
        <h3>Hover over me</h3>
      </Tooltip>

      <br />

      <Tooltip text="Another tooltip example">
        <p>Hover over me to see another tooltip</p>
      </Tooltip>
    </div>
  );
}

export default App;
