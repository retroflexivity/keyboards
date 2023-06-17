var contextID = 0;

var keys = {
  'Backquote': ['ё', 'Ё'],
  'Digit1': ['1', '!'],
  'Digit2': ['2', '"'],
  'Digit3': ['3', '№'],
  'Digit4': ['4', ';'],
  'Digit5': ['5', '%'],
  'Digit6': ['6', ':'],
  'Digit7': ['7', '?'],
  'Digit8': ['8', '*'],
  'Digit9': ['9', '('],
  'Digit0': ['0', ')'],
  'Minus': ['-', '_'],
  'Equal': ['=', '+'],

  'KeyQ': ['й', 'Й'],
  'KeyW': ['ц', 'Ц'],
  'KeyE': ['у', 'У'],
  'KeyR': ['к', 'К'],
  'KeyT': ['е', 'Е'],
  'KeyY': ['н', 'Н'],
  'KeyU': ['г', 'Г'],
  'KeyI': ['ш', 'Ш'],
  'KeyO': ['щ', 'Щ'],
  'KeyP': ['з', 'З'],
  'BracketLeft': ['х', 'Х'],
  'BracketRight': ['ъ', 'Ъ'],
  'Backslash': ["—", '/'],

  'KeyA': ['ф', 'Ф'],
  'KeyS': ['ы', 'Ы'],
  'KeyD': ['в', 'В'],
  'KeyF': ['а', 'А'],
  'KeyG': ['п', 'П'],
  'KeyH': ['р', 'Р'],
  'KeyJ': ['о', 'О'],
  'KeyK': ['л', 'Л'],
  'KeyL': ['д', 'Д'],
  'Semicolon': ['ж', 'Ж'],
  'Quote': ['э', 'Э'],

  'KeyZ': ['я', 'Я'],
  'KeyX': ['ч', 'Ч'],
  'KeyC': ['с', 'С'],
  'KeyV': ['м', 'М'],
  'KeyB': ['и', 'И'],
  'KeyN': ['т', 'Т'],
  'KeyM': ['ь', 'Ь'],
  'Comma': ['б', 'Б'],
  'Period': ['ю', 'Ю'],
  'Slash': ['.', ',']
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
