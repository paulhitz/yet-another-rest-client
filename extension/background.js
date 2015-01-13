
//Add a flag to indicate Dev mode.
//chrome.browserAction.setBadgeText({text: "Dev"});


//Open the extension in a new tab.
chrome.browserAction.onClicked.addListener(function(tab) {
	chrome.tabs.create({ url: "index.html" });
});

//Google Analytics.
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
ga('create', 'UA-266330-4', 'auto');
ga('set', 'checkProtocolTask', function(){});
ga('require', 'displayfeatures');
ga('send', 'pageview');

