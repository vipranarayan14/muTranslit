var tin = document.getElementById("textIn");
var toScript = document.scriptSelector.script;

document.querySelector('#optScriptGroup').addEventListener('change', function () {
  showTranslitMap(toScript.value, document.getElementById("translitMap"));
});

tin.addEventListener('keyup', function(e) {

  if (e.shiftKey && e.keyCode === 32) {

    sel = window.getSelection();
    var selectedRange = sel.getRangeAt(0);
    sel.collapseToStart();
    sel.modify("move", "backward", "word");
    sel.modify("extend", "forward", "word");

    word = sel.toString().trim();

    var hilitedRange = sel.getRangeAt(0);

    var span = document.createElement('span');
    if (toScript.value === "devanagari") {
      span.setAttribute('lang', 'sa');
    } else if (toScript.value === "tamil") {
      span.setAttribute('lang', 'ta');
    }
    span.innerHTML += Sanscript.t(word, "itrans", toScript.value);

    hilitedRange.deleteContents();
    hilitedRange.insertNode(span);

    sel.removeAllRanges();
    sel.addRange(selectedRange);
  }
});
