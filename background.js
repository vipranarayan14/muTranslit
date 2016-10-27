chrome.app.runtime.onLaunched.addListener(function() {

  var screenWidth = screen.availWidth;
  var screenHeight = screen.availHeight;
  var width = 945;
  var height = 460;

  chrome.app.window.create('index.html', {
    'outerBounds': {
      'width': width,
      'height': height,
      left: Math.round((screenWidth-width)/2),
      top: Math.round((screenHeight-height)/2)
    }
  });

});
