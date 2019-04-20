window.addEventListener('DOMContentLoaded', (event) => {
  console.log('DOM fully loaded and parsed');
  const input = document.querySelectorAll('input');
  const contentAreas = document.querySelectorAll('.content');
  const redTextContainers = document.querySelectorAll('.red-text');
  const blueTextContainer = document.querySelector('.blue-text');
  // Regexp for testing certain characters that take up more space (for font resizing)
  const characterCheck = RegExp(/^[wWmM]+$/);
  let largeCharacterPresent;
  
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
        changeFontSize(element);
      }
    })
  }

// change fontsize based on number of characters

// Add variable for current largest red text string length and check that variable before changing font size
function changeFontSize(element) {
  if (element.classList.contains('red-text')) {
    if (element.textContent.length === 1) {
      // Reset content position
      blueTextContainer.style.paddingBottom = '0';
      redTextContainers.forEach(function(element) {
      if (characterCheck.test(element.textContent)) {
        console.log(`Text includes W or M. Value = ${element.textContent}`);
        largeCharacterPresent = true;
        setFontsize = '12vmax';
      }
      else if (!largeCharacterPresent) {
        console.log(`Text does NOT include W or M. Value = ${element.textContent}`);
        setFontsize = '14vmax';
      }
    });
    largeCharacterPresent = false;
  }
    if (element.textContent.length > 1) {
      // Move content upwards
      blueTextContainer.style.paddingBottom = '10vmax';
    }
    if (element.textContent.length === 2) {
      setFontsize = '6vmax';
    }
    if (element.textContent.length === 3) {
      setFontsize = '5vmax';
    }
    if (element.textContent.length >= 4) {
      setFontsize = '3.5vmax';
    }
  }
  if (element.classList.contains('blue-text')) {
    if (element.textContent.length > 6) {
      element.style.fontSize = '3.5vmax';
    }
  }
  redTextContainers.forEach(function(element) {
    element.style.fontSize = setFontsize;
  })
}

// Implement text to speech when animateText is triggered -> https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API/Using_the_Web_Speech_API
// Have text to speech match the animation flow

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