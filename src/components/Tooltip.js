import React, { useState } from "react";

const Tooltip = ({ text, children }) => {
  const [visible, setVisible] = useState(false);

  // handle multiple children
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

        {/* outer div always exists, tooltiptext div appears only on hover */}
        <div>
          {visible && (
            <div className="tooltiptext" role="tooltip">
              {text}
            </div>
          )}
        </div>
      </Tag>

      {rest}
    </>
  );
};

export default Tooltip;
