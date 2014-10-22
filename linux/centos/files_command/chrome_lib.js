/*global define, console, document, window, chrometwo_require*/
/*jslint browser: true*/

define('chrome_lib', ['jquery', 'jsUri'], function ($, jsUri) {
	"use strict";
	var private_functions, lib;


	private_functions = {
		/**
		 * Store things in local- or sessionStorage.  Because *Storage only
		 * accepts string values, the store will automatically serialize
		 * objects into JSON strings when you store them (set), and deserialize
		 * them back into objects when you retrieve them (get).
		 *
		 * @param {string} type Either "local" or "session", depending on
		 * whether you want localStorage or sessionStorage.
		 * @return {object} An object-friendly interface to localStorage or
		 * sessionStorage.
		 */
		make_store : function(type) {
			return {
				get: function get(key) {
					var value = window[type + 'Storage'].getItem(key);
					return value && JSON.parse(value);
				},
				set: function store(key, val) {
					return window[type + 'Storage'].setItem(key, JSON.stringify(val));
				},
				remove: function remove(key) {
					return window[type + 'Storage'].removeItem(key);
				}
			};
		},

		try_console: function (message) {
			if (typeof console !== 'undefined') {
				console.log(message);
			}
		},
		try_ie_post: function (log_url, server_data) {
			var xdr;
			if ($.browser.msie && window.XDomainRequest) {
				try {
					// Use Microsoft XDR
					xdr = new window.XDomainRequest();
					xdr.open("POST", log_url);
					xdr.send(server_data);
					xdr.onerror = function () {
						private_functions.try_console("Unable to contact server to log client message, we even tried using XDomainRequest");
					};
				} catch (e) {
					private_functions.try_console("Error before sending XDomainRequest: " + e);
				}
			} else {
				// If we can't contact the logging service, log to console instead
				private_functions.try_console("Unable to contact server to log client message");
			}
		},
		do_remote_log: function (message, sev, server_only) {
			var object, log_url, server_data;

			try {
				message = message.substring(0, 150);
			} catch (e) {
			}

			object = {
				message: message,
				path: window.location.href
			};

			// Log the number of logs we've submitted on this page
			if (typeof window.portal_logger_tries !== 'undefined') {
				object.page_log_count = window.portal_logger_tries;
			}

			// prep the url and data
			log_url = window.PORTAL_CHROME_LOG_URL + '?sev=' + sev;
			server_data = JSON.stringify(object);

			if (typeof window.PORTAL_CHROME_LOG_URL !== 'undefined') {
				$.ajax({
					beforeSend: function (xhr) {
						xhr.withCredentials = true;
					},
					crossDomain: true,
					global: false,
					async: true,
					type: "POST",
					url: log_url,
					data: server_data,
					contentType: 'application/json',
					error: function (e) {
						private_functions.try_ie_post($, log_url, server_data);
					}
				});
			}
		}
	};

	lib = {

		/**
		 * A simple function to get the value of a given cookie
		 * @param {string} cookieName The cookie name/key
		 * @returns {string} The string value of the cookie, "" if there was no cookie
		 */
		getCookieValue: function (cookieName) {
			var start, end;
			if (document.cookie.length > 0) {
				start = document.cookie.indexOf(cookieName + "=");
				if (start !== -1 && (start === 0 || (document.cookie.charAt(start - 1) === ' '))) {
					start += cookieName.length + 1;
					end = document.cookie.indexOf(";", start);
					if (end === -1) { end = document.cookie.length; }
					return window.unescape(document.cookie.substring(start, end));
				}
			}
			return "";
		},
		getAuthorizationValue: function () {
			return (lib.getCookieValue('rh_user') !== "");
		},
		log: function (message, sev, server_only) {
			var server_data, log_url;

			if (server_only !== true) {
				private_functions.try_console(message);
			}

			if (typeof sev !== 'undefined') {

				if (window.navigator.userAgent.indexOf('Baiduspider') !== -1) {
					// prevent spider from logging to the server
					return;
				}

				// try and end the logging if there were to many per page
				if (typeof window.portal_logger_tries === 'undefined') {
					window.portal_logger_tries = 1;
				} else {
					if (window.portal_logger_tries > 50) {
						private_functions.try_console('Reached server side logging limit for this page. Refusing to try again!');
						return;
					} else {
						window.portal_logger_tries = window.portal_logger_tries + 1;
					}
				}

				try {
					private_functions.do_remote_log(message, sev, server_only);
				} catch (e) {
					private_functions.try_console('Error when trying to log server side: ' + e);
				}
			}
		},
		objectEach: function (object, func) {
			var prop;
			for (prop in object) {
				if (object.hasOwnProperty(prop)) {
					func(prop, object[prop]);
				}
			}
		},
		arrayEach: function (array, func) {
			var i, len;
			for (i = 0, len = array.length; i < len; i = i + 1) {
				func(array[i], i);
			}
		},
		whenBreadcrumbsReady: function (callback) {
			if ($('#breadcrumbs').length === 1) {
				callback($);
			} else {
				$(document).bind('portal_breadcrumbs_ready', function () {
					callback($);
				});
			}
		},
		whenUserStatusReady: function (callback) {
			var data;
			chrometwo_require(['user_info'], function () {
				if (typeof window.portal === 'undefined' || typeof window.portal.user_info === 'undefined') { // wait for the event
					$(document).bind('user_info_ready', function (e, data) {
						callback(data);
					});
				} else { // in case the user user_info fires the event before base.js loads
					callback(window.portal.user_info);
				}
			});
		},
		getEventTarget: function (e) {
			var trg = e.target || e.srcElement || {};
			if (trg.nodeType == 3) { // defeat Safari bug
				trg = trg.parentNode;
			}
			return trg;
		},
		regenerateBreadcrumbs: function (crumbs) {
			window.breadcrumbs = crumbs;
			$('#breadcrumbs').remove();
			window.createBreadCrumb();
			window.placeBreadcrumbs();
		},
		getTextNodes: function (node, includeWhitespaceNodes) {
			/* thanks http://stackoverflow.com/questions/298750/how-do-i-select-text-nodes-with-jquery#4399718 */
			var textNodes = [], whitespace = /^\s*$/;

			function getTextNodes(node) {
				var i, len;
				if (node.nodeType === 3) {
					if (includeWhitespaceNodes || !whitespace.test(node.nodeValue)) {
						textNodes.push(node.data);
					}
				} else {
					for (i = 0, len = node.childNodes.length; i < len; i += 1) {
						getTextNodes(node.childNodes[i]);
					}
				}
			}

			if (typeof node !== "undefined") {
				getTextNodes(node);
			}
			return textNodes;
		},
		store: {
			local   : private_functions.make_store('local'),
			session : private_functions.make_store('session')
		},
		/**
		 * Get hash (aka anchor) string parameters as though they were querystring params.
		 */
		getHashParam: function (name) {
			// create a jsuri object from the current url
			var url = jsUri(location.href); 
			// jsuri has no hashstring parsing functions, but if we set the
			// hashstring to the querystring, we can use the querystring
			// parsing functions :]
			return url.setQuery(url.anchor()).getQueryParamValue(name);
		}

	};

	return lib;
});
