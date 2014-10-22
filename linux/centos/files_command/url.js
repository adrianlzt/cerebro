/*global require, define, jsUri*/
/*jslint browser: true*/

/**
 * The URL module.  Contains URLPattern and URLParser classes, which are part
 * of the PAF feature that initializes some analytics data based on the URL
 * being visited.
 *
 * @module analytics/url
 * @see https://paftest-portalplatform.itos.redhat.com/admin/arbvars/urlpattern/
 * @author Michael Clayton <mclayton@redhat.com>
 * @copyright Red Hat 2013-2013
 */
define(['chrome_lib', 'analytics/separators'], function (lib, separators) {
	"use strict";

	/**
	 * A URL pattern.
	 *
	 * @constructor
	 * @memberof module:analytics/url
	 * @private
	 * @param {object} args A parameter object.
	 * @param {regex} args.regex A regex pattern to match against URLs.
	 * @param {string} [args.args.platform] The name of the platform.
	 * @param {string} [args.args.persona] The Resource Persona.
	 * @param {string} [args.args.collection] The Collection.
	 * @param {string} [args.args.resource_type] The Resource Type.
	 * @param {function} [args.args.get_resource_title] A function that builds the Resource ID String.
	 * @param {function} [args.args.get_page_name] A function that builds the pageName string.
	 * @see https://paftest-portalplatform.itos.redhat.com/admin/arbvars/urlpattern/
	 *
	 *
	 * @example
	 * var pattern = new URLPattern({
	 *     regex              : /\/foo\/bar\/(\d+)/,
	 *     platform           : "MyPlatform",
	 *     persona            : "MyUseType",
	 *     collection         : "MyCollection",
	 *     resource_type      : "MyResourceType",
	 *     get_resource_title : function () {
	 *         // calculate resource title
	 *         return [this.platform, this.collection].join("-");
	 *     },
	 *     get_page_name      : function () {
	 *         // calculate page name
	 *         return [this.platform, this.collection].join("|");
	 *     }
	 * });
	 * var result = pattern.match("http://domain.com/foo/bar/1234");
	 * // See {@link module:analytics/sites/portal/urls} for many more examples
	 */

	function URLPattern(args) {

		// Make 'new' keyword optional
		if (!(this instanceof URLPattern)) {
			return new URLPattern(args);
		}

		this.regex           = args.regex;
		this.Platform        = args.platform;
		this.UseType         = args.persona;
		this.Collection      = args.collection;
		this.ResourceType    = args.resource_type;
		this.get_product     = args.get_product || function () {};
		this.get_resource_id = args.get_resource_id || function () {};
		this.get_page_name   = args.get_page_name || function () {};

		this.ResourceID = "";
		this.pageName   = "";
		this.params     = [];

		/**
		 * See if a given URL string matches this URLPattern.
		 *
		 * @param {string} url A URL string.  Only the path portion of the URL
		 * is used.  The protocol, hostname, and port are ignored.
		 * @returns {URLPattern} this
		 */
		this.match = function (url) {
			this.params     = this.regex.exec(url) || [];
			if (this.params.length > 0) {
				this.ResourceID = this.get_resource_id.apply(this);
				this.pageName   = this.get_page_name.apply(this);

				// execute the other properties if they are function
				this.Platform        = getvalue(this.Platform);
				this.UseType         = getvalue(this.UseType);
				this.Collection      = getvalue(this.Collection);
				this.ResourceType    = getvalue(this.ResourceType);

				if (this.hasOwnProperty("get_product")) {
					this.Product = this.get_product.apply(this);
				}
			}
			return this;
		};

	}

	/**
	 * Execute the argument if it's a function, otherwise return it.
	 */
	function getvalue(str_or_func) {
		var retval;
		if (typeof str_or_func === 'function') {
			retval = str_or_func();
		} else {
			retval = str_or_func;
		}
		return retval;
	}

	/**
	 * A URL parser. This returns special attributes based on the current URL.
	 * @alias URLParser
	 * @memberof module:analytics/url
	 * @constructor
	 * @param {object[]} url_definitions An array of `args` objects from URLPattern.  One URLPattern will be created for each object in this array.
	 * @example
	 * var url_defs = {
	 *     {
	 *         regex           : /^\/search\/results\/([^\/]+)$/,
	 *         platform        : "PortalSearch",
	 *         persona         : "consumer",
	 *         collection      : "search-results",
	 *         resource_type   : "result-list",
	 *         get_resource_id : undefined,
	 *         get_page_name   : function () {
	 *             return [this.Platform, this.ResourceType];
	 *         }
	 *     },
	 *     {
	 *         regex           : /^\/search\/browse\/solutions([^\/]+)$/,
	 *         platform        : "PortalSearch",
	 *         persona         : "consumer",
	 *         collection      : "search-results",
	 *         resource_type   : "result-list",
	 *         get_resource_id : undefined,
	 *         get_page_name   : function () {
	 *             return [this.Platform, this.ResourceType, "Solutions"];
	 *         }
	 *     }
	 * };
	 * var parser = new URLParser(url_defs);
	 */
	function URLParser(url_definitions) {

		// Make 'new' keyword optional
		if (!(this instanceof URLParser)) {
			return new URLParser();
		}

		this.URLs = [];

		/**
		 * Add new URLPatterns to this parser.
		 *
		 * @param {URLPattern|URLPattern[]} url_patterns Pass in either a
		 * single URLPattern or an array of URLPatterns to add them to this
		 * parser.
		 */
		this.add = function (url_patterns) {
			var i;

			// If url_patterns is a URLPattern object, add it.
			// If it's an Array, add each item from the array
			// If it's an object, assume the object it can be used as a
			// parameter for initializing a new URLPattern object.

			if (url_patterns instanceof URLPattern) {
				this.URLs.push(url_patterns);
			} else if (url_patterns instanceof Array) {
				for (i = 0; i < url_patterns.length; i += 1) {
					this.add(url_patterns[i]);
				}
			} else if (url_patterns instanceof Object) {
				this.add(new URLPattern(url_patterns));
			}
		};

		/**
		 * Parse a portal URL to determine which part of the site we're on, and
		 * therefore which attributes to set.
		 *
		 * @param {string|Location} url A URL to parse.  Either a string or the
		 * `window.location` object may be passed in.
		 * @example parse(window.location)
		 * @example parse("https://access.redhat.com/site/solutions/396023")
		 * @returns {regex_match[]} An array of regex matches
		 */
		this.parse = function (url) {
			var url_i,
				url_def,
				matches = [],
				match = [],
				url_string,
				anchor_str,
				js_uri;

			js_uri = jsUri(url);
			url_string = js_uri.path() + js_uri.query();
			if ((anchor_str = js_uri.anchor()) !== "") {
				url_string += '#' + anchor_str;
			}

			for (url_i = 0; url_i < this.URLs.length; url_i += 1) {
				url_def = this.URLs[url_i];
				match = url_def.match(url_string);
				if (match.params.length > 0) {
					matches.push(url_def);
					break;
				}
			}

			return matches;
		};

		/**
		 * Runs a series of tests on URL patterns for a given site.
		 *
		 * The site module (ie. `analytics/sites/FOO`) must have a
		 * `analytics/sites/FOO/url_examples` module, and that module must
		 * implement a `run_tests` function.
		 *
		 * @param {string} site The name of the site module, ie 'FOO' from the
		 * description above.
		 * @example
		 * // **NOTE**: only use `portal.analytics` for manual testing in the
		 * // JS console.  Do not use it in production code.
		 * portal.analytics.parser.test('portal')
		 */

		this.test = function test(site) {
			require(['analytics/sites/' + site + '/url_examples'], function (suite) {
				suite.run_tests(site);
			});
		};

		/**
		 * Tests a given URL against the URL parser and outputs any values.
		 *
		 * It's like a simulation of actually visiting the URL in your browser.
		 * This function will tell you what analytics values *would* be set if
		 * you visited the URL.  This is especially handy for occasions where
		 * URL patterns must be implemented before those pages have actually
		 * been created.
		 *
		 * Running it without arguments will print out help text.
		 *
		 * @param {string} [url] The URL to test
		 * @example
		 * // **NOTE**: only use `portal.analytics` for manual testing in the
		 * // JS console.  Do not use it in production code.
		 * portal.analytics.parser.test_url('/home')
		 */
		this.test_url = function test_url(url) {
			if(!url) {
				lib.log("Hi!  This function can be used to test analytics for URLs that may not be live yet.  Just type portal.analytics.parser.test_url(URL) to see the results.  Please note that many page's pageNames use the *current* title tag, so there may be a value in the pageName that reflects the page you're currently on.");
				return;
			}
			var parsed = this.parse(url)[0];
			if (parsed.pageName.length > 1) {
				if (test_url.first_run) {
					lib.log("Please note that many page's pageNames use the *current* title tag, so there may be a value in the pageName below that reflects the page you're currently on rather than the title of the URL you just requested.");
				}
				lib.log("URL pattern matched.\n");
				lib.log("  Platform:        " + parsed.Platform);
				lib.log("  Collection:      " + parsed.Collection);
				lib.log("  ResourcePersona: " + parsed.UseType);
				lib.log("  ResourceType:    " + parsed.ResourceType);
				lib.log("  pageName:        cp | " + parsed.pageName.join(separators.pipe));
			} else {
				lib.log("No URL pattern matches " + url);
			}
			test_url.first_run = false;
		};
		this.test_url.first_run = true;

		// Add the url_definitions passed in
		this.add(url_definitions);

	}

	return {
		URLParser: URLParser
	};

});
