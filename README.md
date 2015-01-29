D&B Services REST Client
========================

This tool allows various D&B REST Services to be tested.

Either the QA, STG or Production environment can be used and automatic authentication will take place.

The response from the service will be displayed along with any headers in the request/response.

The complete request URL is provided so it can easily be copied and pasted.



**Installation**

The tool is packaged as a Chrome extension. Installation is trivial. It can be installed from the Chrome Web Store:  https://chrome.google.com/webstore/detail/db-services-rest-client/ekgojcdjjjlillgeidgniapfmilgbppm?hl=en&gl=IE


**POST / GET**

If a payload is selected in the advanced settings then a POST request will be used. Otherwise GET is always used.

Some services require a JSON payload. E.g. ListPortfolio


**Developer Notes**

New Services can be added by modifying data.js


**Screenshot**

![Screenshot](https://raw.githubusercontent.com/paulhitz/SimpleRestClient/master/img/screenshots/screenshot.png)

