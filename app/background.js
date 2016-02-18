
chrome.app.runtime.onLaunched.addListener(function() {

  //Open the app in a new window.
  chrome.app.window.create('index.html', {
    id: 'yarcId',
    state: "fullscreen",
    minWidth: 1000,
    minHeight: 800
  });
});
