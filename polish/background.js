var contextID = 0;

var keys = {
  // 'Backquote': ['ё', 'Ё'],
  'KeyQ': ['ą', 'Ą'],
  'KeyW': ['w', 'W'],
  'KeyE': ['f', 'F'],
  'KeyR': ['p', 'P'],
  'KeyT': ['g', 'G'],
  'KeyY': ['j', 'J'],
  'KeyU': ['l', 'L'],
  'KeyI': ['u', 'U'],
  'KeyO': ['y', 'Y'],
  'KeyP': ['ę', 'Ę'],
  'BracketLeft': [';', ':'],
  'BracketRight': ['{', '}'],
  'Backslash': ["—", '/'],

  'KeyA': ['a', 'A'],
  'KeyS': ['r', 'R'],
  'KeyD': ['s', 'S'],
  'KeyF': ['t', 'T'],
  'KeyG': ['d', 'D'],
  'KeyH': ['h', 'H'],
  'KeyJ': ['n', 'N'],
  'KeyK': ['e', 'E'],
  'KeyL': ['i', 'I'],
  'Semicolon': ['o', 'O'],
  'Quote': ["'", '"'],

  'KeyZ': ['z', 'Z'],
  'KeyX': ['ż', 'Ż'],
  'KeyC': ['c', 'C'],
  'KeyV': ['ł', 'Ł'],
  'KeyB': ['b', 'B'],
  'KeyN': ['k', 'K'],
  'KeyM': ['m', 'M'],
  'Comma': [',', '<'],
  'Period': ['.', '>'],
  'Slash': ['/', '?']
};

var keys_alt = {
  'KeyD': ['ś', 'Ś'],
  'KeyJ': ['ń', 'Ń'],
  'Semicolon': ['ó', 'Ó'],
  'KeyZ': ['ź', 'Ź'],
  'KeyC': ['ć', 'Ć']
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
          !keyData.ctrlKey && !keyData.altKey && !keyData.metaKey) {
        if (keys[keyData.code]) {
          let shifted = keyData.capsLock ^ keyData.shiftKey;

          if ((keyData.altgrKey) && (keyData.code in keys_alt)) {
            console.error('alt');
            emit = keys_alt[keyData.code][shifted]
          }
          else {
            emit = keys[keyData.code][shifted]
          }
          
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
