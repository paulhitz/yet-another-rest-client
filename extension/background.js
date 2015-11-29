
//Add a flag to indicate Dev mode.
//chrome.browserAction.setBadgeText({text: "yarc"});

//Open the extension in a new tab.
chrome.browserAction.onClicked.addListener(function() {
  chrome.tabs.create({ url: "index.html" });
});

//Google Analytics.
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-266330-7']);
_gaq.push(['_trackPageview']);
_gaq.push(['_trackEvent', 'manual_test', 'test']);

(function() {
  var ga = document.createElement('script');
  ga.type = 'text/javascript';
  ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(ga, s);
})();

//TODO is this the best place to put this code? How about including it with the AngularJS code?

//Track the number of requests.
var submitButton = document.getElementById('submitFormButton'); //TODO will it ever find this?
submitButton.addEventListener('click', trackButton);
function trackButton(e) {
  alert("tracking button... " + e.target.id);
  _gaq.push(['_trackEvent', e.target.id, 'clicked']);
};

//TODO Test having it on the form submission...
document.getElementById('requestForm').addEventListener("submit", function(e){
  alert("tracking form... " + e.target.id);
  _gaq.push(['_trackEvent', e.target.id, 'submitted']);
});

