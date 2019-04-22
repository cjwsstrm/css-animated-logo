// Font-size calculations are the equivalent of using vmax. E.g. calc(35 * (1vw + 1vh - 1vmin)) is the same as 35vmax.
window.addEventListener('DOMContentLoaded', function(event) {
  console.log('DOM fully loaded and parsed');
  // Array.from polyfill from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from
  // Production steps of ECMA-262, Edition 6, 22.1.2.1
  if (!Array.from) {
    Array.from = (function () {
      var toStr = Object.prototype.toString;
      var isCallable = function (fn) {
        return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
      };
      var toInteger = function (value) {
        var number = Number(value);
        if (isNaN(number)) { return 0; }
        if (number === 0 || !isFinite(number)) { return number; }
        return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
      };
      var maxSafeInteger = Math.pow(2, 53) - 1;
      var toLength = function (value) {
        var len = toInteger(value);
        return Math.min(Math.max(len, 0), maxSafeInteger);
      };

      // The length property of the from method is 1.
      return function from(arrayLike/*, mapFn, thisArg */) {
        // 1. Let C be the this value.
        var C = this;

        // 2. Let items be ToObject(arrayLike).
        var items = Object(arrayLike);

        // 3. ReturnIfAbrupt(items).
        if (arrayLike == null) {
          throw new TypeError('Array.from requires an array-like object - not null or undefined');
        }

        // 4. If mapfn is undefined, then let mapping be false.
        var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
        var T;
        if (typeof mapFn !== 'undefined') {
          // 5. else
          // 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
          if (!isCallable(mapFn)) {
            throw new TypeError('Array.from: when provided, the second argument must be a function');
          }

          // 5. b. If thisArg was supplied, let T be thisArg; else let T be undefined.
          if (arguments.length > 2) {
            T = arguments[2];
          }
        }

        // 10. Let lenValue be Get(items, "length").
        // 11. Let len be ToLength(lenValue).
        var len = toLength(items.length);

        // 13. If IsConstructor(C) is true, then
        // 13. a. Let A be the result of calling the [[Construct]] internal method 
        // of C with an argument list containing the single item len.
        // 14. a. Else, Let A be ArrayCreate(len).
        var A = isCallable(C) ? Object(new C(len)) : new Array(len);

        // 16. Let k be 0.
        var k = 0;
        // 17. Repeat, while k < len… (also steps a - h)
        var kValue;
        while (k < len) {
          kValue = items[k];
          if (mapFn) {
            A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
          } else {
            A[k] = kValue;
          }
          k += 1;
        }
        // 18. Let putStatus be Put(A, "length", len, true).
        A.length = len;
        // 20. Return A.
        return A;
      };
    }());
  }
  // End of polyfill

  const input = Array.from(document.querySelectorAll('input'));
  const button = document.querySelector('button');
  const contentAreas = Array.from(document.querySelectorAll('.content'));
  const redTextContainers = Array.from(document.querySelectorAll('.red-text'));
  const blueTextContainer = document.querySelector('.blue-text');
  
  // check for changes in each input field
  input.forEach(function(element) {
    element.addEventListener('keyup', changeText);
  });

  // trigger text animation on button being pressed
  button.addEventListener('click', animateAndSpeak);
  
  // change corresponding area on the logo
  function changeText(e) {
    let targetElementClass = e.srcElement.id; 
    contentAreas.forEach(function(element) {
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
        setFontsize = 'calc(12 * (1vw + 1vh - 1vmin))';
      }
      if (longestredString > 1) {
        // Move content upwards
        blueTextContainer.style.paddingBottom = 'calc(12 * (1vw + 1vh - 1vmin))';
      }
      if (longestredString === 2) {
        setFontsize = 'calc(6 * (1vw + 1vh - 1vmin))';
      }
      if (longestredString === 3) {
        setFontsize = 'calc(5 * (1vw + 1vh - 1vmin))';
      }
      if (longestredString >= 4) {
        setFontsize = 'calc(3.5 * (1vw + 1vh - 1vmin))';
      }
      element.style.fontSize = setFontsize;
    });
    // update fontsize for blue text container
    if (blueTextContainer.textContent.length > 6) {
      blueTextContainer.style.fontSize = 'calc(3 * (1vw + 1vh - 1vmin))';
    } else {
      blueTextContainer.style.fontSize = 'calc(5 * (1vw + 1vh - 1vmin))';
    }
  }

  // animate the logo
  function animateLogo() {
    let logoContainerContent = Array.from(document.querySelector('.logo-container').children);
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
  
  // 1. Implement text to speech when animateText is triggered -> https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API/Using_the_Web_Speech_API
  // 2. Have text to speech match the animation flow
  var synth = window.speechSynthesis;
  var voiceSelect = document.querySelector('select');
  var voices = [];

  function populateVoiceList() {
    if (voices.length === 0) {
      voices = synth.getVoices();
    
      for(i = 0; i < voices.length ; i++) {
        var option = document.createElement('option');
        option.textContent = voices[i].name + ' (' + voices[i].lang + ')';
        
        if(voices[i].default) {
          option.textContent += ' -- DEFAULT';
        }
    
        option.setAttribute('data-lang', voices[i].lang);
        option.setAttribute('data-name', voices[i].name);
        voiceSelect.appendChild(option);
      }
    }

    }
  populateVoiceList();
  if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
  }

  function speakText(element) {
    var utterThis = new SpeechSynthesisUtterance(element.textContent);
    var selectedOption = voiceSelect.selectedOptions[0].getAttribute('data-name');
    for(i = 0; i < voices.length ; i++) {
      if(voices[i].name === selectedOption) {
        utterThis.voice = voices[i];
      }
    }
    // utterThis.pitch = pitch.value;
    // utterThis.rate = rate.value;
    synth.speak(utterThis);
  }

  function animateAndSpeak() {
    animateLogo();
    contentAreas.forEach(function(element) {
      speakText(element);
    });
  }

});
