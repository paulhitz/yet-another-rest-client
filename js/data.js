/*
 * Used to populate the UI and determine the endpoint to call.
 */
var servicesConfig = {

	environments : [ {
		"id" : "qa",
		"label" : "QA"
	}, {
		"id" : "stg",
		"label" : "Staging"
	} ],

	services : [ {
		"id" : "pcs",
		"label" : "ProductCatalogService (v2)"
	}, {
		"id" : "linkage",
		"label" : "Linkage"
	}, {
		"id" : "firm",
		"label" : "Firmographics (v2.0)"
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
		"label" : "ComplianceCheck Service / RDC Search (v1.0)"
	}, {
		"id" : "list_portfolio",
		"label" : "ListPortfolio"
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
		"env" : "qa",
		"service" : "pcs",
		"url" : "http://services-ext-qa.dnb.com/rest/ProductCatalogService/V2/ListAvailableProduct?DUNSNumber={duns}"
	}, {
		"env" : "stg",
		"service" : "pcs",
		"url" : "http://services-ext-stg.dnb.com/rest/ProductCatalogService/V2/ListAvailableProduct?DUNSNumber={duns}"
	}, {
		"env" : "qa",
		"service" : "linkage",
		"url" : "http://services-ext-qa.dnb.com/rest/LinkageService/V2/OrderProduct?DUNSNumber={duns}&CountryISOAlpha2Code=GB&DNBProductID=LNK_FF_MNRT"
	}, {
		"env" : "stg",
		"service" : "linkage",
		"url" : "http://services-ext-stg.dnb.com/rest/LinkageService/V2/OrderProduct?DUNSNumber={duns}&CountryISOAlpha2Code=GB&DNBProductID=LNK_FF_MNRT"
	}, {
		"env" : "qa",
		"service" : "firm",
		"url" : "http://services-ext-qa.dnb.com/V2/organizations/{duns}/products/DCP_PREM_ONBRD?ArchiveProductOptOutIndicator=true"
	}, {
		"env" : "stg",
		"service" : "firm",
		"url" : "http://services-ext-stg.dnb.com/V2.0/organizations/{duns}/products/DCP_PREM_ONBRD?ArchiveProductOptOutIndicator=true"
	}, {
		"env" : "qa",
		"service" : "gbo",
		"url" : "http://services-ext-qa.dnb.com/V2/organizations/{duns}/products/GBO?ArchiveProductOptOutIndicator=true"
	}, {
		"env" : "stg",
		"service" : "gbo",
		"url" : "http://services-ext-stg.dnb.com/V2.0/organizations/{duns}/products/GBO?ArchiveProductOptOutIndicator=true"
	}, {
		"env" : "qa",
		"service" : "so",
		"url" : "http://services-ext-qa.dnb.com/V2/organizations/{duns}/products/SMPL_OWNSHP?ArchiveProductOptOutIndicator=true"
	}, {
		"env" : "stg",
		"service" : "so",
		"url" : "http://services-ext-stg.dnb.com/V2.0/organizations/{duns}/products/SMPL_OWNSHP?ArchiveProductOptOutIndicator=true"
	}, {
		"env" : "qa",
		"service" : "kyc",
		"url" : "http://services-ext-qa.dnb.com/V2/organizations/{duns}/products/KYC?ArchiveProductOptOutIndicator=true"
	}, {
		"env" : "stg",
		"service" : "kyc",
		"url" : "http://services-ext-stg.dnb.com/V2.0/organizations/{duns}/products/KYC?ArchiveProductOptOutIndicator=true"
	}, {
		"env" : "qa",
		"service" : "rdc_search",
		"url" : "http://services-ext-qa.dnb.com/V1.0/compliancecheck/entities/alerts?CandidateDisplayStartSequenceNumber=1&CandidatePerPageMaximumQuantity=100&CustomerBillingEndorsementText=teamjoly&SubjectTypeText=P&subjectname={duns}"
	}, {
		"env" : "stg",
		"service" : "rdc_search",
		"url" : "http://services-ext-stg.dnb.com/V1.0/compliancecheck/entities/alerts?CandidateDisplayStartSequenceNumber=1&CandidatePerPageMaximumQuantity=100&CustomerBillingEndorsementText=teamjoly&SubjectTypeText=P&subjectname={duns}"
	}, {
		"env" : "qa",
		"service" : "list_portfolio",
		"url" : "http://services-ext-qa.dnb.com/rest/PortfolioService/V2/ListPortfolioAsset"
	}, {
		"env" : "stg",
		"service" : "list_portfolio",
		"url" : "http://services-ext-stg.dnb.com/rest/PortfolioService/V2/ListPortfolioAsset"
	}, {
		"env" : "qa",
		"service" : "headers",
		"url" : "http://headers.jsontest.com/"
	}, {
		"env" : "stg",
		"service" : "headers",
		"url" : "http://headers.jsontest.com/"
	} ],

	//Use this DUNs if none is provided.
	"placeholderDuns" : "222228632"
}
