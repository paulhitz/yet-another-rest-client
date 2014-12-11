var servicesConfig = {

   //TODO add id
   environments : ["QA", "STG", "PROD"],

   //TODO add id and label
   services : [ {
	"env" : "QA",
	"" : ""
	}],
	
	//TODO complete
	foo : [ {
		"env" : "qa",
		"service" : "linkage",
		"endpoint" : "http://........"
		}]
	}


	//TODO delete
var formData = {

   environments : ["QA", "STG", "PROD"],

   //TODO need to use some unique code to identify what's selected in the dropdown?
   services : [ {
	"env" : "QA",
	"env" : "STG",
	"url" : "http://services-ext-stg.dnb.com/rest/Authentication",
	"name" : "Authentication"
}, {
	"env" : "PROD",
	"url" : "",
	"name" : "Authentication"
}, {
	"env" : "QA",
	"url" : "",
	"name" : "Linkage"
}, {
	"env" : "STG",
	"url" : "http://services-ext-stg.dnb.com/rest/LinkageService/V2/OrderProduct?DUNSNumber=211528187&CountryISOAlpha2Code=GB&DNBProductID=LNK_FF_MNRT",
	"name" : "Linkage"
}, {
    "env" : "PROD",
	"url" : "",
	"name" : "Linkage"
}, {
    "env" : "QA",
	"url" : "",
	"name" : "Firmographics"
}, {
	"env" : "STG",
	"url" : "",
	"name" : "Firmographics"
}, {
	"env" : "PROD",
	"url" : "",
	"name" : "Firmographics"
}]};
