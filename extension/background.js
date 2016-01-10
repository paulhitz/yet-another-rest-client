
//Add a flag to indicate Dev mode.
chrome.management.getSelf(function(result) {
  if (result.installType === "development") {
    chrome.browserAction.setBadgeText({text: "DEV"});
  }
});


//Open the extension in a new tab.
chrome.browserAction.onClicked.addListener(function() {
  chrome.tabs.create({ url: "index.html" });
});
