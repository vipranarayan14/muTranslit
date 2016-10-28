if (chrome.app.window) {
  var tb = document.querySelectorAll('a');

  for (var i = 0; i < tb.length; i++) {

    tb[i].addEventListener('click', function(e) {
      e.preventDefault();

      var url = e.target.parentNode.parentNode.getAttribute('href');

      var screenWidth = screen.availWidth;
      var screenHeight = screen.availHeight;
      var width = 1122;
      var height = 678;

      chrome.app.window.create(url, {
        'outerBounds': {
          'width': width,
          'height': height,
          left: Math.round((screenWidth - width) / 2),
          top: Math.round((screenHeight - height) / 2)
        }
      });


    })
  }
}
