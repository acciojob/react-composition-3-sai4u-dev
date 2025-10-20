import React, { useState } from "react";
import "./../styles/App.css";

const Tooltip = ({ text, children }) => {
  const [visible, setVisible] = useState(false);

  // Clone child to inject class and events, and manually merge existing props
  return React.cloneElement(children, {
    className: `${children.props.className || ""} tooltip`.trim(),
    onMouseEnter: () => setVisible(true),
    onMouseLeave: () => setVisible(false),
    // Render the tooltip <div> directly inside the child element
    children: (
      <>
        {children.props.children}
        {visible && <div>{text}</div>}
      </>
    ),
  });
};

function App() {
  return (
    <div style={{ padding: "50px" }}>
      <Tooltip text="This is a tooltip">
        <h2>Hover over me</h2>
      </Tooltip>

      <br />

      <Tooltip text="Another tooltip example">
        <p>Hover over me to see another tooltip</p>
      </Tooltip>
    </div>
  );
}

export default App;
