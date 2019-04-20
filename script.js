window.addEventListener('DOMContentLoaded', (event) => {
  console.log('DOM fully loaded and parsed');
  const input = document.querySelectorAll('input');
  const contentAreas = document.querySelectorAll('.content');
  const redTextContainers = document.querySelectorAll('.red-text');
  const blueTextContainer = document.querySelector('.blue-text');
  
  // check for changes in each input field
  input.forEach(function(element) {
    element.addEventListener('keyup', changeText);
  });
  
  // change corresponding area on the logo
  function changeText(e) {
    let targetElementClass = e.srcElement.id; 
    contentAreas.forEach(element => {
      if (element.classList.contains(targetElementClass)) {
        element.textContent = e.srcElement.value;
        changeFontSize();
      }
    });
  }

// change fontsize based on number of characters. Must check both red text containers and set fontsize for both according to the container with the most characters
function changeFontSize() {
  let redStringLengths = [];
  let longestredString = 0;
  // grab string lengths for each red text container
  redTextContainers.forEach(function(element) {
    redStringLengths.push(element.textContent.length);
  });
  // find longest string
  longestredString = redStringLengths.reduce(function(a, b) {
    return Math.max(a, b);
  });
  // update fontsize for red text containers
  redTextContainers.forEach(function(element) {
    if (longestredString === 1) {
      // Reset content position
      blueTextContainer.style.paddingBottom = '0';
      setFontsize = '12vmax';
    }
    if (longestredString > 1) {
      // Move content upwards
      blueTextContainer.style.paddingBottom = '10vmax';
    }
    if (longestredString === 2) {
      setFontsize = '6vmax';
    }
    if (longestredString === 3) {
      setFontsize = '5vmax';
    }
    if (longestredString >= 4) {
      setFontsize = '3.5vmax';
    }
    element.style.fontSize = setFontsize;
  });
  // update fontsize for blue text container
  if (blueTextContainer.textContent.length > 6) {
    blueTextContainer.style.fontSize = '3.5vmax';
  } else {
    blueTextContainer.style.fontSize = '5vmax';
  }
}

// 1. Implement text to speech when animateText is triggered -> https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API/Using_the_Web_Speech_API
// 2. Have text to speech match the animation flow

});

function animateText() {
  let logoContainerContent = Array.from(document.querySelector('.logo-container').children);
  // console.log(logoContainerContent);
  logoContainerContent.forEach(function(element) {
    if (element.classList.contains('circle-content')) {
      element.classList.remove('fade-in-border');
      element.offsetWidth = element.offsetWidth;
      element.classList.add('fade-in-border');
    }
    else if (element.classList.contains('fourth')) {
      element.classList.remove('animate-slogan');
      element.offsetWidth = element.offsetWidth;
      element.classList.add('animate-slogan');
    } 
    else if (element.classList.contains('animate-title')) {
      element.classList.remove('animate-title');
      element.offsetWidth = element.offsetWidth;
      element.classList.add('animate-title');
    }
  });
}