
chrome.app.runtime.onLaunched.addListener(function() {
  // var url = chrome.runtime.getURL('index.html');
  // chrome.browser.openTab({'url': url});

  //Open the app in a new browser tab.
  //window.open("index.html");

  //Open the app in a new window.
  chrome.app.window.create('index.html', {
    id: 'yarcId',
    state: "fullscreen",
    minWidth: 1000,
    minHeight: 800
  });
});
