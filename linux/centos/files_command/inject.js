/*global avalon, breadcrumbs, jQuery, DEBUG, document, window, define, console, localStorage, Uri*/

function injectMask(query) {
	"use strict";
	var params, value, iterator, len, uri;

	uri = new Uri(query);
	value = uri.getQueryParamValue('mask');

	if ((value !== null) && (typeof value !== 'undefined')) {

		// if we dont support the mask... bail
		if (avalon.chrome.mask.hasOwnProperty(value) === false) {
			return;
		}

		// inject the HTML
		jQuery.get('/services/chrome/mask/' + value + '/', function (data) {
			jQuery('#container').prepend(data);
		});

		// modify the breadcrumbs
		if (typeof breadcrumbs !== 'undefined' && typeof breadcrumbs.splice !== 'undefined') {
			window.breadcrumbs.splice(0, 1);
			window.breadcrumbs.unshift([avalon.chrome.mask[value].breadcrumb_prefix.display, avalon.chrome.mask[value].breadcrumb_prefix.path]);
			for (iterator = 0, len = breadcrumbs.length; iterator < len; iterator = iterator + 1) {
				if (breadcrumbs[iterator].length === 2) {
					breadcrumbs[iterator][1] = breadcrumbs[iterator][1] + "?mask=storage";
				}
			}
		}

		// modify the links
		jQuery('#content a[href]').each(function () {
			var t, uri;
			t = jQuery(this);
			uri = new Uri(t.attr('href'));
			t.attr('href', uri.addQueryParam('mask', value));
		});
	}
}


jQuery(document).ready(function () {
	"use strict";

	if ((avalon.hasOwnProperty('chrome')) === false) {
		avalon.chrome = {};
		avalon.chrome.mask = {};
	}

	avalon.chrome.mask = {
		'storage' : {
			'breadcrumb_prefix': {
				'path': '/products/Red_Hat_Storage/',
				'display': 'Red Hat Storage'
			}
		}
	};

	injectMask(window.location.search);
});