// Tooltip.js
import React, { useState } from 'react';

const Tooltip = ({ text, children }) => {
  const [visible, setVisible] = useState(false);

  const show = () => setVisible(true);
  const hide = () => setVisible(false);

  return (
    <div
      className="tooltip"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
      tabIndex={0}
    >
      {children}
      <div
        className="tooltiptext"
        role="tooltip"
        aria-hidden={!visible}
        style={{ display: visible ? 'block' : 'none' }}
      >
        {text}
      </div>
    </div>
  );
};

export default Tooltip;