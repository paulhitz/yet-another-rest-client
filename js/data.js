/**
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
		label : "Production"
	} ],

	services : [ {
		id : "pcs",
		label : "Product Catalog Service (v2)",
		description : "The Product Catalog Service enables customers to get information on available products for the given DUNS# based on the entitlements of the customer's current contract.",
		group : "Common"
	}, {
		id : "linkage",
		label : "Linkage Service (v2)",
		description : "The Linkage service returns data about a single Global Family Tree (GFT).",
		group : "Common"
	}, {
		id : "firm",
		label : "Firmographics (DCP_PREM_ONBRD)",
		description : "Provides basic marketing information such as business name, address, trade style, executive names and titles, financials, number of employees etc.",
		group : "Custom Product Service"
	}, {
		id : "kyc",
		label : "KYC (Know Your Customer)",
		description : "The KYC service provides critical compliance information on businesses and principles in 110 countries to ensure a business is compliant with AML regulations and KYC requirements.",
		group : "Custom Product Service"
	}, {
		id : "gbo",
		label : "GBO (Global Beneficial Ownership)",
		description : "The GBO service combines global corporate linkage and individual share ownership. It enables a customer to establish direct and indirect Ultimate Beneficial Ownership at the level that is required for AML/KYC.",
		group : "Custom Product Service"
	}, {
		id : "so",
		label : "SO (Simple Ownership)",
		description : "Simplified Global Beneficial Ownership. Lacks share ownership for individuals and other details.",
		group : "Custom Product Service"
	}, {
		id : "match",
		label : "Match (REST version)",
		description : "Searches for companies based on DUNS#. The Onboard application does NOT use the REST version of Match. It still uses the SOAP version.",
		group : "Search"
	}, {
		id : "global",
		label : "Global Name Search / Entity List Service (v4.0)",
		description : "Returns a set of companies based on DUNS# or keyword, along with basic identifying data for each company.",
		group : "Search"
	}, {
		id : "portfolio_assets",
		label : "List Portfolio Asset (GET)",
		description : "Retrieve a list of assets stored by the Portfolio Service based on the Application Transaction ID and the Product ID.",
		group : "Portfolio"
	}, {
		id : "list_portfolio",
		label : "List Portfolio Service (POST)",
		description : "This service provides a convenient way to retrieve the list of available assets stored using the Portfolio Service.",
		group : "Portfolio"
	}, {
		id : "director_search",
		label : "Officer Search (by Last Name)",
		description : "This service uses Companies House data. This particular operation searches for directors/officers. The last name (e.g. 'Smith') should be provided as a parameter.",
		group : "Director Search (v1.0)"
	}, {
		id : "director_order",
		label : "Officer Details",
		description : "This service uses Companies House data. This particular operation provides more details about a specified officer/director. An 'Officer ID' should be passed as a parameter. The content of this parameter should be URL-encoded.",
		group : "Director Search (v1.0)"
	}, {
		id : "rdc_search",
		label : "RDC Search",
		description : "This service allows organizations to identify banned or suspect entities (suppliers, partners, customers, etc.) and individuals, strengthen fraud protection, ensure regulatory compliance and manage supply and distribution risk.",
		group : "ComplianceCheck Service (v1.0)"
	}, {
		id : "rdc_entity",
		label : "RDC Entity Information (Silvio Berlusconi)",
		description : "Request more information regarding the specified entity. This request is hard-coded with the entity ID of 'Silvio Berlusconi'.",
		group : "ComplianceCheck Service (v1.0)"
	}, {
		id : "rdc_entity_pdf",
		label : "RDC Entity Information - PDF (Silvio Berlusconi)",
		description : "Request a PDF with more information regarding the specified entity. This request is hard-coded with the entity ID of 'Silvio Berlusconi'.",
		group : "ComplianceCheck Service (v1.0)"
	}, {
		id : "rdc_alerts",
		label : "Monitoring - Alerts",
		description : "Allows a customer to retrieve a list of recent alerts triggered by active registrations across multiple subjects.",
		group : "ComplianceCheck Service (v1.0)"
	}, {
		id : "rdc_alerts_batch",
		label : "Monitoring - Alerts by Batch ID",
		description : "Allows a customer to retrieve a list of recent alerts filtered by Batch ID. This request requires a 'Subject ID'.",
		group : "ComplianceCheck Service (v1.0)"
	}, {
		id : "rdc_subject_alerts",
		label : "Monitoring - Subject Alerts",
		description : "Allows a customer to retrieve the results from a successful subject registration. A tracking ID is provided by the 'Register Subject' function that allows for direct access to the results. This ID should be provided as a parameter to this request.",
		group : "ComplianceCheck Service (v1.0)"
	}, {
		id : "rdc_register",
		label : "Monitoring - Register Entity (POST)",
		description : "Allows a customer to specify a subject (organizations and/or individuals) to be submitted for compliance screening using the ComplianceCheck service.",
		group : "ComplianceCheck Service (v1.0)"
	}, {
		id : "gms_reg",
		label : "Registration (GET/POST/PUT)",
		description : "The GMS service has limited documentation. The GMS endpoints configured in this tool are specific to the Onboard application.",
		group : "GMS Monitoring (Onboard Specific)"
	}, {
		id : "gms_profile_create",
		label : "Profile List/Create (GET/POST)",
		description : "The GMS service has limited documentation. The GMS endpoints configured in this tool are specific to the Onboard application.",
		group : "GMS Monitoring (Onboard Specific)"
	}, {
		id : "gms_profile_param",
		label : "Profile Get/Update/Delete (GET/PUT/DELETE)",
		description : "The GMS service has limited documentation. The GMS endpoints configured in this tool are specific to the Onboard application.",
		group : "GMS Monitoring (Onboard Specific)"
	}, {
		id : "gms_notice_list",
		label : "Change Notice List (GET)",
		description : "The GMS service has limited documentation. The GMS endpoints configured in this tool are specific to the Onboard application.",
		group : "GMS Monitoring (Onboard Specific)"
	}, {
		id : "gms_notice_list_count",
		label : "Change Notice List Count (GET)",
		description : "The GMS service has limited documentation. The GMS endpoints configured in this tool are specific to the Onboard application.",
		group : "GMS Monitoring (Onboard Specific)"
	}, {
		id : "gms_notice_param",
		label : "Change Notice Update (PUT)",
		description : "The GMS service has limited documentation. The GMS endpoints configured in this tool are specific to the Onboard application.",
		group : "GMS Monitoring (Onboard Specific)"
	}, {
		id : "gms_subject",
		label : "Subject (GET)",
		description : "The GMS service has limited documentation. The GMS endpoints configured in this tool are specific to the Onboard application.",
		group : "GMS Monitoring (Onboard Specific)"
	}, {
		id : "gms_events",
		label : "Change Events (GET)",
		description : "The GMS service has limited documentation. The GMS endpoints configured in this tool are specific to the Onboard application.",
		group : "GMS Monitoring (Onboard Specific)"
	}, {
		id : "gms_alert_report",
		label : "Alert Report (GET)",
		description : "The GMS service has limited documentation. The GMS endpoints configured in this tool are specific to the Onboard application.",
		group : "GMS Monitoring (Onboard Specific)"
	}, {
		id : "investigation",
		label : "Investigation Service (POST)",
		description : "A service for requesting investigations in order to obtain the most recent information on a business. Successful investigations result in the creation or revision of a Business Information Report (BIR).",
		group : "Miscellaneous"
	}, {
		id : "pcs_public_docs",
		label : "Product Catalog Service - Available Image List",
		description : "This service enables the identification of all available company documents that have been filed for a specified UK DUNS#.",
		group : "Miscellaneous"
	}, {
		id : "order_company_doc",
		label : "Report Product Service - Order Company Public Document",
		description : "This service is used to order BASE64-encoded PDF company documents. It can be used with Available Image List. This particular request is hard-coded to a specific company document.",
		group : "Miscellaneous"
	}, {
		id : "date_test",
		label : "JSONTest.com Date/Time",
		description : "JSONTest.com is a testing platform for REST services.",
		group : "External (No Authentication Required)"
	}, {
		id : "open_company",
		label : "OpenCorporates - Companies Search",
		description : "Search the largest open database of companies in the world. Search by company name. E.g. Microsoft",
		group : "External (No Authentication Required)"
	}, {
		id : "open_officer",
		label : "OpenCorporates - Officers Search",
		description : "Directors Search from Open Corporates - The largest open database of companies in the world.",
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
		service : "pcs_public_docs",
		url : "http://services-ext-qa.dnb.com/rest/ProductCatalogService/V2/ListAvailablePublicDocuments?DUNSNumber={placeholder}"
	}, {
		env : "stg",
		service : "pcs_public_docs",
		url : "http://services-ext-stg.dnb.com/rest/ProductCatalogService/V2/ListAvailablePublicDocuments?DUNSNumber={placeholder}"
	}, {
		env : "prod",
		service : "pcs_public_docs",
		url : "https://maxcvservices.dnb.com/rest/ProductCatalogService/V2/ListAvailablePublicDocuments?DUNSNumber={placeholder}"
	}, {
		env : "qa",
		service : "order_company_doc",
		url : "http://services-ext-qa.dnb.com/rest/ReportProductService/V2/OrderCompanyPublicDocument?DUNSNumber=987027422&FilingDate=2015-05-01&FilingReferenceNumber=184269936&DocumentFormName=B10(R)"
	}, {
		env : "stg",
		service : "order_company_doc",
		url : "http://services-ext-stg.dnb.com/rest/ReportProductService/V2/OrderCompanyPublicDocument?DUNSNumber=987027422&FilingDate=2015-05-01&FilingReferenceNumber=184269936&DocumentFormName=B10(R)"
	}, {
		env : "prod",
		service : "order_company_doc",
		url : "https://maxcvservices.dnb.com/rest/ReportProductService/V2/OrderCompanyPublicDocument?DUNSNumber=987027422&FilingDate=2015-05-01&FilingReferenceNumber=184269936&DocumentFormName=B10(R)"
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
		url : "http://services-ext-qa.dnb.com/V1.0/compliancecheck/entities/alerts?CandidateDisplayStartSequenceNumber=1&CandidatePerPageMaximumQuantity=100&CustomerBillingEndorsementText=dnb_test&SubjectTypeText=P&subjectname={placeholder}"
	}, {
		env : "stg",
		service : "rdc_search",
		url : "http://services-ext-stg.dnb.com/V1.0/compliancecheck/entities/alerts?CandidateDisplayStartSequenceNumber=1&CandidatePerPageMaximumQuantity=100&CustomerBillingEndorsementText=dnb_test&SubjectTypeText=P&subjectname={placeholder}"
	}, {
		env : "prod",
		service : "rdc_search",
		url : "https://maxcvservices.dnb.com/V1.0/compliancecheck/entities/alerts?CandidateDisplayStartSequenceNumber=1&CandidatePerPageMaximumQuantity=100&CustomerBillingEndorsementText=dnb_test&SubjectTypeText=P&subjectname={placeholder}"
	}, {
		env : "qa",
		service : "rdc_entity",
		url : "http://services-ext-qa.dnb.com/V1.0/compliancecheck/entities/EntitySystemID-1b59b76f0e75fee15d3f3d53eb346cc4/products/CMP_ENT_DTL?ProductFormatPreferenceCode=7004&httpClient.socketTimeout=30000&httpClient.connectTimeout=30000&CustomerBillingEndorsementText=dnb_test"
	}, {
		env : "stg",
		service : "rdc_entity",
		url : "http://services-ext-stg.dnb.com/V1.0/compliancecheck/entities/EntitySystemID-1b59b76f0e75fee15d3f3d53eb346cc4/products/CMP_ENT_DTL?ProductFormatPreferenceCode=7004&httpClient.socketTimeout=30000&httpClient.connectTimeout=30000&CustomerBillingEndorsementText=dnb_test"
	}, {
		env : "prod",
		service : "rdc_entity",
		url : "https://maxcvservices.dnb.com/V1.0/compliancecheck/entities/EntitySystemID-1b59b76f0e75fee15d3f3d53eb346cc4/products/CMP_ENT_DTL?ProductFormatPreferenceCode=7004&httpClient.socketTimeout=30000&httpClient.connectTimeout=30000&CustomerBillingEndorsementText=dnb_test"
	}, {
		env : "qa",
		service : "rdc_entity_pdf",
		url : "http://services-ext-qa.dnb.com/V1.0/compliancecheck/entities/EntitySystemID-1b59b76f0e75fee15d3f3d53eb346cc4/products/CMP_ENT_VW?ProductFormatPreferenceCode=13204&httpClient.socketTimeout=30000&httpClient.connectTimeout=30000&CustomerBillingEndorsementText=dnb_test"
	}, {
		env : "stg",
		service : "rdc_entity_pdf",
		url : "http://services-ext-stg.dnb.com/V1.0/compliancecheck/entities/EntitySystemID-1b59b76f0e75fee15d3f3d53eb346cc4/products/CMP_ENT_VW?ProductFormatPreferenceCode=13204&httpClient.socketTimeout=30000&httpClient.connectTimeout=30000&CustomerBillingEndorsementText=dnb_test"
	}, {
		env : "prod",
		service : "rdc_entity_pdf",
		url : "https://maxcvservices.dnb.com/V1.0/compliancecheck/entities/EntitySystemID-1b59b76f0e75fee15d3f3d53eb346cc4/products/CMP_ENT_VW?ProductFormatPreferenceCode=13204&httpClient.socketTimeout=30000&httpClient.connectTimeout=30000&CustomerBillingEndorsementText=dnb_test"
	}, {
		env : "qa",
		service : "rdc_alerts",
		url : "http://services-ext-qa.dnb.com/V1.0/compliancecheck/subjects/alerts"
	}, {
		env : "stg",
		service : "rdc_alerts",
		url : "http://services-ext-stg.dnb.com/V1.0/compliancecheck/subjects/alerts"
	}, {
		env : "prod",
		service : "rdc_alerts",
		url : "https://maxcvservices.dnb.com/V1.0/compliancecheck/subjects/alerts"
	}, {
		env : "qa",
		service : "rdc_alerts_batch",
		url : "http://services-ext-qa.dnb.com/V1.0/compliancecheck/subjects/alerts?SubjectID={placeholder}"
	}, {
		env : "stg",
		service : "rdc_alerts_batch",
		url : "http://services-ext-stg.dnb.com/V1.0/compliancecheck/subjects/alerts?SubjectID={placeholder}"
	}, {
		env : "prod",
		service : "rdc_alerts_batch",
		url : "https://maxcvservices.dnb.com/V1.0/compliancecheck/subjects/alerts?SubjectID={placeholder}"
	}, {
		env : "qa",
		service : "rdc_subject_alerts",
		url : "http://services-ext-qa.dnb.com/V1.0/compliancecheck/subjects/{placeholder}?ComplianceDataModuleID=ALERTS"
	}, {
		env : "stg",
		service : "rdc_subject_alerts",
		url : "http://services-ext-stg.dnb.com/V1.0/compliancecheck/subjects/{placeholder}?ComplianceDataModuleID=ALERTS"
	}, {
		env : "prod",
		service : "rdc_subject_alerts",
		url : "https://maxcvservices.dnb.com/V1.0/compliancecheck/subjects/{placeholder}?ComplianceDataModuleID=ALERTS"
	}, {
		env : "qa",
		service : "rdc_register",
		url : "http://services-ext-qa.dnb.com/V1.0/compliancecheck/subjects"
	}, {
		env : "stg",
		service : "rdc_register",
		url : "http://services-ext-stg.dnb.com/V1.0/compliancecheck/subjects"
	}, {
		env : "prod",
		service : "rdc_register",
		url : "https://maxcvservices.dnb.com/V1.0/compliancecheck/subjects"
	}, {
		env : "qa",
		service : "match",
		url : "http://services-ext-qa.dnb.com/rest/CompanyService/V2/Match?CountryISOAlpha2Code=GB&DUNSNumber={placeholder}"
	}, {
		env : "stg",
		service : "match",
		url : "http://services-ext-stg.dnb.com/rest/CompanyService/V2/Match?CountryISOAlpha2Code=GB&DUNSNumber={placeholder}"
	}, {
		env : "prod",
		service : "match",
		url : "https://maxcvservices.dnb.com/rest/CompanyService/V2/Match?CountryISOAlpha2Code=GB&DUNSNumber={placeholder}"
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
		service : "director_search",
		url : "http://services-ext-qa.dnb.com/v1.0/companyhouse/officers?officerType=CUR&officerLastName={placeholder}"
	}, {
		env : "stg",
		service : "director_search",
		url : "http://services-ext-stg.dnb.com/v1.0/companyhouse/officers?officerType=CUR&officerLastName={placeholder}"
	}, {
		env : "prod",
		service : "director_search",
		url : "https://maxcvservices.dnb.com/v1.0/companyhouse/officers?officerType=CUR&officerLastName={placeholder}"
	}, {
		env : "qa",
		service : "director_order",
		url : "http://services-ext-qa.dnb.com/v1.0/companyhouse/officers/{placeholder}"
	}, {
		env : "stg",
		service : "director_order",
		url : "http://services-ext-stg.dnb.com/v1.0/companyhouse/officers/{placeholder}"
	}, {
		env : "prod",
		service : "director_order",
		url : "https://maxcvservices.dnb.com/v1.0/companyhouse/officers/{placeholder}"
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
		url : "http://services-ext-qa.dnb.com/V2.0/gmsmonitoring/registrations?ApplicationTransactionID=onboard-1&TransactionTimestamp=2001-09-11T09:30:47-05:00&ApplicationID=36&UserID=teamjoly@dnb.com&CustomerID=965088422&UserCountryISOAlpha2Code=GB&LanguagePreferenceCode=41"
	}, {
		env : "stg",
		service : "gms_reg",
		url : "http://services-ext-stg.dnb.com/V2.0/gmsmonitoring/registrations?ApplicationTransactionID=onboard-1&TransactionTimestamp=2001-09-11T09:30:47-05:00&ApplicationID=36&UserID=teamjoly@dnb.com&CustomerID=970041271&UserCountryISOAlpha2Code=GB&LanguagePreferenceCode=41"
	}, {
		env : "prod",
		service : "gms_reg",
		url : "https://maxcvservices.dnb.com/V2.0/gmsmonitoring/registrations?ApplicationTransactionID=onboard-1&TransactionTimestamp=2001-09-11T09:30:47-05:00&ApplicationID=36&UserID=teamjoly@dnb.com&CustomerID=970151058&UserCountryISOAlpha2Code=GB&LanguagePreferenceCode=41"
	}, {
		env : "qa",
		service : "gms_profile_create",
		url : "http://services-ext-qa.dnb.com/V2.0/gmsmonitoring/monitoringprofiles?ApplicationTransactionID=onboard-1&TransactionTimestamp=2001-09-11T09:30:47-05:00&ApplicationID=36&UserID=teamjoly@dnb.com&CustomerID=965088422&UserCountryISOAlpha2Code=GB&LanguagePreferenceCode=41"
	}, {
		env : "stg",
		service : "gms_profile_create",
		url : "http://services-ext-stg.dnb.com/V2.0/gmsmonitoring/monitoringprofiles?ApplicationTransactionID=onboard-1&TransactionTimestamp=2001-09-11T09:30:47-05:00&ApplicationID=36&UserID=teamjoly@dnb.com&CustomerID=970041271&UserCountryISOAlpha2Code=GB&LanguagePreferenceCode=41"
	}, {
		env : "prod",
		service : "gms_profile_create",
		url : "https://maxcvservices.dnb.com/V2.0/gmsmonitoring/monitoringprofiles?ApplicationTransactionID=onboard-1&TransactionTimestamp=2001-09-11T09:30:47-05:00&ApplicationID=36&UserID=teamjoly@dnb.com&CustomerID=970151058&UserCountryISOAlpha2Code=GB&LanguagePreferenceCode=41"
	}, {
		env : "qa",
		service : "gms_profile_param",
		url : "http://services-ext-qa.dnb.com/V2.0/gmsmonitoring/monitoringprofiles/{placeholder}?ApplicationTransactionID=onboard-1&TransactionTimestamp=2001-09-11T09:30:47-05:00&ApplicationID=36&UserID=teamjoly@dnb.com&CustomerID=965088422&UserCountryISOAlpha2Code=GB&LanguagePreferenceCode=41"
	}, {
		env : "stg",
		service : "gms_profile_param",
		url : "http://services-ext-stg.dnb.com/V2.0/gmsmonitoring/monitoringprofiles/{placeholder}?ApplicationTransactionID=onboard-1&TransactionTimestamp=2001-09-11T09:30:47-05:00&ApplicationID=36&UserID=teamjoly@dnb.com&CustomerID=970041271&UserCountryISOAlpha2Code=GB&LanguagePreferenceCode=41"
	}, {
		env : "prod",
		service : "gms_profile_param",
		url : "https://maxcvservices.dnb.com/V2.0/gmsmonitoring/monitoringprofiles/{placeholder}?ApplicationTransactionID=onboard-1&TransactionTimestamp=2001-09-11T09:30:47-05:00&ApplicationID=36&UserID=teamjoly@dnb.com&CustomerID=970151058&UserCountryISOAlpha2Code=GB&LanguagePreferenceCode=41"
	}, {
		env : "qa",
		service : "gms_notice_list",
		url : "http://services-ext-qa.dnb.com/V2.0/gmsmonitoring/changenotices?ApplicationTransactionID=onboard-1&TransactionTimestamp=2001-09-11T09:30:47-05:00&ApplicationID=36&UserID=teamjoly@dnb.com&CustomerID=965088422&UserCountryISOAlpha2Code=GB&LanguagePreferenceCode=41"
	}, {
		env : "stg",
		service : "gms_notice_list",
		url : "http://services-ext-stg.dnb.com/V2.0/gmsmonitoring/changenotices?ApplicationTransactionID=onboard-1&TransactionTimestamp=2001-09-11T09:30:47-05:00&ApplicationID=36&UserID=teamjoly@dnb.com&CustomerID=970041271&UserCountryISOAlpha2Code=GB&LanguagePreferenceCode=41"
	}, {
		env : "prod",
		service : "gms_notice_list",
		url : "https://maxcvservices.dnb.com/V2.0/gmsmonitoring/changenotices?ApplicationTransactionID=onboard-1&TransactionTimestamp=2001-09-11T09:30:47-05:00&ApplicationID=36&UserID=teamjoly@dnb.com&CustomerID=970151058&UserCountryISOAlpha2Code=GB&LanguagePreferenceCode=41"
	}, {
		env : "qa",
		service : "gms_notice_list_count",
		url : "http://services-ext-qa.dnb.com/V2.0/gmsmonitoring/changenotices?ApplicationTransactionID=onboard-1&TransactionTimestamp=2001-09-11T09:30:47-05:00&ApplicationID=36&UserID=teamjoly@dnb.com&CustomerID=965088422&UserCountryISOAlpha2Code=GB&LanguagePreferenceCode=41&GetCountOnlyIndicator=1"
	}, {
		env : "stg",
		service : "gms_notice_list_count",
		url : "http://services-ext-stg.dnb.com/V2.0/gmsmonitoring/changenotices?ApplicationTransactionID=onboard-1&TransactionTimestamp=2001-09-11T09:30:47-05:00&ApplicationID=36&UserID=teamjoly@dnb.com&CustomerID=970041271&UserCountryISOAlpha2Code=GB&LanguagePreferenceCode=41&GetCountOnlyIndicator=1"
	}, {
		env : "prod",
		service : "gms_notice_list_count",
		url : "https://maxcvservices.dnb.com/V2.0/gmsmonitoring/changenotices?ApplicationTransactionID=onboard-1&TransactionTimestamp=2001-09-11T09:30:47-05:00&ApplicationID=36&UserID=teamjoly@dnb.com&CustomerID=970151058&UserCountryISOAlpha2Code=GB&LanguagePreferenceCode=41&GetCountOnlyIndicator=1"
	}, {
		env : "qa",
		service : "gms_notice_param",
		url : "http://services-ext-qa.dnb.com/V2.0/gmsmonitoring/changenotices/{placeholder}?ApplicationTransactionID=onboard-1&TransactionTimestamp=2001-09-11T09:30:47-05:00&ApplicationID=36&UserID=teamjoly@dnb.com&CustomerID=965088422&UserCountryISOAlpha2Code=GB&LanguagePreferenceCode=41"
	}, {
		env : "stg",
		service : "gms_notice_param",
		url : "http://services-ext-stg.dnb.com/V2.0/gmsmonitoring/changenotices/{placeholder}?ApplicationTransactionID=onboard-1&TransactionTimestamp=2001-09-11T09:30:47-05:00&ApplicationID=36&UserID=teamjoly@dnb.com&CustomerID=970041271&UserCountryISOAlpha2Code=GB&LanguagePreferenceCode=41"
	}, {
		env : "prod",
		service : "gms_notice_param",
		url : "https://maxcvservices.dnb.com/V2.0/gmsmonitoring/changenotices/{placeholder}?ApplicationTransactionID=onboard-1&TransactionTimestamp=2001-09-11T09:30:47-05:00&ApplicationID=36&UserID=teamjoly@dnb.com&CustomerID=970151058&UserCountryISOAlpha2Code=GB&LanguagePreferenceCode=41"
	}, {
		env : "qa",
		service : "gms_subject",
		url : "http://services-ext-qa.dnb.com/V2.0/gmsmonitoring/monitoringsubjects/{placeholder}?DNBProductID=GSRL7&ApplicationTransactionID=onboard-1&TransactionTimestamp=2001-09-11T09:30:47-05:00&ApplicationID=36&UserID=teamjoly@dnb.com&CustomerID=965088422&UserCountryISOAlpha2Code=GB&LanguagePreferenceCode=41"
	}, {
		env : "stg",
		service : "gms_subject",
		url : "http://services-ext-stg.dnb.com/V2.0/gmsmonitoring/monitoringsubjects/{placeholder}?DNBProductID=GSRL7&ApplicationTransactionID=onboard-1&TransactionTimestamp=2001-09-11T09:30:47-05:00&ApplicationID=36&UserID=teamjoly@dnb.com&CustomerID=970041271&UserCountryISOAlpha2Code=GB&LanguagePreferenceCode=41"
	}, {
		env : "prod",
		service : "gms_subject",
		url : "https://maxcvservices.dnb.com/V2.0/gmsmonitoring/monitoringsubjects/{placeholder}?DNBProductID=GSRL7&ApplicationTransactionID=onboard-1&TransactionTimestamp=2001-09-11T09:30:47-05:00&ApplicationID=36&UserID=teamjoly@dnb.com&CustomerID=970151058&UserCountryISOAlpha2Code=GB&LanguagePreferenceCode=41"
	}, {
		env : "qa",
		service : "gms_events",
		url : "http://services-ext-qa.dnb.com/V2.0/gmsmonitoring/changeevents/{placeholder}?DUNSNumber=200000024&DNBProductID=GSRL7&ApplicationTransactionID=onboard-1&TransactionTimestamp=2001-09-11T09:30:47-05:00&ApplicationID=36&UserID=teamjoly@dnb.com&CustomerID=965088422&UserCountryISOAlpha2Code=GB&LanguagePreferenceCode=41"
	}, {
		env : "stg",
		service : "gms_events",
		url : "http://services-ext-stg.dnb.com/V2.0/gmsmonitoring/changeevents/{placeholder}?DUNSNumber=200000024&DNBProductID=GSRL7&ApplicationTransactionID=onboard-1&TransactionTimestamp=2001-09-11T09:30:47-05:00&ApplicationID=36&UserID=teamjoly@dnb.com&CustomerID=970041271&UserCountryISOAlpha2Code=GB&LanguagePreferenceCode=41"
	}, {
		env : "prod",
		service : "gms_events",
		url : "https://maxcvservices.dnb.com/V2.0/gmsmonitoring/changeevents/{placeholder}?DUNSNumber=200000024&DNBProductID=GSRL7&ApplicationTransactionID=onboard-1&TransactionTimestamp=2001-09-11T09:30:47-05:00&ApplicationID=36&UserID=teamjoly@dnb.com&CustomerID=970151058&UserCountryISOAlpha2Code=GB&LanguagePreferenceCode=41"
	}, {
		env : "qa",
		service : "gms_alert_report",
		url : "http://services-ext-qa.dnb.com/V2.0/gmsmonitoring/alertreport?UserID=teamjoly@dnb.com&CustomerID=965088422&DUNSNumber={placeholder}&CountryISOAlpha2Code=GB&ChangeEventID=355746&ApplicationTransactionID=onboard-1&ApplicationID=36&UserCountryISOAlpha2Code=GB&LanguagePreferenceCode=39&SeverityText=Down%20Trend&ChangeEventTypeCode=17893"
	}, {
		env : "stg",
		service : "gms_alert_report",
		url : "http://services-ext-stg.dnb.com/V2.0/gmsmonitoring/alertreport?UserID=teamjoly@dnb.com&CustomerID=970041271&DUNSNumber={placeholder}&CountryISOAlpha2Code=GB&ChangeEventID=355746&ApplicationTransactionID=onboard-1&ApplicationID=36&UserCountryISOAlpha2Code=GB&LanguagePreferenceCode=39&SeverityText=Down%20Trend&ChangeEventTypeCode=17893"
	}, {
		env : "prod",
		service : "gms_alert_report",
		url : "https://maxcvservices.dnb.com/V2.0/gmsmonitoring/alertreport?UserID=teamjoly@dnb.com&CustomerID=970151058&DUNSNumber={placeholder}&CountryISOAlpha2Code=GB&ChangeEventID=355746&ApplicationTransactionID=onboard-1&ApplicationID=36&UserCountryISOAlpha2Code=GB&LanguagePreferenceCode=39&SeverityText=Down%20Trend&ChangeEventTypeCode=17893"
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
	autoAuthenticate : false,
	payload : ""
});


/**
 * The credentials used for authentication. If available, these are populated from Chrome Storage.
 * If necessary, there is also an option to hard-code them here.
 */
angular.module('clientApp').value('credentials', {});

/**
 *
 */
angular.module('clientApp').constant('EXAMPLE_HEADERS', [ 
	{
		id : "auth",
		name : "Authorization",
		value : ""
	}, {
		id : "id",
		name : "ApplicationId",
		value : "36"
	}, {
		id : "content",
		name : "Content-Type",
		value : "application/json"
	}, {
		id : "accept",
		name : "Accept",
		value : "application/json"
	} ]
);








