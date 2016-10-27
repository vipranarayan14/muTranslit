var optScript = document.getElementById("optScript");
var textIn = document.getElementById("textIn");
var textOut = document.getElementById("textOut");
var translitMapContainer = document.getElementById("translitMap")

textIn.addEventListener("input", function(e) {

  var optScriptVal = optScript.value;

  textOut.value = transliterate(textIn.value, optScriptVal);

});

optScript.addEventListener("change", function() {

  var optScriptVal = optScript.value;

  switchFont(optScriptVal);

  textOut.value = transliterate(textIn.value, optScriptVal);

  showTranslitMap(optScriptVal, translitMapContainer);
});

function switchFont(toScript) {

  var tamilFont = "font-family: 'Arima Madurai', cursive;" +
                  "font-size: 14px;" +
                  "font-weight: bold;";

  var devanagariFont = "font-family: 'Vesper Libre', serif;";

  switch (toScript) {
    case "tamil":
      textOut.style.cssText = tamilFont;
      translitMapContainer.style.cssText = tamilFont;
      break;
    case "devanagari":
      textOut.style.cssText = devanagariFont;
      translitMapContainer.style.cssText = devanagariFont;
      break;
    case "select":
      textOut.style.cssText = devanagariFont;
      translitMapContainer.style.cssText = devanagariFont;
      break;
    default:
      textOut.style.cssText = devanagariFont;

  }
}

function transliterate(inputTxt, toScript) {
  if (toScript !== "select") {

    return Sanscript.t(inputTxt, "itrans", toScript);
  } else {
    return inputTxt;
  }
}
