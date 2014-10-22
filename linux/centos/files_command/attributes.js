/*global define, getCookie, siteMapState, portal, s*/
/*jslint browser: true*/

/**
 * Analytics attributes (ie. data points), for the {@link
 * http://access.redhat.com Red Hat Customer Portal}.
 * This module contains the AnalyticsAttribute base class, definitions for
 * every attribute the Portal needs, as well as several functions for
 * interacting with attributes (setters, getters, output, etc).
 *
 * @module analytics/attributes
 * @see https://mojo.redhat.com/docs/DOC-175737
 * @author Michael Clayton <mclayton@redhat.com>
 * @copyright Red Hat 2013-2014
 */
define(['jquery', 'underscore', 's_code', 'jsUri', 'require', 'user_info', 'chrome_lib', 'analytics/separators', 'analytics/adapters/omniture/old_fns'], function ($, _, s_code, jsUri, require, user_info, lib, separators) {
	"use strict";

	var attributes = {},
		attribute_definitions = [];

	/**
	 * A constructor for building Analytics Attributes, as defined in
	 *
	 *
	 * You can think of an 'attribute' as a data point.
	 *
	 * All the attributes for the Portal are specified in {@link
	 * https://mojo.redhat.com/docs/DOC-175737 The Doc} and are encoded in
	 * {@link module:analytics/attributes.attribute_definitions
	 * attribute_definitions}.
	 *
	 * @memberof module:analytics/attributes
	 * @constructor
	 * @param {object} args An object containing arguments
	 * @param {string} args.name A human-readable name for the attribute
	 * (letters only, no spaces, camel case).
	 * @param {function} args.getter A function that returns the value for the
	 * attribute, either from `this.value` or by extracting the attribute value
	 * from the DOM.
	 * @param {function} args.setter A function to set the value of the
	 * attribute.
	 */
	function AnalyticsAttribute(args) {

		// Make 'new' keyword optional
		if (!(this instanceof AnalyticsAttribute)) {
			return new AnalyticsAttribute(args);
		}

		this.name = args.name;

		/**
		 * Getter
		 */
		this.get = args.getter || AnalyticsAttribute.prototype.default_getter;

		/**
		 * Setter
		 */
		this.set = args.setter || AnalyticsAttribute.prototype.default_setter;

		this.value = args.value;

	}

	// Assign the default getters and setters.  You can later test whether a
	// particular AnalyticsAttribute has a custom getter/setter by checking...
	//
	//     my_attr.get !== AnalyticsAttribute.prototype.default_getter
	//     my_attr.set !== AnalyticsAttribute.prototype.default_setter
	AnalyticsAttribute.prototype.default_getter = function () { return this.value; };
	AnalyticsAttribute.prototype.default_setter = function (v) { this.value = v; };


	/**
	 * This is THE list of attributes definitions.  Every analytics attribute
	 * that the Portal uses is defined in this array.
	 *
	 * @memberof module:analytics/attributes
	 * @type {Object[]}
	 * @example
	 * // An attribute with the default getter and setter:
	 *
	 * {
	 *     name   : "AttributeName"
	 * },
	 *
	 * // An attribute with a custom getter which pulls its value from the DOM:
	 *
	 * {
	 *     name   : "AttributeName",
	 *     getter : function () {
	 *         return document.getElementById("my-element").innerHTML;
	 *     }
	 * },
	 *
	 * // The getter and setter parameters are optional and can be included if
	 * // you need any special side effects for getting/setting your attribute.
	 * // See the InfrastructureStr attribute for an example of a special
	 * // setter that appends new values instead of overwriting the existing
	 * // value.
	 *
	 * @todo Refactor this into a Portal-specific file.  This module should
	 * contain the "classes" and data structures, and the new file will contain
	 * the attribute definitions.
	 */
	attribute_definitions = [

		/*********************************************************************
		 *                               User                                *
		 *********************************************************************/
		{
			name   : "UserSessionID",
			getter : function () {
				var chrome_session_id = getCookie("chrome_session_id");
				if (chrome_session_id) {
					chrome_session_id = chrome_session_id.replace(/\|/, separators.pipe) || "";
				}
				return chrome_session_id || undefined;
			}
		},
		{
			name   : "UserLogin",
			getter : function () {
				var rh_user = getCookie("rh_user") || "";
				// Split the cookie value on pipes and remove the first
				// character IF it's a quotation mark.  The SSO service adds a
				// quotation mark if the user's login name is an email address,
				// for some reason.
				return rh_user.split("|")[0].replace(/^"/, '');
			}

		},
		{
			name   : "UserNumber",
			getter : function () {
				var retval;
				if (typeof portal === "object" && typeof portal.user_info === "object") {
					retval = portal.user_info.user_id;
				} else {
					retval = "undefined";
				}
				return retval;
			}
		},
		{
			name   : "CustomerNumber",
			getter : function () {
				var retval;
				if (typeof portal === "object" && typeof portal.user_info === "object") {
					retval = portal.user_info.account_number;
				} else {
					retval = "undefined";
				}
				return retval;
			}
		},
		{
			name   : "OmniturePersona",
			getter : function () {
				if (typeof window.getLoginStatus !== 'undefined') {
					return window.getLoginStatus();
				}
			}
		},
		{
			name   : "isAuthenticated",
			getter : function () {
				var rh_user = getCookie("rh_user") || "";
				return "logged in" === rh_user.split("|")[2];
			}
		},
		{
			name   : "isEntitled",
			getter : function () {
				var rh_user = getCookie("rh_user") || "";
				return "customer" === rh_user.split("|")[2];
			}
		},
		{
			name : "isSupportEntitled"
		},
		{
			name : "OmnitureVisitor"
		},
		{
			name : "VisitNumber"
		},
		{
			name   : "ScreenResolution",
			getter : function () {
				var w = screen.width,
					h = screen.height;
				return [w, h].join("x");
			}
		},
		{
			name   : "ScreenColorDepth",
			getter : function () {
				return screen.colorDepth;
			}
		},
		{
			name   : "BrowserResolution",
			getter : function () {
				var w = document.documentElement.clientWidth,
					h = document.documentElement.clientHeight;
				return [w, h].join("x");
			}
		},
		{
			name   : "isInternal",
			getter : function () {
				if (typeof portal === "object" && typeof portal.user_info === "object") {
					return portal.user_info.internal;
				}
			}
		},

		/*********************************************************************
		 *                             Resource                              *
		 *********************************************************************/
		{
			name : "ResourceID"
		},
		{
			name   : "PageName",
			getter : function () {
				// TODO should set pageName here, using data from the
				// analytics/url module, but right now there isn't a way to
				// get a reference to the URLParser, so it's set in
				// analytics/main.init
			}
		},
		{
			name   : "ResourceTitle",
			getter : function () {
				return document.title.replace(' - Red Hat Customer Portal', '');
			}
		},
		{
			name : "ResourceType"
		},
		{
			name : "Platform"
		},
		{
			name : "UseType"
		},
		{
			name : "Collection"
		},
		{
			name   : "URL",
			getter : function () {
				return remove_trailing_slash(location.href);
			}
		},
		{
			name   : "TrueURL",
			getter : function () {
				// Use the jsUri lib to rebuild the URL, omitting query string
				// and hash.
				var url = jsUri(location.href),
					retval;

				retval = url.protocol() +
					"://" +
					url.host() +
					(url.port() === "" ? "" : ":" + url.port()) +
					url.path();

				retval = remove_trailing_slash(retval);

				return retval;
			}
		},
		{
			name   : "Channel",
			getter : function () {
				var retval;
				if (typeof siteMapState !== "undefined" && siteMapState.length > 0) {
					retval = siteMapState.split("/")[0].toLowerCase();
				} else {
					retval = "undefined";
				}
				return retval;
			}
		},
		{
			name : "Language"
		},
		{
			name : "ContentSubType"
		},
		{
			name : "Products",
			setter : function (v) {
				// Whenever Products is set, the prodView event must also be
				// set.
				//
				// Here are the conditions for it being set in plain English (I
				// hope!):
				//
				// If a new value is being set (v not undefined) and the
				// prodView event doesn't already exist add it.  Unless other
				// events are already set, in which case, append prodView
				// instead.
				if (typeof v !== "undefined") {
					if (typeof window.s.events === 'undefined' || window.s.events === "") {
						window.s.events = 'prodView';
					} else {
						if (typeof window.s.events.indexOf !== 'undefined') {
							if (window.s.events.indexOf('prodView') === -1) {
								window.s.events = [window.s.events, 'prodView'].join(',');
							}
						}
					}
				}
				this.value = v;
			}
		},
		{
			name : "Component"
		},
		{
			name : "Category"
		},
		{
			name : "Tags"
		},
		{
			name : "GroupID"
		},

		/*********************************************************************
		 *                        Custom - Knowledge                         *
		 *********************************************************************/
		{
			name : "KCSState"
		},
		{
			name : "SBR"
		},
		{
			name : "PublicationState"
		},
		{
			name : "Rating"
		},

		/*********************************************************************
		 *                          Custom - Search                          *
		 *********************************************************************/

		{
			name : "UserSearchEvent"
		},
		{
			name : "FacetedSearchValues"
		},
		{
			name : "OnSiteSearch"
		},
		{
			name : "OnSiteSearchValue"
		},
		{
			name : "PageRank"
		},
		{
			name : "TargetURL"
		},

		/*********************************************************************
		 *                            Error Page                             *
		 *********************************************************************/

		{
			name : "ErrorPageName"
		},
		{
			name : "ErrorPageType"
		},
		{
			name : "ErrorReferringChannel"
		},
		{
			name : "ErrorChannel"
		},
		{
			name : "ErrorType"
		},


		/*********************************************************************
		 *                     Custom - Resource                             *
		 *********************************************************************/

		{
			name : "VideoTitle"
		},
		{
			name : "VideoSegmentTitle"
		},
		{
			name : "VideoResolution"
		},
		{
			name : "CertifiedVendorProduct"
		},

		// Custom - Downloads
		{
			name : "Architecture"
		},
		{
			name : "SeverityLevel"
		},

		/*********************************************************************
		 *                               Other                               *
		 *********************************************************************/
		{
			name : "ToolName"
		},
		{
			name   : "CampaignExternal",
			getter : function () {
				return jsUri(location.href).getQueryParamValue("sc_cid");
			}
		},
		{
			name   : "CampaignInternal",
			getter : function () {
				return jsUri(location.href).getQueryParamValue("intcmp");
			}
		},
		{
			name   : "CodeVersion",
			getter : function () {
				// Retrieve the version number from omniture's s object and
				// from the main analytics module
				return [s.version, require('analytics/main').get_version()];
			}
		},
		{
			name   : "InfrastructureStr",
			// This attribute stores its data in an array, setter appends new
			// values, and getter joins|them|with|pipes
			getter : function () {
				// If the value is undefined, return undefined, otherwise the
				// value should be an array, which we can join|with|pipes and
				// return;
				var retval;
				if (typeof this.value === "undefined") {
					retval = this.value;
				} else {
					retval = this.value.join(separators.pipe);
				}
				return retval;
			},
			setter : function (v) {
				// If v is undefined, do nothing.
				// If v is defined but this.value is undefined, then this is
				// the first time set() has been called, so initialize an array
				// with v as an element.  If this.value is defined, then just
				// push v onto the array.
				if (typeof v !== "undefined") {
					if (typeof this.value === "undefined") {
						this.value = [v];
					} else {
						this.value.push(v);
					}
				}
			}
		},
		{
			name   : "ABTestCampaign"
		},
		{
			name   : "Hierarchy",
			getter : function () {
				var retval,
					breadcrumb,
					i,
					breadcrumb_strings = [];

				// Use the `breadcrumbs` variable if it's available, otherwise
				// just grab all the text nodes from the #breadcrumbs element.
				// Integrated apps should be using the breadcrumbs variable to
				// create their breadcrumbs, but some older ones are still
				// creating their own breadcrumbs element.
				if (typeof window.breadcrumbs !== "undefined" && window.breadcrumbs instanceof window.Array) {
					for (i = 0; i < window.breadcrumbs.length; i += 1) {
						breadcrumb = window.breadcrumbs[i][0];
						breadcrumb_strings.push(breadcrumb);
					}
					retval = breadcrumb_strings;
				} else if (document.getElementById('breadcrumbs')) {
					breadcrumb_strings = lib.getTextNodes(document.getElementById('breadcrumbs'));
					for (i = 0; i < breadcrumb_strings.length; i += 1) {
						// Remove all extraneous whitespace
						breadcrumb_strings[i] = breadcrumb_strings[i]
							.trim() // leading/trailing whitespace
							.replace(/\n/g, ' ') // change newlines to spaces
							.replace(/\t/g, ' ') // change tabs to spaces
							.replace(/\s+/g, ' '); // replace consecutive whitespace chars with one space
					}
					retval = breadcrumb_strings;
				}
				// remove commas
				if (typeof retval !== "undefined" && retval.indexOf(',') >= 0) {
					for (i = 0; i < retval.length; i += 1) {
						retval[i] = retval[i].replace(',', '');
					}
				}
				return retval;
			}
		},
		{
			name : "KnowledgeMeta",
			getter : function () {
				// this attribute has no value of its own
				var separator = ";";
				var retval;
				var all_undefined;

				function prep_value(val) {
					if (_.isArray(val)) {
						return val.join(separator);
					} else if (_.isUndefined(val)) {
						return "undefined";
					} else {
						return val;
					}
				}

				// The names of each attribute to consolidate
				retval = [
					"Component",
					"Category",
					"KCSState",
					"SBR",
					"PublicationState"
				];

				retval = _.map(retval, get);        // Get the actual values of the attributes
				retval = _.map(retval, prep_value); // Prep their values

				// Find out if EVERY item in retval is undefined
				all_undefined = _.every(retval, _.isUndefined);

				// Return the retval array only if it has non-undefined values
				return all_undefined ? undefined : retval;
			}
		}
	];

	/**
	 * Get all the analytics attribute definitions.  Gets the 'name' property
	 * by default.
	 *
	 * @memberof module:analytics/attributes
	 * @param {string} [property="name"] The AnalyticsAttribute property to print.
	 * @returns {string[]} a list of attribute names (if no property is passed in).
	 * @example
	 * chrometwo_require(['analytics/attributes'], function (attributes) {
	 *     var attribute_names = attributes.list();
	 *     console.log(attribute_names);
	 * });
	 *
	 * ["UserSessionID", "UserLogin", "UserNumber", "CustomerNumber",
	 * "OmniturePersona", "isAuthenticated", "isEntitled", "isSupportEntitled",
	 * "OmnitureVisitor", "VisitNumber", "ScreenResolution",
	 * "ScreenColorDepth", "BrowserResolution", "isInternal", "ResourceID",
	 * "PageName", "ResourceTitle", "ResourceType", "Platform", "UseType",
	 * "Collection", "URL", "TrueURL", "Channel", "Language", "ContentSubType",
	 * "Products", "Component", "Category", "Tags", "GroupID", "KCSState",
	 * "SBR", "PublicationState", "Rating", "UserSearchEvent",
	 * "FacetedSearchValues", "OnSiteSearch", "OnSiteSearchValue", "PageRank",
	 * "TargetURL", "ErrorPageName", "ErrorPageType", "ErrorReferringChannel",
	 * "ErrorChannel", "ErrorType", "VideoTitle", "VideoSegmentTitle",
	 * "VideoResolution", "Architecture", "SeverityLevel", "ToolName",
	 * "CampaignExternal", "CampaignInternal", "CodeVersion",
	 * "InfrastructureStr", "ABTestCampaign", "Hierarchy"]
	 */
	function list(property) {

		var i,
			len,
			results,
			prop = property || 'name';

		results = [];

		for (i = 0, len = attribute_definitions.length; i < len; i += 1) {
			results.push(attribute_definitions[i][prop]);
		}

		return results;
	}

	/**
	 * Remove the trailing slash (/) from a string, if the last character is a slash.
	 *
	 * @param {string} str The string from which to remove a trailing slash.
	 * @memberof module:analytics/attributes
	 * @private
	 */

	function remove_trailing_slash(str) {
		return (str[str.length-1] === '/') ? str.substring(0, str.length-1) : str;
	}


	/**
	 * Get the value of the requested attribute.
	 *
	 * @memberof! module:analytics/attributes
	 * @param {string} attr The attribute name you request must be defined in
	 * {@link module:analytics/attributes.attribute_definitions
	 * attribute_definitions}.
	 * @example
	 * chrometwo_require(['analytics/main'], function (analytics) {
	 *     var res = analytics.get('ScreenResolution');
	 *     console.log(res);
	 * });
	 *
	 * "1920x1080"
	 */
	function get(attr) {

		var attribute = attributes[attr];

		if (typeof attribute !== "undefined") {
			return attribute.get();
		}
	}

	/**
	 * Set an attribute's value.
	 *
	 * @memberof module:analytics/attributes
	 * @param {string} attr The name of the attribute to set.  Attribute names
	 * can be listed with {@link module:analytics/attributes.list
	 * analytics/attributes.list}.
	 * @param {string|array|number} value The value to assign to the attribute.
	 */
	function set(attr, value) {

		var attribute = attributes[attr];

		// If the attr doesn't exist, add it
		if (typeof attribute === "undefined") {
			attribute = new AnalyticsAttribute({
				name  : attr,
				value : value
			});
			attributes[attr] = attribute;
		// Otherwise, set it
		} else {
			attribute.set(value);
		}
	}

	/**
	 * This prints out all the attributes we've captured in an easy
	 * human-readable format.  By default it only prints out attributes which
	 * have had values set.
	 *
	 * @memberof module:analytics/attributes
	 * @param {boolean} [print_empty=false] true causes PAF to print out all
	 * attributes, even once that haven't had values assigned.
	 */
	function print(print_empty) {
		var s = "",
			m,
			spaces = "",
			val;

		s += "NOTE: The text formatting of these values may be different than what is sent to analytics engines (like omniture).  It is the resposibility of each analytics engine adapter to format these values properly.\n";
		for (m in attributes) {
			if (attributes.hasOwnProperty(m)) {
				val = attributes[m].value;
				if (print_empty || val) {
					spaces = new window.Array(32 - m.length).join(".");
					s += "\n";
					s += "ATTR : " + attributes[m].name;
					s += spaces;
					s += "DATA : " + val;
				}
			}
		}

		lib.log(s);
	}

	/**
	 * Harvest/scrape all attribute values from the DOM.
	 *
	 * @memberof module:analytics/attributes
	 */

	function harvest() {
		// Wait for jQuery document ready and the user status service to return
		$(function () {
			lib.whenUserStatusReady(function () {
				var attr_key, attr;
				for (attr_key in attributes) {
					if (attributes.hasOwnProperty(attr_key)) {
						attr = attributes[attr_key];
						// only set value if integrated app hasn't set it already
						if (typeof attr.value === "undefined") {
							attr.set(attr.get());
						}
					}
				}
			});
		});
	}

	/**
	 * Initialize the attributes.  Instantiates each item from
	 * attribute_definitions as an AnalyticsAttribute object and adds it to an
	 * array of attributes.
	 *
	 * @memberof module:analytics/attributes
	 * @private
	 */

	function init() {
		var i, m;

		// Create a new AnalyticsAttribute object for each attribute, and add
		// them to the `attributes` object, using their name as the key.
		for (i = attribute_definitions.length - 1; i >= 0; i -= 1) {
			m = new AnalyticsAttribute(attribute_definitions[i]);
			attributes[m.name] = m;
		}
	}

	init();

	return {
		all     : attributes,
		get     : get,
		harvest : harvest,
		list    : list,
		print   : print,
		set     : set
	};

});
