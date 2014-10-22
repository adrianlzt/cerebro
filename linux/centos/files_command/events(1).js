/*global define, require, portal*/
/*jslint browser: true*/

/**
 * Eloqua adapter for PAF.
 *
 * @module analytics/adapters/eloqua/events
 * @author Michael Clayton <mclayton@redhat.com>
 * @copyright Red Hat 2013-2014
 */
define(['chrome_lib', 'user_info'], function (lib) {

	'use strict';

	var eloqua_url_template = 'https://s1795.t.eloqua.com/e/f2?elqSiteID=1795&elqFormName=access-redhat-com-integration&F_FormData_Trigger=RHNDOWNLOAD&QA_Version={PAF_VERSION}&C_EmailAddress={EMAIL}&A_RedirectURL={URL}';

	/**
	 * A function which triggers the Eloqua request.  The request is sent as an
	 * image request to overcome the same-origin policy.
	 *
	 * @memberof module:analytics/adapters/eloqua/events
	 * @param {string} event_name The name of the event to trigger.
	 * @param {Event} e The DOM event which caused this function to be called.
	 * @param {object} data Any arbitrary data that might need to be passed in.  Not used by the eloqua adapter, currently.
	 * @param {function} callback A callback function to be run after this request has completed.
	 */
	function trigger(event_name, e, data, callback) {
		var eloqua_url;
		if (event_name === 'RHNDownload') {
			var img = document.createElement('img');
			eloqua_url = eloqua_url_template
				.replace('{URL}', encodeURI(lib.getEventTarget(e).getAttribute('href')))
				.replace('{EMAIL}', encodeURIComponent(portal.user_info.email))
				.replace('{PAF_VERSION}', encodeURIComponent(require('analytics/main').get_version().replace('PAF ', '')));
			img.src = eloqua_url;
			callback();
		}
	}

	function call_event() {
		// empty stub.  must implement a call_event function, but in Eloqua's
		// case it doesn't need to do anything
	}

	function wipe() {
		// empty stub.  must implement a wipe function, but in Eloqua's case it
		// doesn't need to do anything
	}

	return {
		trigger    : trigger,
		wipe       : wipe,
		call_event : call_event
	};

});

