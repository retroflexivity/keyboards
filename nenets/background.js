var contextID = 0;
var breve_on = false;

var keys = {
  'KeyQ': ['q', 'q'], //
  'KeyW': ['w', 'w'],
  'KeyE': ['æ', 'f'], //
  'KeyR': ['p', 'p'],
  'KeyT': ['ŋ', 'g'],
  'KeyY': ['j', 'j'],
  'KeyU': ['l',  'l'],
  'KeyI': ['u', 'u'],
  'KeyO': ['y', 'y'], //
  'KeyP': [';', ':'],
  'Backslash': ["\\", ''],

  'KeyA': ['a', 'a'],
  'KeyS': ['λ', 'r'],
  'KeyD': ['s', 's'],
  'KeyF': ['t', 't'],
  'KeyG': ['dʹ', 'd'],
  'KeyH': ['ʔ', 'h'],
  'KeyJ': ['n', 'n'],
  'KeyK': ['e', 'e'],
  'KeyL': ['i', 'i'],
  'Semicolon': ['o', 'o'],
  'Quote': ['ʹ', "'"],

  'KeyZ': ['ʹ', 'z'],
  'KeyX': ['x', 'x'],
  'KeyC': ['č', 'c'],
  'KeyV': ['°', 'v'],
  'KeyB': ['̆', 'b'],
  'KeyN': ['k', 'k'],
  'KeyM': ['m', 'm'],
  'Slash': ['/', '?']
};

var breved_letters = {
  'a': 'ă',
  'e': 'ĕ',
  'i': 'ĭ',
  'o': 'ŏ',
  'u': 'ŭ',
  'æ': 'æ̆',
  'ʔ': 'ʰ'
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
          !keyData.ctrlKey && !keyData.altKey && !keyData.altgrKey && !keyData.metaKey && !keyData.capsLock) {
        if (keys[keyData.code]) {
          let shifted = keyData.capsLock ^ keyData.shiftKey;

          // if (breve_on && keys_br[keyData.code][shifted] != null) {
          //   let emit = keys_br[keyData.code][shifted];
          // }
          // else {
            let emit = keys[keyData.code][shifted];
          // }

          if (emit != null && contextID != 0) {
            if (breve_on && breved_letters[emit] != null) {
              emit = breved_letters[emit];
            };
            if (emit == 'breve') {
              breve_on = true;
            }
            else {
              chrome.input.ime.commitText({
                'contextID': contextID,
                'text': emit,
              }, () => {
                if (chrome.runtime.lastError) {
                  console.error('Error committing text:', chrome.runtime.lastError);
                  return;
                }
              });
              breve_on = false;
            }
          }
          handled = true;
        }
      }
      return handled;
});
