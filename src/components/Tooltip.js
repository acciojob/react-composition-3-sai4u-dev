// Tooltip.js - Fixed to handle multiple children while satisfying Cypress tests

import React, { useState } from 'react';

const Tooltip = ({ text, children }) => {
  const [visible, setVisible] = useState(false);

  const show = () => setVisible(true);
  const hide = () => setVisible(false);

  // 1. Convert children to an array to handle multiple/no children safely
  const childrenArray = React.Children.toArray(children);
  
  // 2. Safely get the first child (the element that is hovered)
  const triggerElement = childrenArray[0];

  let childWithTooltipClass = null;
  
  // Only attempt to clone and assign props if a valid element exists
  if (React.isValidElement(triggerElement)) {
    // We clone the trigger element to move the 'tooltip' class and event handlers 
    // onto it, which is required to pass the failing Cypress selectors (e.g., h2.tooltip).
    childWithTooltipClass = React.cloneElement(triggerElement, {
      // Preserve existing class names
      className: `${triggerElement.props.className || ''} tooltip`,
      onMouseEnter: show,
      onMouseLeave: hide,
      onFocus: show,
      onBlur: hide,
      tabIndex: 0,
    });
  }

  // 3. The tooltip text must be conditionally rendered (removed from the DOM)
  // to satisfy the 'should not show tooltip on mouse leave' test's 'should('not.exist')' assertion.
  const tooltipText = visible ? (
    <div
      className="tooltiptext"
      role="tooltip"
    >
      {text}
    </div>
  ) : null;

  return (
    // The wrapper container (not the element that receives the 'tooltip' class)
    <div className="tooltip-container">
      {/* The first child with the 'tooltip' class and event handlers */}
      {childWithTooltipClass}
      
      {/* The remaining children (if any) are rendered after the trigger element */}
      {childrenArray.slice(1)}

      {/* The conditionally rendered tooltip text */}
      {tooltipText}
    </div>
  );
};

export default Tooltip;