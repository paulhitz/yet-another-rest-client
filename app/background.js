
chrome.app.runtime.onLaunched.addListener(function() {
  // var url = chrome.runtime.getURL('index.html');
  // chrome.browser.openTab({'url': url});

  window.open("index.html");
});
