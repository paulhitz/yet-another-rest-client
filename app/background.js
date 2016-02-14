
chrome.app.runtime.onLaunched.addListener(function() {
  // var url = chrome.runtime.getURL('index.html');
  // chrome.browser.openTab({'url': url});

  //Open the app in a new browser tab.
  window.open("index.html");
});
