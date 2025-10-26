import React, { useState } from 'react';

const Tooltip = ({ text, children }) => {
  const [visible, setVisible] = useState(false);

  const show = () => setVisible(true);
  const hide = () => setVisible(false);

  // 1. Convert children to an array to safely handle multiple children (like h2 and hr).
  const childrenArray = React.Children.toArray(children);
  const triggerElement = childrenArray[0];

  // 2. Conditionally render the tooltip text. This removes it from the DOM
  //    when hidden, satisfying the 'should not exist' assertion of the first passing test.
  const tooltipText = visible ? (
    <div
      className="tooltiptext" // This is the 'div' the selectors (h2.tooltip > div) are looking for
      role="tooltip"
    >
      {text}
    </div>
  ) : null;

  let childWithTooltipClass = null;

  if (React.isValidElement(triggerElement)) {
    
    // Prepare the new className: add ' tooltip' only if it's not already present.
    const originalClassName = triggerElement.props.className || '';
    const newClassName = originalClassName.includes('tooltip') ? originalClassName : 
                         originalClassName ? `${originalClassName} tooltip` : 'tooltip';
    
    // Get existing children, flatten them, and append the tooltipText (the <div>).
    const originalTriggerChildren = React.Children.toArray(triggerElement.props.children);
    const newChildren = [...originalTriggerChildren, tooltipText];

    // 3. Clone the trigger element to move the 'tooltip' class, event handlers,
    //    and the injected tooltip text (the element the failing tests are looking for).
    childWithTooltipClass = React.cloneElement(triggerElement, {
      className: newClassName,
      onMouseEnter: show,
      onMouseLeave: hide,
      onFocus: show,
      onBlur: hide,
      tabIndex: 0,
      
      // Injecting the tooltipText as a direct child of the trigger element 
      // satisfies the 'ELEMENT.tooltip > div' selectors.
      children: newChildren,
    });
  }

  // 4. Return the cloned trigger element and any subsequent children using a Fragment.
  //    This avoids an extra wrapper <div>, simplifying the DOM structure.
  return (
    <>
      {childWithTooltipClass}
      {/* Render any subsequent children (like the <hr />) after the trigger element */}
      {childrenArray.slice(1)} 
    </>
  );
};

export default Tooltip;
