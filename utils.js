// *-----------Debounce Helper Function--------------//

const debounceHelper = (func, delay = 1000) => {
  let timeOutId;
  return (...args) => {
    if (timeOutId) {
      clearTimeout(timeOutId);
    } else {
      timeOutId = setTimeout(() => {
        func.apply(null, args);
        // func();
      }, delay);
    }
  };
};

// *-----------Add Element To DOM Function--------------//

const addElementToDOM = (
  variableName,
  className,
  attributeName,
  attributeValue,
  innerHTML
) => {
  if (typeof className !== "string") {
    for (let i = 0; i < className.length; i++) {
      variableName.classList.add(className[i]);
    }
  } else {
    variableName.classList.add(className);
  }

  if (attributeName) variableName.setAttribute(attributeName, attributeValue);

  if (innerHTML) variableName.innerHTML = innerHTML;
};
