function showTranslitMap(toScript, container) {

  container.innerHTML = genMap(toScript);
}

function genMap(toScript) {

  var translitMap = {
    devanagari: [Sanscript.schemes.devanagariUC.vowels,
      Sanscript.schemes.itrans.vowels,
      Sanscript.schemes.devanagariUC.consonants,
      Sanscript.schemes.itrans.consonants
    ],

    tamil: [Sanscript.schemes.tamil.vowels,
      Sanscript.schemes.itrans.vowels,
      Sanscript.schemes.tamil.consonants,
      Sanscript.schemes.itrans.consonants
    ],

    iast: [Sanscript.schemes.iast.vowels,
      Sanscript.schemes.itrans.vowels,
      Sanscript.schemes.iast.consonants,
      Sanscript.schemes.itrans.consonants
    ]
  };

  return {
    devanagariuc: genTable(translitMap.devanagari),
    tamil: genTable(translitMap.tamil),
    iast: genTable(translitMap.iast),
    select: "<center><h1>Please select a Script</h1></center>"
  }[toScript.toLowerCase()];
}

function genTable(dataArray) {
  var table = document.createElement('table');

  dataArray.forEach(function(row) {

    var TRow = document.createElement('tr');

    row.forEach(function(data) {

      var TCell = document.createElement('td');
      var TCellText = document.createTextNode(data);

      TCell.appendChild(TCellText);
      TRow.appendChild(TCell);

    });
    table.appendChild(TRow);
  });
  return table.outerHTML;
}
