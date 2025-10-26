import React, { useState } from "react";

const Tooltip = ({ text, children }) => {
  const [visible, setVisible] = useState(false);

  // We expect multiple children, like <h2> and <hr />
  const trigger = Array.isArray(children) ? children[0] : children;
  const rest = Array.isArray(children) ? children.slice(1) : null;

  // Safely get properties of the trigger element
  const { type: Tag, props } = trigger;

  // Use props.className if provided, otherwise add 'tooltip'
  const className = props.className?.includes('tooltip')
    ? props.className
    : `${props.className ? props.className + ' ' : ''}tooltip`;

  return (
    <>
      <Tag
        {...props}
        className={className}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        onFocus={() => setVisible(true)}
        onBlur={() => setVisible(false)}
        tabIndex={0}
      >
        {props.children}
        {visible && (
          <div className="tooltiptext" role="tooltip">
            {text}
          </div>
        )}
      </Tag>

      {rest}
    </>
  );
};

export default Tooltip;
