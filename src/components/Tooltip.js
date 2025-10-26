// Tooltip.js - Final version engineered to satisfy all rigid Cypress tests

import React, { useState } from 'react';

const Tooltip = ({ text, children }) => {
  const [visible, setVisible] = useState(false);

  const show = () => setVisible(true);
  const hide = () => setVisible(false);

  // Use toArray to safely handle scenarios where children might be an array or undefined
  const childrenArray = React.Children.toArray(children);
  const triggerElement = childrenArray[0];

  // 1. Conditionally render the tooltip text. This removes it from the DOM
  //    when hidden, satisfying the failing test's 'should('not.exist')' assertion.
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
    // 2. Clone the trigger element to place the 'tooltip' class on it (e.g., h2.tooltip).
    // 3. Inject the tooltipText (the <div>) as an *extra child* of the trigger element,
    //    satisfying the rigid Cypress selectors like 'h2.tooltip > div'.
    childWithTooltipClass = React.cloneElement(triggerElement, {
      // Add 'tooltip' class while preserving existing classes
      className: `${triggerElement.props.className || ''} tooltip`,
      onMouseEnter: show,
      onMouseLeave: hide,
      onFocus: show,
      onBlur: hide,
      tabIndex: 0,
      
      // Inject the tooltipText (the <div>) as a direct child
      children: [
        triggerElement.props.children, // Original children of the trigger element
        tooltipText // The element the cypress selector is looking for
      ],
    });
  }

  // The wrapper is now only a container, as the trigger element handles the events and class.
  return (
    <div className="tooltip-container">
      {childWithTooltipClass}
      {/* Render any subsequent children if the component received more than one */}
      {childrenArray.slice(1)} 
    </div>
  );
};

export default Tooltip;