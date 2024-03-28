var contextID = 0;

var keys = {
  'KeyQ': ['ɵ', 'q'],
  'KeyW': ['w', 'w'],
  'KeyE': ['š', 'f'],
  'KeyR': ['p', 'p'],
  'KeyT': ['ŋ', 'g'],
  'KeyY': ['j', 'j'],
  'KeyU': ['l',  'l'],
  'KeyI': ['u', 'u'],
  'KeyO': ['ʉ', 'y'],
  'KeyP': ['ă', ':'],
  'Backslash': ["'", ';'],

  'KeyA': ['a', 'a'],
  'KeyS': ['r', 'r'],
  'KeyD': ['s', 's'],
  'KeyF': ['t', 't'],
  'KeyG': ['λ', 'd'],
  'KeyH': ['ə', 'h'],
  'KeyJ': ['n', 'n'],
  'KeyK': ['e', 'e'],
  'KeyL': ['i', 'i'],
  'Semicolon': ['o', 'o'],
  'Quote': ['ɛ', '"'],

  'KeyZ': ['λˊ', 'z'],
  'KeyX': ['χ', 'x'],
  'KeyC': ['tˊ', 'c'],
  'KeyV': ['ś', 'v'],
  'KeyB': ['ń', 'b'],
  'KeyN': ['k', 'k'],
  'KeyM': ['m', 'm'],
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

      if (keyData.type == 'keydown' && 
          !keyData.ctrlKey && !keyData.altKey && !keyData.altgrKey && !keyData.metaKey) {
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
