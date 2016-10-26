var optScript = document.getElementById("optScript");
var textIn = document.getElementById("textIn");
var textOut = document.getElementById("textOut");

textIn.addEventListener("input", function(e) {

  var optScriptVal = optScript.value;

  textOut.value = transliterate(textIn.value, optScriptVal);

});

optScript.addEventListener("change", function() {

  var optScriptVal = optScript.value;

  switchFont(optScriptVal);

  textOut.value = transliterate(textIn.value, optScriptVal);

  showTranslitMap(optScriptVal, document.getElementById("translitMap"));
});

function switchFont(toScript) {

  switch (toScript) {
    case "tamil":
      textOut.style.cssText =
        "font-family: 'Arima Madurai', cursive;" +
        "font-size: 14px;" +
        "font-weight: bold;";

      break;
    case "devanagari":
      textOut.style.cssText = "font-family: 'Vesper Libre', serif;";
      break;
    case "select":
      textOut.style.cssText = "";
      break;
    default:
      textOut.style.cssText = "font-family: 'Vesper Libre', serif;";

  }
}

function transliterate(inputTxt, toScript) {
  if (toScript !== "select") {

    return Sanscript.t(inputTxt, "itrans", toScript);
  } else {
    return inputTxt;
  }
}
