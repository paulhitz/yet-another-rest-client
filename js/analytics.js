
//Initialise Chrome Platform Analytics (allows Google Analytics in Chrome Apps).
var service = analytics.getService('Yet Another REST Client');
service.getConfig().addCallback(
  function(config) {
    config.setTrackingPermitted(true);
  }
);
var tracker = service.getTracker('UA-266330-7');
