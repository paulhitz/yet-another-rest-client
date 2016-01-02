# Yet Another REST Client
[![Code Climate](https://codeclimate.com/github/paulhitz/yet-another-rest-client/badges/gpa.svg)](https://codeclimate.com/github/paulhitz/yet-another-rest-client)

YARC (Yet Another REST Client) is an easy-to-use REST Client for Google Chrome.

Use it to develop, test and debug RESTful services.

It has a number of powerful features...

###Favorites
* Save favorite requests (including headers, payload etc.) and re-use them with the click of a button.
* Import/Export favorites.
* Your favorites are automatically synced with your Google account and are not tied to a single machine.

###History
* View all your previous requests *and responses*.
* Easily run them again.
* Easily filter out the requests you're not interested in.

###Custom Headers
* Choose from a large range of existing request headers.
* Create and save your own custom request headers.

###More...
* View the request response in beautiful syntax highlighting (including JSON, XML, HTML, CSS and 130+ other languages!).
* See how long each request took to complete.
* Supports GET, POST, PUT, DELETE, PATCH, HEAD and OPTIONS request methods. Custom request methods can also be added by the user.
* HTTP Basic Authentication
* Responsive Design
* 100% Free. No strings attached.


## Installation
The tool is packaged as a Chrome extension. Installation is trivial. It can be installed from the Chrome Web Store...

[![Install](img/ChromeWebStore_Badge_v2_496x150.png)](https://chrome.google.com/webstore/detail/yarc-yet-another-rest-cli/ehafadccdcdedbhcbddihehiodgcddpl)


## Tech
This is a AngularJS application packaged as a Chrome extension to avoid CORS (Cross-Origin Resource Sharing) issues. Bower is used to handle dependencies.


## Site
[Official Project Site](http://paulhitz.com/yet-another-rest-client/)


## Screenshots

### Main
![Main Screenshot](/img/screenshots/screenshot_main.png)

### Request Response
![Response Screenshot](/img/screenshots/screenshot_response.png)

### History
![History Screenshot](/img/screenshots/screenshot_history.png)
