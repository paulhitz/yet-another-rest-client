D&B Services REST Client
========================

This tool is useful for testing REST Services. Out of the box, various D&B services are already configured. However, it's trivial to add new services.

Both D&B and external services are supported. For D&B services, either the QA, STG or Production environment can be used and automatic authentication will take place.

The response from the service will be displayed along with any headers in the request/response. 

Every request and response is saved so they can be viewed again at a later stage.

The complete request URL is provided so it can easily be copied and pasted.

Your credentials are saved against the selected environment.


**Installation**

The tool is packaged as a Chrome extension. Installation is trivial. It can be installed from the Chrome Web Store:  https://chrome.google.com/webstore/detail/db-services-rest-client/ekgojcdjjjlillgeidgniapfmilgbppm


**Request Methods (POST / GET / PUT / DELETE / HEAD / PATCH)**

Requests use GET by default. POST/PUT/PATCH requests should specify a payload.

Some services require a JSON payload. E.g. ListPortfolio


**Tech**

This is a AngularJS application packaged as a Chrome extension to avoid CORS (Cross-Origin Resource Sharing) issues. Bower is used to handle dependencies.

[![Code Climate](https://codeclimate.com/github/paulhitz/DnB-REST-Client/badges/gpa.svg)](https://codeclimate.com/github/paulhitz/DnB-REST-Client)


**Screenshot**

![Screenshot](https://raw.githubusercontent.com/paulhitz/DnB-REST-Client/master/img/screenshots/screenshot.png)

