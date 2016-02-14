(function(window, angular, undefined) {

'use strict';

/**
 * @ngdoc overview
 * @name angulartics.chrome.platform.analytics
 * Enables analytics support for Chrome Platform Analytics (allows Google Analytics in Chrome Apps).
 *
 * @link https://github.com/GoogleChrome/chrome-platform-analytics/wiki
 */
angular.module('angulartics.chrome.platform.analytics', ['angulartics']).config(['$analyticsProvider', function ($analyticsProvider) {

  $analyticsProvider.settings.pageTracking.trackRelativePath = true;

  /**
   * Track app view changes
   *
   * @name pageTrack
   * @param {string} path The current screen within the application.
   * @link https://github.com/GoogleChrome/chrome-platform-analytics/wiki#track-app-view-changes
   */
  $analyticsProvider.registerPageTrack(function (path) {
    if (window.tracker) {
      tracker.sendAppView(path);
    }
  });

  /**
   * Track user actions using an Event.
   *
   * @name eventTrack
   * @param {string} action Required 'action' (string) associated with the event
   * @param {object} properties Comprised of the mandatory field 'category' (string) and optional fields 'label' (string), 'value' (integer) and 'noninteraction' (boolean)
   *
   * @link https://github.com/GoogleChrome/chrome-platform-analytics/wiki#track-events
   */
  $analyticsProvider.registerEventTrack(function (action, properties) {
    // Google Analytics requires an Event Category
    if (!properties || !properties.category) {
      properties = properties || {};
      properties.category = 'Event';
    }
    // GA requires that eventValue be an integer, see:
    // https://developers.google.com/analytics/devguides/collection/analyticsjs/field-reference#eventValue
    // https://github.com/luisfarzati/angulartics/issues/81
    if (properties.value) {
      var parsed = parseInt(properties.value, 10);
      properties.value = isNaN(parsed) ? 0 : parsed;
    }

    if (window.tracker) {
      var eventOptions = {
        eventCategory: properties.category,
        eventAction: action,
        eventLabel: properties.label || "Chrome App",
        eventValue: properties.value,
        nonInteraction: properties.noninteraction
      };
      tracker.send('event', eventOptions);
    }
  });

}]);
})(window, window.angular);
