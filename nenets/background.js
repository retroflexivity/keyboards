var contextID = 0;

var keys = {
  'KeyQ': ['ɵ', 'Q'],
  // 'KeyW': ['w', 'W'],
  'KeyE': ['š', 'F'],
  'KeyR': ['p', 'P'],
  'KeyT': ['ŋ', 'G'],
  // 'KeyY': ['j', 'J'],
  // 'KeyU': ['l',  'L'],
  'KeyI': ['u', 'U'],
  'KeyO': ['ʉ', 'Y'],
  'KeyP': ['ă', ':'],
  'Backslash': ["'", ';'],

  // 'KeyA': ['a', 'A'],
  // 'KeyS': ['r', 'R'],
  // 'KeyD': ['s', 'S'],
  // 'KeyF': ['t', 'T'],
  'KeyG': ['λ', 'D'],
  'KeyH': ['ə', 'H'],
  // 'KeyJ': ['n', 'N'],
  // 'KeyK': ['e', 'E'],
  'KeyL': ['i', 'I'],
  // 'Semicolon': ['o', 'O'],
  'Quote': ['ɛ', '"'],

  'KeyZ': ['λˊ', 'Z'],
  'KeyX': ['χ', 'X'],
  'KeyC': ['tˊ', 'C'],
  'KeyV': ['ś', 'V'],
  'KeyB': ['ń', 'B'],
  // 'KeyN': ['k', 'K'],
  // 'KeyM': ['m', 'M'],
};


chrome.input.ime.onFocus.addListener(
    function(context) {
      contextID = context.contextID;
    }
);

chrome.input.ime.onBlur.addListener(() => {
  contextID = 0;
})


chrome.input.ime.onKeyEvent.addListener(
    function(engineID, keyData) {
      var handled = false;

      if (keyData.type == 'keydown') {
        if (keys[keyData.code]) {
          let shifted = keyData.capsLock ^ keyData.shiftKey;
          let emit = keys[keyData.code][shifted];

          if (emit != null && contextID != 0) {
            chrome.input.ime.commitText({
              'contextID': contextID,
              'text': emit,
            }, () => {
              if (chrome.runtime.lastError) {
                console.error('Error committing text:', chrome.runtime.lastError);
                return;
              }
            });
          }
          handled = true;
        }
      }
      return handled;
});
