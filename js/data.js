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
		id : "global",
		label : "Global Name Search / Entity List Service (v4.0)"
	}, {
		id : "investigation",
		label : "Investigation Service (POST)"
	}, {
		id : "portfolio_assets",
		label : "List Portfolio Asset (GET)"
	}, {
		id : "list_portfolio",
		label : "List Portfolio Service (POST)"
	}, {
		id : "gms_reg",
		label : "GMS Monitoring - Registration (GET/POST/PUT)"
	}, {
		id : "gms_profile_create",
		label : "GMS Monitoring - Profile List/Create (GET/POST)"
	}, {
		id : "gms_profile_param",
		label : "GMS Monitoring - Profile Get/Update/Delete (GET/PUT/DELETE)"
	}, {
		id : "gms_notice_list",
		label : "GMS Monitoring - Change Notice List (GET)"
	}, {
		id : "gms_notice_param",
		label : "GMS Monitoring - Change Notice Update (PUT)"
	}, {
		id : "gms_subject",
		label : "GMS Monitoring - Subject (GET)"
	}, {
		id : "gms_events",
		label : "GMS Monitoring - Change Events (GET)"
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
		url : "http://services-ext-qa.dnb.com/rest/ProductCatalogService/V2/ListAvailableProduct?DUNSNumber={duns}"
	}, {
		env : "stg",
		service : "pcs",
		url : "http://services-ext-stg.dnb.com/rest/ProductCatalogService/V2/ListAvailableProduct?DUNSNumber={duns}"
	}, {
		env : "prod",
		service : "pcs",
		url : "https://maxcvservices.dnb.com/rest/ProductCatalogService/V2/ListAvailableProduct?DUNSNumber={duns}"
	}, {
		env : "qa",
		service : "linkage",
		url : "http://services-ext-qa.dnb.com/rest/LinkageService/V2/OrderProduct?DUNSNumber={duns}&CountryISOAlpha2Code=GB&DNBProductID=LNK_FF_MNRT"
	}, {
		env : "stg",
		service : "linkage",
		url : "http://services-ext-stg.dnb.com/rest/LinkageService/V2/OrderProduct?DUNSNumber={duns}&CountryISOAlpha2Code=GB&DNBProductID=LNK_FF_MNRT"
	}, {
		env : "prod",
		service : "linkage",
		url : "https://maxcvservices.dnb.com/rest/LinkageService/V2/OrderProduct?DUNSNumber={duns}&CountryISOAlpha2Code=GB&DNBProductID=LNK_FF_MNRT"
	}, {
		env : "qa",
		service : "firm",
		url : "http://services-ext-qa.dnb.com/V2/organizations/{duns}/products/DCP_PREM_ONBRD?ArchiveProductOptOutIndicator=true"
	}, {
		env : "stg",
		service : "firm",
		url : "http://services-ext-stg.dnb.com/V2.0/organizations/{duns}/products/DCP_PREM_ONBRD?ArchiveProductOptOutIndicator=true"
	}, {
		env : "prod",
		service : "firm",
		url : "https://maxcvservices.dnb.com/V2.0/organizations/{duns}/products/DCP_PREM_ONBRD?ArchiveProductOptOutIndicator=true"
	}, {
		env : "qa",
		service : "gbo",
		url : "http://services-ext-qa.dnb.com/V2/organizations/{duns}/products/GBO?ArchiveProductOptOutIndicator=true"
	}, {
		env : "stg",
		service : "gbo",
		url : "http://services-ext-stg.dnb.com/V2.0/organizations/{duns}/products/GBO?ArchiveProductOptOutIndicator=true"
	}, {
		env : "prod",
		service : "gbo",
		url : "https://maxcvservices.dnb.com/V2/organizations/{duns}/products/GBO?ArchiveProductOptOutIndicator=true&ApplicationTransactionID=onboard"
	}, {
		env : "qa",
		service : "so",
		url : "http://services-ext-qa.dnb.com/V2/organizations/{duns}/products/SMPL_OWNSHP?ArchiveProductOptOutIndicator=true"
	}, {
		env : "stg",
		service : "so",
		url : "http://services-ext-stg.dnb.com/V2.0/organizations/{duns}/products/SMPL_OWNSHP?ArchiveProductOptOutIndicator=true"
	}, {
		env : "prod",
		service : "so",
		url : "https://maxcvservices.dnb.com/V2/organizations/{duns}/products/SMPL_OWNSHP?ArchiveProductOptOutIndicator=true&ApplicationTransactionID=onboard"
	}, {
		env : "qa",
		service : "kyc",
		url : "http://services-ext-qa.dnb.com/V2/organizations/{duns}/products/KYC?ArchiveProductOptOutIndicator=true"
	}, {
		env : "stg",
		service : "kyc",
		url : "http://services-ext-stg.dnb.com/V2.0/organizations/{duns}/products/KYC?ArchiveProductOptOutIndicator=true"
	}, {
		env : "prod",
		service : "kyc",
		url : "https://maxcvservices.dnb.com/V2/organizations/{duns}/products/KYC?ArchiveProductOptOutIndicator=true"
	}, {
		env : "qa",
		service : "rdc_search",
		url : "http://services-ext-qa.dnb.com/V1.0/compliancecheck/entities/alerts?CandidateDisplayStartSequenceNumber=1&CandidatePerPageMaximumQuantity=100&CustomerBillingEndorsementText=teamjoly&SubjectTypeText=P&subjectname={duns}"
	}, {
		env : "stg",
		service : "rdc_search",
		url : "http://services-ext-stg.dnb.com/V1.0/compliancecheck/entities/alerts?CandidateDisplayStartSequenceNumber=1&CandidatePerPageMaximumQuantity=100&CustomerBillingEndorsementText=teamjoly&SubjectTypeText=P&subjectname={duns}"
	}, {
		env : "prod",
		service : "rdc_search",
		url : "https://maxcvservices.dnb.com/V1.0/compliancecheck/entities/alerts?CandidateDisplayStartSequenceNumber=1&CandidatePerPageMaximumQuantity=100&CustomerBillingEndorsementText=teamjoly&SubjectTypeText=P&subjectname={duns}"
	}, {
		env : "qa",
		service : "match",
		url : "http://services-ext-qa.dnb.com/rest/CompanyService/V2/Match?CountryISOAlpha2Code=BE&DUNSNumber={duns}"
	}, {
		env : "stg",
		service : "match",
		url : "http://services-ext-stg.dnb.com/rest/CompanyService/V2/Match?CountryISOAlpha2Code=BE&DUNSNumber={duns}"
	}, {
		env : "prod",
		service : "match",
		url : "https://maxcvservices.dnb.com/rest/CompanyService/V2/Match?CountryISOAlpha2Code=BE&DUNSNumber={duns}"
	}, {
		env : "qa",
		service : "global",
		url : "http://services-ext-qa.dnb.com/V4.0/organizations?ExactLocationFindIndicator=true&InclusionDataDescription-1=IncludeUndeliverableAddressSubject&InclusionDataDescription-2=IncludeIncompleteData&InclusionDataDescription-3=IncludeOutofBusiness&SearchModeDescription=Basic&candidateMaximumQuantity=250&candidatePerPageMaximumQuantity=250&findcompany=true&httpClient.connectTimeout=10000&httpClient.socketTimeout=10000&keywordText={duns}"
	}, {
		env : "stg",
		service : "global",
		url : "http://services-ext-stg.dnb.com/V4.0/organizations?ExactLocationFindIndicator=true&InclusionDataDescription-1=IncludeUndeliverableAddressSubject&InclusionDataDescription-2=IncludeIncompleteData&InclusionDataDescription-3=IncludeOutofBusiness&SearchModeDescription=Basic&candidateMaximumQuantity=250&candidatePerPageMaximumQuantity=250&findcompany=true&httpClient.connectTimeout=10000&httpClient.socketTimeout=10000&keywordText={duns}"
	}, {
		env : "prod",
		service : "global",
		url : "https://maxcvservices.dnb.com/V4.0/organizations?ExactLocationFindIndicator=true&InclusionDataDescription-1=IncludeUndeliverableAddressSubject&InclusionDataDescription-2=IncludeIncompleteData&InclusionDataDescription-3=IncludeOutofBusiness&SearchModeDescription=Basic&candidateMaximumQuantity=250&candidatePerPageMaximumQuantity=250&findcompany=true&httpClient.connectTimeout=10000&httpClient.socketTimeout=10000&keywordText={duns}"
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
		url : "http://services-ext-qa.dnb.com/V2.0/gmsmonitoring/monitoringprofiles/{duns}?ApplicationTransactionID=onboard-1&TransactionTimestamp=2001-09-11T09:30:47-05:00&ApplicationID=42&UserID=teamjoly-j1@dnb.com&CustomerID=778899001&UserCountryISOAlpha2Code=GB&LanguagePreferenceCode=41"
	}, {
		env : "stg",
		service : "gms_profile_param",
		url : "http://services-ext-stg.dnb.com/V2.0/gmsmonitoring/monitoringprofiles/{duns}?ApplicationTransactionID=onboard-1&TransactionTimestamp=2001-09-11T09:30:47-05:00&ApplicationID=42&UserID=teamjoly-j1@dnb.com&CustomerID=778899001&UserCountryISOAlpha2Code=GB&LanguagePreferenceCode=41"
	}, {
		env : "prod",
		service : "gms_profile_param",
		url : "https://maxcvservices.dnb.com/V2.0/gmsmonitoring/monitoringprofiles/{duns}?ApplicationTransactionID=onboard-1&TransactionTimestamp=2001-09-11T09:30:47-05:00&ApplicationID=42&UserID=teamjoly-j1@dnb.com&CustomerID=778899001&UserCountryISOAlpha2Code=GB&LanguagePreferenceCode=41"
	}, {
		env : "qa",
		service : "gms_notice_list",
		url : "http://services-ext-qa.dnb.com/V2.0/gmsmonitoring/changenotices?ApplicationTransactionID=onboard-1&TransactionTimestamp=2001-09-11T09:30:47-05:00&ApplicationID=42&UserID=Cirrus1&CustomerID=778899002&UserCountryISOAlpha2Code=GB&LanguagePreferenceCode=41&GetCountOnlyIndicator=1"
	}, {
		env : "stg",
		service : "gms_notice_list",
		url : "http://services-ext-stg.dnb.com/V2.0/gmsmonitoring/changenotices?ApplicationTransactionID=onboard-1&TransactionTimestamp=2001-09-11T09:30:47-05:00&ApplicationID=42&UserID=Cirrus1&CustomerID=778899002&UserCountryISOAlpha2Code=GB&LanguagePreferenceCode=41&GetCountOnlyIndicator=1"
	}, {
		env : "prod",
		service : "gms_notice_list",
		url : "https://maxcvservices.dnb.com/V2.0/gmsmonitoring/changenotices?ApplicationTransactionID=onboard-1&TransactionTimestamp=2001-09-11T09:30:47-05:00&ApplicationID=42&UserID=Cirrus1&CustomerID=778899002&UserCountryISOAlpha2Code=GB&LanguagePreferenceCode=41&GetCountOnlyIndicator=1"
	}, {
		env : "qa",
		service : "gms_notice_param",
		url : "http://services-ext-qa.dnb.com/V2.0/gmsmonitoring/changenotices/{duns}?ApplicationTransactionID=onboard-1&TransactionTimestamp=2001-09-11T09:30:47-05:00&ApplicationID=42&UserID=Cirrus1&CustomerID=778899002&UserCountryISOAlpha2Code=GB&LanguagePreferenceCode=41"
	}, {
		env : "stg",
		service : "gms_notice_param",
		url : "http://services-ext-stg.dnb.com/V2.0/gmsmonitoring/changenotices/{duns}?ApplicationTransactionID=onboard-1&TransactionTimestamp=2001-09-11T09:30:47-05:00&ApplicationID=42&UserID=Cirrus1&CustomerID=778899002&UserCountryISOAlpha2Code=GB&LanguagePreferenceCode=41"
	}, {
		env : "prod",
		service : "gms_notice_param",
		url : "https://maxcvservices.dnb.com/V2.0/gmsmonitoring/changenotices/{duns}?ApplicationTransactionID=onboard-1&TransactionTimestamp=2001-09-11T09:30:47-05:00&ApplicationID=42&UserID=Cirrus1&CustomerID=778899002&UserCountryISOAlpha2Code=GB&LanguagePreferenceCode=41"
	}, {
		env : "qa",
		service : "gms_subject",
		url : "http://services-ext-qa.dnb.com/V2.0/gmsmonitoring/monitoringsubjects/{duns}?DNBProductID=GSRL7&ApplicationTransactionID=onboard-1&TransactionTimestamp=2001-09-11T09:30:47-05:00&ApplicationID=42&UserID=Cirrus1&CustomerID=778899002&UserCountryISOAlpha2Code=GB&LanguagePreferenceCode=41"
	}, {
		env : "stg",
		service : "gms_subject",
		url : "http://services-ext-stg.dnb.com/V2.0/gmsmonitoring/monitoringsubjects/{duns}?DNBProductID=GSRL7&ApplicationTransactionID=onboard-1&TransactionTimestamp=2001-09-11T09:30:47-05:00&ApplicationID=42&UserID=Cirrus1&CustomerID=778899002&UserCountryISOAlpha2Code=GB&LanguagePreferenceCode=41"
	}, {
		env : "prod",
		service : "gms_subject",
		url : "https://maxcvservices.dnb.com/V2.0/gmsmonitoring/monitoringsubjects/{duns}?DNBProductID=GSRL7&ApplicationTransactionID=onboard-1&TransactionTimestamp=2001-09-11T09:30:47-05:00&ApplicationID=42&UserID=Cirrus1&CustomerID=778899002&UserCountryISOAlpha2Code=GB&LanguagePreferenceCode=41"
	}, {
		env : "qa",
		service : "gms_events",
		url : "http://services-ext-qa.dnb.com/V2.0/gmsmonitoring/changeevents/{duns}?DUNSNumber=200000024&DNBProductID=GSRL7&ApplicationTransactionID=onboard-1&TransactionTimestamp=2001-09-11T09:30:47-05:00&ApplicationID=42&UserID=Cirrus1&CustomerID=778899002&UserCountryISOAlpha2Code=GB&LanguagePreferenceCode=41"
	}, {
		env : "stg",
		service : "gms_events",
		url : "http://services-ext-stg.dnb.com/V2.0/gmsmonitoring/changeevents/{duns}?DUNSNumber=200000024&DNBProductID=GSRL7&ApplicationTransactionID=onboard-1&TransactionTimestamp=2001-09-11T09:30:47-05:00&ApplicationID=42&UserID=Cirrus1&CustomerID=778899002&UserCountryISOAlpha2Code=GB&LanguagePreferenceCode=41"
	}, {
		env : "prod",
		service : "gms_events",
		url : "https://maxcvservices.dnb.com/V2.0/gmsmonitoring/changeevents/{duns}?DUNSNumber=200000024&DNBProductID=GSRL7&ApplicationTransactionID=onboard-1&TransactionTimestamp=2001-09-11T09:30:47-05:00&ApplicationID=42&UserID=Cirrus1&CustomerID=778899002&UserCountryISOAlpha2Code=GB&LanguagePreferenceCode=41"
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
	} ],

	//Use this DUNs if none is provided.
	placeholderDuns : "222228632"
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
	payload : ""
});