//TODO move to the new universal analytics lib.

	var _gaq = _gaq || [];
	_gaq.push(['_setAccount', 'UA-266330-7']);
	//_gaq.push(['_trackPageview']);
	_gaq.push(['_trackEvent', 'angular_test', 'ANGULAR executed']); //TODO delete

	(function() {
	  var ga = document.createElement('script');
	  ga.type = 'text/javascript';
	  ga.async = true;
	  ga.src = 'https://ssl.google-analytics.com/ga.js';
	  var s = document.getElementsByTagName('script')[0];
	  s.parentNode.insertBefore(ga, s);
	})();
