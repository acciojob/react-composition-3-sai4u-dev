// Tooltip.js - Final refined version

import React, { useState } from 'react';

const Tooltip = ({ text, children }) => {
  const [visible, setVisible] = useState(false);

  const show = () => setVisible(true);
  const hide = () => setVisible(false);

  const childrenArray = React.Children.toArray(children);
  const triggerElement = childrenArray[0];

  // 1. Conditionally render the tooltip text to satisfy the 'should not exist' assertion.
  const tooltipText = visible ? (
    <div
      className="tooltiptext" // This is the 'div' the selector is looking for
      role="tooltip"
    >
      {text}
    </div>
  ) : null;

  let childWithTooltipClass = null;

  if (React.isValidElement(triggerElement)) {
    
    // Get the existing children of the trigger element, flatten them into an array, 
    // and then add the new tooltipText element to the end.
    const originalTriggerChildren = React.Children.toArray(triggerElement.props.children);
    const newChildren = [...originalTriggerChildren, tooltipText];

    // 2. Clone the trigger element to move the 'tooltip' class and inject the new children array.
    childWithTooltipClass = React.cloneElement(triggerElement, {
      // Add 'tooltip' class while preserving existing classes
      className: `${triggerElement.props.className || ''} tooltip`,
      onMouseEnter: show,
      onMouseLeave: hide,
      onFocus: show,
      onBlur: hide,
      tabIndex: 0,
      
      // Inject the tooltipText (the <div>) as a direct child
      children: newChildren,
    });
  }

  // The wrapper is now only a container.
  return (
    <div className="tooltip-container">
      {childWithTooltipClass}
      {/* Render any subsequent children if the component received more than one */}
      {childrenArray.slice(1)} 
    </div>
  );
};

export default Tooltip;