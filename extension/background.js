
//Add a flag to indicate Dev mode.
//chrome.browserAction.setBadgeText({text: "yarc"});

//Open the extension in a new tab.
chrome.browserAction.onClicked.addListener(function() {
  chrome.tabs.create({ url: "index.html" });
});
