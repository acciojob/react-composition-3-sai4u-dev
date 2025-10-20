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
       <h2 class="tooltip">
  Hover over me
  <div>This is a tooltip</div>
</h2>

      </Tooltip>

      <br />

      <Tooltip text="Another tooltip example">
       <p class="tooltip">
  Hover over me to see another tooltip
  <div>Another tooltip example</div>
</p>
      </Tooltip>
    </div>
  );
}

export default App;
