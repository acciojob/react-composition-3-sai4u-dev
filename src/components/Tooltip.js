import React, { useState } from "react";

const Tooltip = ({ text, children }) => {
  const [visible, setVisible] = useState(false);

  // Handle multiple children (<h2> and <hr />)
  const trigger = Array.isArray(children) ? children[0] : children;
  const rest = Array.isArray(children) ? children.slice(1) : null;

  // Return nothing if trigger isn’t a valid element
  if (!trigger || !trigger.type) return null;

  // Get tag and props
  const Tag = trigger.type;
  const props = trigger.props || {};

  const handleShow = () => setVisible(true);
  const handleHide = () => setVisible(false);

  // Merge or append 'tooltip' class
  const className = props.className?.includes("tooltip")
    ? props.className
    : `${props.className ? props.className + " " : ""}tooltip`;

  // Render element directly with tooltip content inside
  return (
    <>
      <Tag
        {...props}
        className={className}
        onMouseEnter={handleShow}
        onMouseLeave={handleHide}
        onFocus={handleShow}
        onBlur={handleHide}
        tabIndex={0}
      >
        {props.children}
        {visible ? (
          <div className="tooltiptext" role="tooltip">
            {text}
          </div>
        ) : null}
      </Tag>

      {/* Render any siblings (like <hr />) after */}
      {rest}
    </>
  );
};

export default Tooltip;
