
//Add a flag to indicate Dev mode.
chrome.management.getSelf(function(result) {
  if (result.installType === "development") {
    chrome.action.setBadgeText({text: "DEV"});
  }
});


//Open the extension in a new tab.
chrome.action.onClicked.addListener(function() {
  chrome.tabs.create({ url: "index.html" });
});
