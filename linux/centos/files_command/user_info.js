/*global document, window, define, portal, escape*/

define('user_info', ['jquery', 'chrome_lib', 'load_html'], function (jq, lib) {
	"use strict";

	var funcs,
		USER_INFO_COOKIE = "chrome_user_info",
		USER_REMEBER_COOKIE = "chrome_user_remember";

	funcs  = {
		/**
		 * Writes out a cookie that will contain serialized JSON data
		 * @param {string} data The JSON data as a string
		 */
		storeResponse: function (cookieKey, data, expires) {
			document.cookie = cookieKey + "=" + escape(JSON.stringify(data)) + ";domain=.redhat.com;path=/;" + expires;
		},

		/**
		 * Sets the user service data on portal.user_info and triggers the user_info_ready event
		 * @param {string} data The JSON data as a string
		 */
		pushToRequestScope: function (data) {
			var cookieVal;
			if (typeof data === 'undefined') {
				cookieVal = lib.getCookieValue(USER_INFO_COOKIE);
				if (cookieVal !== "") {
					data = JSON.parse(cookieVal);
				}
			}
			portal.user_info = data;
			funcs.doRemember();
			jq.event.trigger('user_info_ready', data);
		},

		/**
		 * Gets JSON data from /services/user/status, caches the data in a cookie, and makes the data avalible on the portal global object
		 */
		populateCache: function () {
			var serviceUrl;
			serviceUrl = portal.host + "/services/user/status?jsoncallback=?";
			jq.getJSON(serviceUrl, function (data) {
				funcs.pushToRequestScope(data); // skip the cookie read here, we have the obj already
				funcs.storeResponse(USER_INFO_COOKIE, data);
			});
		},

		/**
		 * Gets the user service data from cache (cookie)
		 * @returns {object} The parsed JSON object or null if no cache exists
		 */
		getDataFromCache: function () {
			var cookieVal = lib.getCookieValue(USER_INFO_COOKIE);
			if (cookieVal === "") {
				return null;
			} else {
				return JSON.parse(cookieVal);
			}
		},

		/**
		 * Checks to see wether the passed in data object (from cache) can still be used.
		 * This should return false if data is null, or the uid, lang has changed since the cache was made
		 * @param {object} data the user service object
		 * @returns {boolean} True if the cache should not be used, false otherwise
		 */
		cacheInvalid: function (data) {
			var uid, lang, auth;
			if (data === null) {
				return true;
			} else {
				uid = funcs.getUserIdFromCookie();
				lang = funcs.getLangFromCookie();
				auth = funcs.getAuthStateFromCookie();
				return (uid !== data.login) || (lang !== data.lang) || (auth !== data.authorized);
			}
		},

		/**
		 * Gets the lang from the portal lang cookie
		 * @returns {string} The current language string
		 */
		getLangFromCookie: function () {
			var tmp_lang = "";

			tmp_lang = lib.getCookieValue('chrome_locale');
			if (tmp_lang !== "") {
				return tmp_lang;
			}

			tmp_lang = lib.getCookieValue('rh_locale');
			if (tmp_lang !== "") {
				return tmp_lang;
			}

			return "en";
		},


		/**
		 * Checks whether the rh_user cookie is present.
		 * Not the value does not matter at all here
		 *
		 * @returns {boolean} whether the rh_user cookie is present and not ""
		 */
		getAuthStateFromCookie: function () {
			return lib.getCookieValue('rh_user') !== '';
		},

		/**
		 * Gets the user id from the rh_user cookie
		 * @returns {string} The current username string or "" if rh_user does not exist
		 */
		getUserIdFromCookie: function () {
			var val;
			val = lib.getCookieValue('rh_user');
			if (val !== "") {
				val = val.split('|');
				if (val[0] !== "") {
					return val[0];
				}
			}
			return "";
		},

		/**
		 * Creates a chrome session id cookie if one does not exst
		 */
		doChromeSessionId: function () {
			var val, id;
			val = lib.getCookieValue('chrome_session_id');
			if (val === "") {
				id = Math.floor(Math.random() * 1000000).toString();
				id += "|" + new Date().getTime().toString();
				// id += "|" + lib.getCookieValue('rh_user');
				document.cookie = "chrome_session_id=" + id + ";path=/";
			}
		},

		doRemember: function () {
			var rh_user_val, remember_val, stored_data, new_data;
			rh_user_val = lib.getCookieValue('rh_user');
			if ((rh_user_val === "") && (window.location.href.indexOf('redhat.com/logout') !== -1)) {
				// here the user is logged out, and the user is on the logout page
				// this ensures the remembered=false is not set when the user only closes a browser
				remember_val = lib.getCookieValue(USER_REMEBER_COOKIE);
				if (remember_val !== "") {
					stored_data = JSON.parse(remember_val);
					new_data = stored_data;
					new_data.remembered = false;
				}
			} else if (portal.user_info.login !== "") {
				// create the cookie
				new_data = {
					login: portal.user_info.login,
					remembered: true
				};
			}

			if (new_data !== undefined) {
				funcs.storeResponse(USER_REMEBER_COOKIE, new_data, 'expires=Fri, 31 Dec 9999 23:59:59 GMT;');
			}
		},

		/**
		 * The init function
		 */
		init: function () {
			funcs.doChromeSessionId();
			var data = funcs.getDataFromCache();
			if (funcs.cacheInvalid(data)) {
				funcs.populateCache();
			} else {
				funcs.pushToRequestScope();
			}
		}
	};

	// kick off the script
	funcs.init();

	return {
		handle_logout: function () {
			funcs.doChromeSessionId();
		}
	};

});
