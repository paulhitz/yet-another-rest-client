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
	}, {
		id : "prod",
		label : "Production (Requires Credentials)"
	} ],

	services : [ {
		id : "pcs",
		label : "Product Catalog Service (v2)",
		group : "Common"
	}, {
		id : "linkage",
		label : "Linkage Service (v2)",
		group : "Common"
	}, {
		id : "firm",
		label : "Firmographics Product Service (v2.0)",
		group : "Common"
	}, {
		id : "kyc",
		label : "KYC (Know Your Customer)",
		group : "Custom Product Service"
	}, {
		id : "gbo",
		label : "GBO (Global Beneficial Ownership)",
		group : "Custom Product Service"
	}, {
		id : "so",
		label : "SO (Simple Ownership)",
		group : "Custom Product Service"
	}, {
		id : "rdc_search",
		label : "ComplianceCheck Service / RDC Search (v1.0)",
		group : "Search"
	}, {
		id : "match",
		label : "Match (REST version)",
		group : "Search"
	}, {
		id : "global",
		label : "Global Name Search / Entity List Service (v4.0)",
		group : "Search"
	}, {
		id : "portfolio_assets",
		label : "List Portfolio Asset (GET)",
		group : "Portfolio"
	}, {
		id : "list_portfolio",
		label : "List Portfolio Service (POST)",
		group : "Portfolio"
	}, {
		id : "gms_reg",
		label : "Registration (GET/POST/PUT)",
		group : "GMS Monitoring"
	}, {
		id : "gms_profile_create",
		label : "Profile List/Create (GET/POST)",
		group : "GMS Monitoring"
	}, {
		id : "gms_profile_param",
		label : "Profile Get/Update/Delete (GET/PUT/DELETE)",
		group : "GMS Monitoring"
	}, {
		id : "gms_notice_list",
		label : "Change Notice List (GET)",
		group : "GMS Monitoring"
	}, {
		id : "gms_notice_list_count",
		label : "Change Notice List Count (GET)",
		group : "GMS Monitoring"
	}, {
		id : "gms_notice_param",
		label : "Change Notice Update (PUT)",
		group : "GMS Monitoring"
	}, {
		id : "gms_subject",
		label : "Subject (GET)",
		group : "GMS Monitoring"
	}, {
		id : "gms_events",
		label : "Change Events (GET)",
		group : "GMS Monitoring"
	}, {
		id : "investigation",
		label : "Investigation Service (POST)",
		group : "Miscellaneous"
	}, {
		id : "date_test",
		label : "JSONTest.com Date/Time",
		group : "External (No Authentication Required)"
	}, {
		id : "open_company",
		label : "OpenCorporates - Companies Search",
		group : "External (No Authentication Required)"
	}, {
		id : "open_officer",
		label : "OpenCorporates - Officers Search",
		group : "External (No Authentication Required)"
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
		env : "prod",
		service : "auth",
		url : "https://maxcvservices.dnb.com/rest/Authentication"
	}, {
		env : "qa",
		service : "pcs",
		url : "http://services-ext-qa.dnb.com/rest/ProductCatalogService/V2/ListAvailableProduct?DUNSNumber={placeholder}"
	}, {
		env : "stg",
		service : "pcs",
		url : "http://services-ext-stg.dnb.com/rest/ProductCatalogService/V2/ListAvailableProduct?DUNSNumber={placeholder}"
	}, {
		env : "prod",
		service : "pcs",
		url : "https://maxcvservices.dnb.com/rest/ProductCatalogService/V2/ListAvailableProduct?DUNSNumber={placeholder}"
	}, {
		env : "qa",
		service : "linkage",
		url : "http://services-ext-qa.dnb.com/rest/LinkageService/V2/OrderProduct?DUNSNumber={placeholder}&CountryISOAlpha2Code=GB&DNBProductID=LNK_FF_MNRT"
	}, {
		env : "stg",
		service : "linkage",
		url : "http://services-ext-stg.dnb.com/rest/LinkageService/V2/OrderProduct?DUNSNumber={placeholder}&CountryISOAlpha2Code=GB&DNBProductID=LNK_FF_MNRT"
	}, {
		env : "prod",
		service : "linkage",
		url : "https://maxcvservices.dnb.com/rest/LinkageService/V2/OrderProduct?DUNSNumber={placeholder}&CountryISOAlpha2Code=GB&DNBProductID=LNK_FF_MNRT"
	}, {
		env : "qa",
		service : "firm",
		url : "http://services-ext-qa.dnb.com/V2/organizations/{placeholder}/products/DCP_PREM_ONBRD?ArchiveProductOptOutIndicator=true"
	}, {
		env : "stg",
		service : "firm",
		url : "http://services-ext-stg.dnb.com/V2.0/organizations/{placeholder}/products/DCP_PREM_ONBRD?ArchiveProductOptOutIndicator=true"
	}, {
		env : "prod",
		service : "firm",
		url : "https://maxcvservices.dnb.com/V2.0/organizations/{placeholder}/products/DCP_PREM_ONBRD?ArchiveProductOptOutIndicator=true"
	}, {
		env : "qa",
		service : "gbo",
		url : "http://services-ext-qa.dnb.com/V2/organizations/{placeholder}/products/GBO?ArchiveProductOptOutIndicator=true"
	}, {
		env : "stg",
		service : "gbo",
		url : "http://services-ext-stg.dnb.com/V2.0/organizations/{placeholder}/products/GBO?ArchiveProductOptOutIndicator=true"
	}, {
		env : "prod",
		service : "gbo",
		url : "https://maxcvservices.dnb.com/V2/organizations/{placeholder}/products/GBO?ArchiveProductOptOutIndicator=true&ApplicationTransactionID=onboard"
	}, {
		env : "qa",
		service : "so",
		url : "http://services-ext-qa.dnb.com/V2/organizations/{placeholder}/products/SMPL_OWNSHP?ArchiveProductOptOutIndicator=true"
	}, {
		env : "stg",
		service : "so",
		url : "http://services-ext-stg.dnb.com/V2.0/organizations/{placeholder}/products/SMPL_OWNSHP?ArchiveProductOptOutIndicator=true"
	}, {
		env : "prod",
		service : "so",
		url : "https://maxcvservices.dnb.com/V2/organizations/{placeholder}/products/SMPL_OWNSHP?ArchiveProductOptOutIndicator=true&ApplicationTransactionID=onboard"
	}, {
		env : "qa",
		service : "kyc",
		url : "http://services-ext-qa.dnb.com/V2/organizations/{placeholder}/products/KYC?ArchiveProductOptOutIndicator=true"
	}, {
		env : "stg",
		service : "kyc",
		url : "http://services-ext-stg.dnb.com/V2.0/organizations/{placeholder}/products/KYC?ArchiveProductOptOutIndicator=true"
	}, {
		env : "prod",
		service : "kyc",
		url : "https://maxcvservices.dnb.com/V2/organizations/{placeholder}/products/KYC?ArchiveProductOptOutIndicator=true"
	}, {
		env : "qa",
		service : "rdc_search",
		url : "http://services-ext-qa.dnb.com/V1.0/compliancecheck/entities/alerts?CandidateDisplayStartSequenceNumber=1&CandidatePerPageMaximumQuantity=100&CustomerBillingEndorsementText=teamjoly&SubjectTypeText=P&subjectname={placeholder}"
	}, {
		env : "stg",
		service : "rdc_search",
		url : "http://services-ext-stg.dnb.com/V1.0/compliancecheck/entities/alerts?CandidateDisplayStartSequenceNumber=1&CandidatePerPageMaximumQuantity=100&CustomerBillingEndorsementText=teamjoly&SubjectTypeText=P&subjectname={placeholder}"
	}, {
		env : "prod",
		service : "rdc_search",
		url : "https://maxcvservices.dnb.com/V1.0/compliancecheck/entities/alerts?CandidateDisplayStartSequenceNumber=1&CandidatePerPageMaximumQuantity=100&CustomerBillingEndorsementText=teamjoly&SubjectTypeText=P&subjectname={placeholder}"
	}, {
		env : "qa",
		service : "match",
		url : "http://services-ext-qa.dnb.com/rest/CompanyService/V2/Match?CountryISOAlpha2Code=BE&DUNSNumber={placeholder}"
	}, {
		env : "stg",
		service : "match",
		url : "http://services-ext-stg.dnb.com/rest/CompanyService/V2/Match?CountryISOAlpha2Code=BE&DUNSNumber={placeholder}"
	}, {
		env : "prod",
		service : "match",
		url : "https://maxcvservices.dnb.com/rest/CompanyService/V2/Match?CountryISOAlpha2Code=BE&DUNSNumber={placeholder}"
	}, {
		env : "qa",
		service : "global",
		url : "http://services-ext-qa.dnb.com/V4.0/organizations?ExactLocationFindIndicator=true&InclusionDataDescription-1=IncludeUndeliverableAddressSubject&InclusionDataDescription-2=IncludeIncompleteData&InclusionDataDescription-3=IncludeOutofBusiness&SearchModeDescription=Basic&candidateMaximumQuantity=250&candidatePerPageMaximumQuantity=250&findcompany=true&httpClient.connectTimeout=10000&httpClient.socketTimeout=10000&keywordText={placeholder}"
	}, {
		env : "stg",
		service : "global",
		url : "http://services-ext-stg.dnb.com/V4.0/organizations?ExactLocationFindIndicator=true&InclusionDataDescription-1=IncludeUndeliverableAddressSubject&InclusionDataDescription-2=IncludeIncompleteData&InclusionDataDescription-3=IncludeOutofBusiness&SearchModeDescription=Basic&candidateMaximumQuantity=250&candidatePerPageMaximumQuantity=250&findcompany=true&httpClient.connectTimeout=10000&httpClient.socketTimeout=10000&keywordText={placeholder}"
	}, {
		env : "prod",
		service : "global",
		url : "https://maxcvservices.dnb.com/V4.0/organizations?ExactLocationFindIndicator=true&InclusionDataDescription-1=IncludeUndeliverableAddressSubject&InclusionDataDescription-2=IncludeIncompleteData&InclusionDataDescription-3=IncludeOutofBusiness&SearchModeDescription=Basic&candidateMaximumQuantity=250&candidatePerPageMaximumQuantity=250&findcompany=true&httpClient.connectTimeout=10000&httpClient.socketTimeout=10000&keywordText={placeholder}"
	}, {
		env : "qa",
		service : "list_portfolio",
		url : "http://services-ext-qa.dnb.com/rest/PortfolioService/V2/ListPortfolioAsset"
	}, {
		env : "stg",
		service : "list_portfolio",
		url : "http://services-ext-stg.dnb.com/rest/PortfolioService/V2/ListPortfolioAsset"
	}, {
		env : "prod",
		service : "list_portfolio",
		url : "https://maxcvservices.dnb.com/rest/PortfolioService/V2/ListPortfolioAsset"
	}, {
		env : "qa",
		service : "investigation",
		url : "http://services-ext-qa.dnb.com/rest/InvestigationService/V2/PlaceInvestigation"
	}, {
		env : "stg",
		service : "investigation",
		url : "http://services-ext-stg.dnb.com/rest/InvestigationService/V2/PlaceInvestigation"
	}, {
		env : "prod",
		service : "investigation",
		url : "https://maxcvservices.dnb.com/rest/InvestigationService/V2/PlaceInvestigation"
	}, {
		env : "qa",
		service : "gms_reg",
		url : "http://services-ext-qa.dnb.com/V2.0/gmsmonitoring/registrations?ApplicationTransactionID=onboard-1&TransactionTimestamp=2001-09-11T09:30:47-05:00&ApplicationID=42&UserID=teamjoly-j1@dnb.com&CustomerID=778899001&UserCountryISOAlpha2Code=GB&LanguagePreferenceCode=41"
	}, {
		env : "stg",
		service : "gms_reg",
		url : "http://services-ext-stg.dnb.com/V2.0/gmsmonitoring/registrations?ApplicationTransactionID=onboard-1&TransactionTimestamp=2001-09-11T09:30:47-05:00&ApplicationID=42&UserID=teamjoly-j1@dnb.com&CustomerID=778899001&UserCountryISOAlpha2Code=GB&LanguagePreferenceCode=41"
	}, {
		env : "prod",
		service : "gms_reg",
		url : "https://maxcvservices.dnb.com/V2.0/gmsmonitoring/registrations?ApplicationTransactionID=onboard-1&TransactionTimestamp=2001-09-11T09:30:47-05:00&ApplicationID=42&UserID=teamjoly-j1@dnb.com&CustomerID=778899001&UserCountryISOAlpha2Code=GB&LanguagePreferenceCode=41"
	}, {
		env : "qa",
		service : "gms_profile_create",
		url : "http://services-ext-qa.dnb.com/V2.0/gmsmonitoring/monitoringprofiles?ApplicationTransactionID=onboard-1&TransactionTimestamp=2001-09-11T09:30:47-05:00&ApplicationID=42&UserID=teamjoly-j1@dnb.com&CustomerID=778899001&UserCountryISOAlpha2Code=GB&LanguagePreferenceCode=41"
	}, {
		env : "stg",
		service : "gms_profile_create",
		url : "http://services-ext-stg.dnb.com/V2.0/gmsmonitoring/monitoringprofiles?ApplicationTransactionID=onboard-1&TransactionTimestamp=2001-09-11T09:30:47-05:00&ApplicationID=42&UserID=teamjoly-j1@dnb.com&CustomerID=778899001&UserCountryISOAlpha2Code=GB&LanguagePreferenceCode=41"
	}, {
		env : "prod",
		service : "gms_profile_create",
		url : "https://maxcvservices.dnb.com/V2.0/gmsmonitoring/monitoringprofiles?ApplicationTransactionID=onboard-1&TransactionTimestamp=2001-09-11T09:30:47-05:00&ApplicationID=42&UserID=teamjoly-j1@dnb.com&CustomerID=778899001&UserCountryISOAlpha2Code=GB&LanguagePreferenceCode=41"
	}, {
		env : "qa",
		service : "gms_profile_param",
		url : "http://services-ext-qa.dnb.com/V2.0/gmsmonitoring/monitoringprofiles/{placeholder}?ApplicationTransactionID=onboard-1&TransactionTimestamp=2001-09-11T09:30:47-05:00&ApplicationID=42&UserID=teamjoly-j1@dnb.com&CustomerID=778899001&UserCountryISOAlpha2Code=GB&LanguagePreferenceCode=41"
	}, {
		env : "stg",
		service : "gms_profile_param",
		url : "http://services-ext-stg.dnb.com/V2.0/gmsmonitoring/monitoringprofiles/{placeholder}?ApplicationTransactionID=onboard-1&TransactionTimestamp=2001-09-11T09:30:47-05:00&ApplicationID=42&UserID=teamjoly-j1@dnb.com&CustomerID=778899001&UserCountryISOAlpha2Code=GB&LanguagePreferenceCode=41"
	}, {
		env : "prod",
		service : "gms_profile_param",
		url : "https://maxcvservices.dnb.com/V2.0/gmsmonitoring/monitoringprofiles/{placeholder}?ApplicationTransactionID=onboard-1&TransactionTimestamp=2001-09-11T09:30:47-05:00&ApplicationID=42&UserID=teamjoly-j1@dnb.com&CustomerID=778899001&UserCountryISOAlpha2Code=GB&LanguagePreferenceCode=41"
	}, {
		env : "qa",
		service : "gms_notice_list",
		url : "http://services-ext-qa.dnb.com/V2.0/gmsmonitoring/changenotices?ApplicationTransactionID=onboard-1&TransactionTimestamp=2001-09-11T09:30:47-05:00&ApplicationID=42&UserID=Cirrus1&CustomerID=778899002&UserCountryISOAlpha2Code=GB&LanguagePreferenceCode=41"
	}, {
		env : "stg",
		service : "gms_notice_list",
		url : "http://services-ext-stg.dnb.com/V2.0/gmsmonitoring/changenotices?ApplicationTransactionID=onboard-1&TransactionTimestamp=2001-09-11T09:30:47-05:00&ApplicationID=42&UserID=Cirrus1&CustomerID=778899002&UserCountryISOAlpha2Code=GB&LanguagePreferenceCode=41"
	}, {
		env : "prod",
		service : "gms_notice_list",
		url : "https://maxcvservices.dnb.com/V2.0/gmsmonitoring/changenotices?ApplicationTransactionID=onboard-1&TransactionTimestamp=2001-09-11T09:30:47-05:00&ApplicationID=42&UserID=Cirrus1&CustomerID=778899002&UserCountryISOAlpha2Code=GB&LanguagePreferenceCode=41"
	}, {
		env : "qa",
		service : "gms_notice_list_count",
		url : "http://services-ext-qa.dnb.com/V2.0/gmsmonitoring/changenotices?ApplicationTransactionID=onboard-1&TransactionTimestamp=2001-09-11T09:30:47-05:00&ApplicationID=42&UserID=Cirrus1&CustomerID=778899002&UserCountryISOAlpha2Code=GB&LanguagePreferenceCode=41&GetCountOnlyIndicator=1"
	}, {
		env : "stg",
		service : "gms_notice_list_count",
		url : "http://services-ext-stg.dnb.com/V2.0/gmsmonitoring/changenotices?ApplicationTransactionID=onboard-1&TransactionTimestamp=2001-09-11T09:30:47-05:00&ApplicationID=42&UserID=Cirrus1&CustomerID=778899002&UserCountryISOAlpha2Code=GB&LanguagePreferenceCode=41&GetCountOnlyIndicator=1"
	}, {
		env : "prod",
		service : "gms_notice_list_count",
		url : "https://maxcvservices.dnb.com/V2.0/gmsmonitoring/changenotices?ApplicationTransactionID=onboard-1&TransactionTimestamp=2001-09-11T09:30:47-05:00&ApplicationID=42&UserID=Cirrus1&CustomerID=778899002&UserCountryISOAlpha2Code=GB&LanguagePreferenceCode=41&GetCountOnlyIndicator=1"
	}, {
		env : "qa",
		service : "gms_notice_param",
		url : "http://services-ext-qa.dnb.com/V2.0/gmsmonitoring/changenotices/{placeholder}?ApplicationTransactionID=onboard-1&TransactionTimestamp=2001-09-11T09:30:47-05:00&ApplicationID=42&UserID=Cirrus1&CustomerID=778899002&UserCountryISOAlpha2Code=GB&LanguagePreferenceCode=41"
	}, {
		env : "stg",
		service : "gms_notice_param",
		url : "http://services-ext-stg.dnb.com/V2.0/gmsmonitoring/changenotices/{placeholder}?ApplicationTransactionID=onboard-1&TransactionTimestamp=2001-09-11T09:30:47-05:00&ApplicationID=42&UserID=Cirrus1&CustomerID=778899002&UserCountryISOAlpha2Code=GB&LanguagePreferenceCode=41"
	}, {
		env : "prod",
		service : "gms_notice_param",
		url : "https://maxcvservices.dnb.com/V2.0/gmsmonitoring/changenotices/{placeholder}?ApplicationTransactionID=onboard-1&TransactionTimestamp=2001-09-11T09:30:47-05:00&ApplicationID=42&UserID=Cirrus1&CustomerID=778899002&UserCountryISOAlpha2Code=GB&LanguagePreferenceCode=41"
	}, {
		env : "qa",
		service : "gms_subject",
		url : "http://services-ext-qa.dnb.com/V2.0/gmsmonitoring/monitoringsubjects/{placeholder}?DNBProductID=GSRL7&ApplicationTransactionID=onboard-1&TransactionTimestamp=2001-09-11T09:30:47-05:00&ApplicationID=42&UserID=Cirrus1&CustomerID=778899002&UserCountryISOAlpha2Code=GB&LanguagePreferenceCode=41"
	}, {
		env : "stg",
		service : "gms_subject",
		url : "http://services-ext-stg.dnb.com/V2.0/gmsmonitoring/monitoringsubjects/{placeholder}?DNBProductID=GSRL7&ApplicationTransactionID=onboard-1&TransactionTimestamp=2001-09-11T09:30:47-05:00&ApplicationID=42&UserID=Cirrus1&CustomerID=778899002&UserCountryISOAlpha2Code=GB&LanguagePreferenceCode=41"
	}, {
		env : "prod",
		service : "gms_subject",
		url : "https://maxcvservices.dnb.com/V2.0/gmsmonitoring/monitoringsubjects/{placeholder}?DNBProductID=GSRL7&ApplicationTransactionID=onboard-1&TransactionTimestamp=2001-09-11T09:30:47-05:00&ApplicationID=42&UserID=Cirrus1&CustomerID=778899002&UserCountryISOAlpha2Code=GB&LanguagePreferenceCode=41"
	}, {
		env : "qa",
		service : "gms_events",
		url : "http://services-ext-qa.dnb.com/V2.0/gmsmonitoring/changeevents/{placeholder}?DUNSNumber=200000024&DNBProductID=GSRL7&ApplicationTransactionID=onboard-1&TransactionTimestamp=2001-09-11T09:30:47-05:00&ApplicationID=42&UserID=Cirrus1&CustomerID=778899002&UserCountryISOAlpha2Code=GB&LanguagePreferenceCode=41"
	}, {
		env : "stg",
		service : "gms_events",
		url : "http://services-ext-stg.dnb.com/V2.0/gmsmonitoring/changeevents/{placeholder}?DUNSNumber=200000024&DNBProductID=GSRL7&ApplicationTransactionID=onboard-1&TransactionTimestamp=2001-09-11T09:30:47-05:00&ApplicationID=42&UserID=Cirrus1&CustomerID=778899002&UserCountryISOAlpha2Code=GB&LanguagePreferenceCode=41"
	}, {
		env : "prod",
		service : "gms_events",
		url : "https://maxcvservices.dnb.com/V2.0/gmsmonitoring/changeevents/{placeholder}?DUNSNumber=200000024&DNBProductID=GSRL7&ApplicationTransactionID=onboard-1&TransactionTimestamp=2001-09-11T09:30:47-05:00&ApplicationID=42&UserID=Cirrus1&CustomerID=778899002&UserCountryISOAlpha2Code=GB&LanguagePreferenceCode=41"
	}, {
		env : "qa",
		service : "portfolio_assets",
		url : "http://services-ext-qa.dnb.com/V2/assets?OrderTransactionTypeCode=0&CandidateMaximumQuantity=10&SortBasisText=PortfolioAssetID&SortDirectionText=Ascending&CandidateDisplayStartSequenceNumber=1&ApplicationTransactionID=f9fc47c5-6733-4325-bbbe-157deb0520ba&DNBProductID=ComplianceReport"
	}, {
		env : "stg",
		service : "portfolio_assets",
		url : "http://services-ext-stg.dnb.com/V2/assets?OrderTransactionTypeCode=0&CandidateMaximumQuantity=10&SortBasisText=PortfolioAssetID&SortDirectionText=Ascending&CandidateDisplayStartSequenceNumber=1&ApplicationTransactionID=f9fc47c5-6733-4325-bbbe-157deb0520ba&DNBProductID=ComplianceReport"
	}, {
		env : "prod",
		service : "portfolio_assets",
		url : "https://maxcvservices.dnb.com/V2/assets?OrderTransactionTypeCode=0&CandidateMaximumQuantity=10&SortBasisText=PortfolioAssetID&SortDirectionText=Ascending&CandidateDisplayStartSequenceNumber=1&ApplicationTransactionID=f9fc47c5-6733-4325-bbbe-157deb0520ba&DNBProductID=ComplianceReport"
	}, {
		env : "",
		service : "date_test",
		url : "http://date.jsontest.com/"
	}, {
		env : "",
		service : "open_company",
		url : "https://api.opencorporates.com/v0.3/companies/search?q={placeholder}&current_status=Active&order=score"
	}, {
		env : "",
		service : "open_officer",
		url : "https://api.opencorporates.com/v0.3/officers/search?q={placeholder}&order=score"
	} ],

	//Use this DUNS# if no specific parameter is provided.
	placeholder : "222228632"
});


/**
 * The default advanced settings to use.
 */
angular.module('clientApp').value('advancedSettings', {
	requestUrl : "",
	requestMethod : "get",
	appId : "36",
	userId : "teamjoly@dnb.com",
	password : "password",
	autoAuthenticate : true,
	payload : ""
});