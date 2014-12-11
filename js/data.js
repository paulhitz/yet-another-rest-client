var servicesConfig = {

	environments : [ {
		"id" : "qa",
		"label" : "QA"
	}, { 
		"id" : "stg",
		"label" : "Staging"
	}, {
		"id" : "prod",
		"label" : "Production (requires https)"
	} ],

	services : [ {
		"id" : "auth",
		"label" : "Authentication Service"
	}, { 
		"id" : "linkage",
		"label" : "Linkage"
	}, {
		"id" : "firm",
		"label" : "Firmographics"
	}, { 
		"id" : "kyc",
		"label" : "Custom Product (KYC)"
	}, { 
		"id" : "gbo",
		"label" : "Custom Product (GBO)"
	}, { 
		"id" : "so",
		"label" : "Custom Product (Simple Ownership)"
	}, { 
		"id" : "rdc_search",
		"label" : "RDC Search"
	}, { 
		"id" : "pcs",
		"label" : "ProdcutCatalogService"
	} ],

	endpoints : [ {
		"env" : "qa",
		"service" : "auth",
		"url" : "http://services-ext-qa.dnb.com/rest/Authentication"
	}, { 
		"env" : "stg",
		"service" : "auth",
		"url" : "http://services-ext-stg.dnb.com/rest/Authentication"
	}, { 
		"env" : "prod",
		"service" : "auth",
		"url" : "http://services-ext-stg.dnb.com/rest/Authentication"
	}, { 
		"env" : "qa",
		"service" : "linkage",
		"url" : "http://services-ext-qa.dnb.com/rest/LinkageService/V2/OrderProduct?DUNSNumber=211528187&CountryISOAlpha2Code=GB&DNBProductID=LNK_FF_MNRT"
	}, { 
		"env" : "stg",
		"service" : "linkage",
		"url" : "http://services-ext-stg.dnb.com/rest/LinkageService/V2/OrderProduct?DUNSNumber=211528187&CountryISOAlpha2Code=GB&DNBProductID=LNK_FF_MNRT"
	}, { 
		"env" : "prod",
		"service" : "linkage",
		"url" : "http://services-ext-stg.dnb.com/rest/LinkageService/V2/OrderProduct?DUNSNumber=211528187&CountryISOAlpha2Code=GB&DNBProductID=LNK_FF_MNRT"
	}, { 
		"env" : "qa",
		"service" : "firm",
		"url" : "http://services-ext-stg.dnb.com/rest/Authentication"
	}, { 
		"env" : "stg",
		"service" : "firm",
		"url" : "http://services-ext-stg.dnb.com/rest/Authentication"
	}, { 
		"env" : "prod",
		"service" : "firm",
		"url" : "http://services-ext-stg.dnb.com/rest/Authentication"
	}, { 
		"env" : "qa",
		"service" : "kyc",
		"url" : "http://services-ext-qa.dnb.com/V2/organizations/343247870/products/KYC?ArchiveProductOptOutIndicator=true"
	}, { 
		"env" : "stg",
		"service" : "kyc",
		"url" : "http://services-ext-stg.dnb.com/V2.0/organizations/343247870/products/KYC?ArchiveProductOptOutIndicator=true"
	}, { 
		"env" : "prod",
		"service" : "kyc",
		"url" : "http://services-ext-stg.dnb.com/V2.0/organizations/343247870/products/KYC?ArchiveProductOptOutIndicator=true"
	} ]

}
