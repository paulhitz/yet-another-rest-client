
//Add a flag to indicate Dev mode.
//chrome.browserAction.setBadgeText({text: "Dev"});


//Open the extension in a new tab.
chrome.browserAction.onClicked.addListener(function() {
	chrome.tabs.create({ url: "index.html" });
});

//Google Analytics.
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-266330-4']);
_gaq.push(['_trackPageview']);

(function() {
  var ga = document.createElement('script');
  ga.type = 'text/javascript';
  ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(ga, s);
})();

