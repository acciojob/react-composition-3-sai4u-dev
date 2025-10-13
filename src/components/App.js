
import React, { useState } from "react";
import './../styles/App.css';

const Tooltip = ({ text, children }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div
      className="tooltip"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && <div className="tooltiptext">{text}</div>}
    </div>
  );
};

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
