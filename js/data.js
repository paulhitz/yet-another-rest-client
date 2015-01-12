/*
 * Constants used to populate the UI and to determine the endpoint to call.
 */
angular.module('clientApp').constant('SERVICES_CONFIG', {

	environments : [ {
		id : "qa",
		label : "QA"
	}, {
		id : "stg",
		label : "Staging"
	} ],

	services : [ {
		id : "pcs",
		label : "Product Catalog Service (v2)"
	}, {
		id : "linkage",
		label : "Linkage Service (v2)"
	}, {
		id : "firm",
		label : "Firmographics Product Service (v2.0)"
	}, {
		id : "kyc",
		label : "Custom Product Service (KYC)"
	}, {
		id : "gbo",
		label : "Custom Product Service (GBO)"
	}, {
		id : "so",
		label : "Custom Product Service (Simple Ownership)"
	}, {
		id : "rdc_search",
		label : "ComplianceCheck Service / RDC Search (v1.0)"
	}, {
		id : "match",
		label : "Match (REST version)"
	}, {
		id : "investigation",
		label : "Investigation Service (POST)"
	}, {
		id : "portfolio_assets",
		label : "List Portfolio Asset (GET)"
	}, {
		id : "list_portfolio",
		label : "List Portfolio Service (POST)"
	} ],

	endpoints : [ {
		env : "qa",
		service : "auth",
		url : "http://services-ext-qa.dnb.com/rest/Authentication"
	}, {
		env : "stg",
		service : "auth",
		url : "http://services-ext-stg.dnb.com/rest/Authentication"
	}, {
		env : "qa",
		service : "pcs",
		url : "http://services-ext-qa.dnb.com/rest/ProductCatalogService/V2/ListAvailableProduct?DUNSNumber={duns}"
	}, {
		env : "stg",
		service : "pcs",
		url : "http://services-ext-stg.dnb.com/rest/ProductCatalogService/V2/ListAvailableProduct?DUNSNumber={duns}"
	}, {
		env : "qa",
		service : "linkage",
		url : "http://services-ext-qa.dnb.com/rest/LinkageService/V2/OrderProduct?DUNSNumber={duns}&CountryISOAlpha2Code=GB&DNBProductID=LNK_FF_MNRT"
	}, {
		env : "stg",
		service : "linkage",
		url : "http://services-ext-stg.dnb.com/rest/LinkageService/V2/OrderProduct?DUNSNumber={duns}&CountryISOAlpha2Code=GB&DNBProductID=LNK_FF_MNRT"
	}, {
		env : "qa",
		service : "firm",
		url : "http://services-ext-qa.dnb.com/V2/organizations/{duns}/products/DCP_PREM_ONBRD?ArchiveProductOptOutIndicator=true"
	}, {
		env : "stg",
		service : "firm",
		url : "http://services-ext-stg.dnb.com/V2.0/organizations/{duns}/products/DCP_PREM_ONBRD?ArchiveProductOptOutIndicator=true"
	}, {
		env : "qa",
		service : "gbo",
		url : "http://services-ext-qa.dnb.com/V2/organizations/{duns}/products/GBO?ArchiveProductOptOutIndicator=true"
	}, {
		env : "stg",
		service : "gbo",
		url : "http://services-ext-stg.dnb.com/V2.0/organizations/{duns}/products/GBO?ArchiveProductOptOutIndicator=true"
	}, {
		env : "qa",
		service : "so",
		url : "http://services-ext-qa.dnb.com/V2/organizations/{duns}/products/SMPL_OWNSHP?ArchiveProductOptOutIndicator=true"
	}, {
		env : "stg",
		service : "so",
		url : "http://services-ext-stg.dnb.com/V2.0/organizations/{duns}/products/SMPL_OWNSHP?ArchiveProductOptOutIndicator=true"
	}, {
		env : "qa",
		service : "kyc",
		url : "http://services-ext-qa.dnb.com/V2/organizations/{duns}/products/KYC?ArchiveProductOptOutIndicator=true"
	}, {
		env : "stg",
		service : "kyc",
		url : "http://services-ext-stg.dnb.com/V2.0/organizations/{duns}/products/KYC?ArchiveProductOptOutIndicator=true"
	}, {
		env : "qa",
		service : "rdc_search",
		url : "http://services-ext-qa.dnb.com/V1.0/compliancecheck/entities/alerts?CandidateDisplayStartSequenceNumber=1&CandidatePerPageMaximumQuantity=100&CustomerBillingEndorsementText=teamjoly&SubjectTypeText=P&subjectname={duns}"
	}, {
		env : "stg",
		service : "rdc_search",
		url : "http://services-ext-stg.dnb.com/V1.0/compliancecheck/entities/alerts?CandidateDisplayStartSequenceNumber=1&CandidatePerPageMaximumQuantity=100&CustomerBillingEndorsementText=teamjoly&SubjectTypeText=P&subjectname={duns}"
	}, {
		env : "qa",
		service : "match",
		url : "http://services-ext-qa.dnb.com/rest/CompanyService/V2/Match?CountryISOAlpha2Code=BE&DUNSNumber={duns}"
	}, {
		env : "stg",
		service : "match",
		url : "http://services-ext-stg.dnb.com/rest/CompanyService/V2/Match?CountryISOAlpha2Code=BE&DUNSNumber={duns}"
	}, {
		env : "qa",
		service : "list_portfolio",
		url : "http://services-ext-qa.dnb.com/rest/PortfolioService/V2/ListPortfolioAsset"
	}, {
		env : "stg",
		service : "list_portfolio",
		url : "http://services-ext-stg.dnb.com/rest/PortfolioService/V2/ListPortfolioAsset"
	}, {
		env : "qa",
		service : "investigation",
		url : "http://services-ext-qa.dnb.com/rest/InvestigationService/V2/PlaceInvestigation"
	}, {
		env : "stg",
		service : "investigation",
		url : "http://services-ext-stg.dnb.com/rest/InvestigationService/V2/PlaceInvestigation"
	}, {
		env : "qa",
		service : "portfolio_assets",
		url : "http://services-ext-qa.dnb.com/V2/assets?OrderTransactionTypeCode=0&CandidateMaximumQuantity=10&SortBasisText=PortfolioAssetID&SortDirectionText=Ascending&CandidateDisplayStartSequenceNumber=1&ApplicationTransactionID=f9fc47c5-6733-4325-bbbe-157deb0520ba&DNBProductID=ComplianceReport"
	}, {
		env : "stg",
		service : "portfolio_assets",
		url : "http://services-ext-stg.dnb.com/V2/assets?OrderTransactionTypeCode=0&CandidateMaximumQuantity=10&SortBasisText=PortfolioAssetID&SortDirectionText=Ascending&CandidateDisplayStartSequenceNumber=1&ApplicationTransactionID=f9fc47c5-6733-4325-bbbe-157deb0520ba&DNBProductID=ComplianceReport"
	} ],

	//Use this DUNs if none is provided.
	placeholderDuns : "222228632"
});


/**
 * The default advanced settings to use.
 */
angular.module('clientApp').value('advancedSettings', {
	requestUrl : "",
	appId : "36",
	userId : "teamjoly@dnb.com",
	password : "password",
	payload : ""
});