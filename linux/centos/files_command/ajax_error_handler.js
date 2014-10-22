/*global define, document, window*/

define(['jquery', 'analytics/attributes', 'chrome_lib'], function ($, attrs, lib) {
	"use strict";
    $(document).ajaxError(function (event, jq_xhr, ajax_settings, thrown_error) {

		// STOP IF WE GET HERE WITH THE PATH OF /services/logger/log!
		if (ajax_settings.url.indexOf('/services/logger/log') !== -1) {
			return;
		}

        // See the Error Page section here: https://docspace.corp.redhat.com/docs/DOC-143337
        attrs.set('ErrorPageName', [jq_xhr.status, window.location.href]);
        attrs.set('ErrorPageType', 'errorPage');
        //attrs.set('ErrorReferringChannel', ''); // no way to know this yet
        attrs.set('ErrorChannel', window.siteMapState);
        attrs.set('ErrorType', jq_xhr.status);

		lib.log({
			error_message: "jQuery.ajax error: '" + thrown_error + "'",
			error_code: 'HTTP ' + jq_xhr.status,
			service_url: ajax_settings.url,
			user_agent: window.navigator.userAgent
		}, 'error', true);
    });
});
