
/**
 * TODO rename this (the constant and the file). Or remove it completely.
 */
angular.module('clientApp').constant('TYPEAHEAD', {

	//Some default entries for the URL typeahead. TODO Should these form part of a custom DnB 'import' package?
	endpoints : [ {
		service : "auth",
		url : "http://services-ext-qa.dnb.com/rest/Authentication"
	}, {
		service : "auth",
		url : "http://services-ext-stg.dnb.com/rest/Authentication"
	}, {
		service : "auth",
		url : "https://maxcvservices.dnb.com/rest/Authentication"
	}, {
		service : "linkage",
		url : "https://maxcvservices.dnb.com/rest/LinkageService/V2/OrderProduct?DUNSNumber={placeholder}&CountryISOAlpha2Code=GB&DNBProductID=LNK_FF_MNRT"
	}, {
		service : "gbo",
		url : "https://maxcvservices.dnb.com/V2/organizations/{placeholder}/products/GBO?ArchiveProductOptOutIndicator=true&ApplicationTransactionID=onboard"
	}, {
		service : "so",
		url : "https://maxcvservices.dnb.com/V2/organizations/{placeholder}/products/SMPL_OWNSHP?ArchiveProductOptOutIndicator=true&ApplicationTransactionID=onboard"
	}, {
		service : "kyc",
		url : "https://maxcvservices.dnb.com/V2/organizations/{placeholder}/products/KYC?ArchiveProductOptOutIndicator=true"
	}, {
		service : "match",
		url : "https://maxcvservices.dnb.com/rest/CompanyService/V2/Match?CountryISOAlpha2Code=GB&DUNSNumber={placeholder}"
	}, {
		service : "date_test",
		url : "http://date.jsontest.com/"
	}, {
		service : "open_company",
		url : "https://api.opencorporates.com/v0.3/companies/search?q={placeholder}&current_status=Active&order=score"
	}, {
		service : "open_officer",
		url : "https://api.opencorporates.com/v0.3/officers/search?q={placeholder}&order=score"
	} ]
});

