window.addEventListener('DOMContentLoaded', (event) => {
  console.log('DOM fully loaded and parsed');
  const input = document.querySelectorAll('input');
  const contentAreas = document.querySelectorAll('.content');
  
  // check for changes in each input field
  input.forEach(element => {
    element.addEventListener('keyup', changeText);
  });
  
  // change corresponding area on the logo
  function changeText(e) {
    // console.log(e.srcElement.id);
    let targetElementClass = e.srcElement.id; 
    contentAreas.forEach(element => {
      if (element.classList.contains(targetElementClass)) {
        element.textContent = e.srcElement.value;
      }
    })
  }

// change fontsize based on number of characters 
// function changeFontSize() {}

});

function animateText() {
  const logoContainerContent = document.querySelector('.logo-container').children;
  console.log(logoContainerContent);
  logoContainerContent.forEach(element => {
    if (element.classList.contains('circle-content')) {
      element.classList.remove('fade-in-border');
      element.offsetWidth = element.offsetWidth;
      element.classList.add('fade-in-border');
    }
    if (element.classList.contains('fourth')) {
      element.classList.remove('animate-slogan');
      element.offsetWidth = element.offsetWidth;
      element.classList.add('animate-slogan');
    } else {
      element.classList.remove('animate-title');
      element.offsetWidth = element.offsetWidth;
      element.classList.add('animate-title');
    }
  })
}