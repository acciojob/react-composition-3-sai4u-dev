import React, { useState } from "react";

const Tooltip = ({ text, children }) => {
  const [visible, setVisible] = useState(false);

  const trigger = Array.isArray(children) ? children[0] : children;
  const rest = Array.isArray(children) ? children.slice(1) : null;

  if (!trigger || !trigger.type) return null;

  const Tag = trigger.type;
  const props = trigger.props || {};

  const className = props.className?.includes("tooltip")
    ? props.className
    : `${props.className ? props.className + " " : ""}tooltip`;

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
        <div className="tooltiptext" role="tooltip">
          {visible ? text : ""}
        </div>
      </Tag>
      {rest}
    </>
  );
};

export default Tooltip;
