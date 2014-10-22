/*global portal, define, require*/
/*jslint browser: true*/

/**
 * This is the main PAF module.  In most cases, this is the only module users
 * of PAF will import.  It provides an API for setting attribute values and for
 * firing analytics 'events'.
 *
 * @module analytics/main
 * @author Michael Clayton <mclayton@redhat.com>
 * @copyright Red Hat 2013-2014
 */
define(['analytics/url', 'analytics/sites/portal/urls', 'analytics/attributes', 'chrome_lib', 'jquery', 'underscore'], function (url, portal_urls, attributes, lib, $, _) {

	"use strict";

	var ADAPTER_PATH         = "analytics/adapters/",
		adapters             = [],
		adapter_paths        = [],
		NAME                 = "Portal Analytics Framework",
		NAME_ACRONYM         = "PAF",
		VERSION              = "1.1.4",
		pending_events       = [],
		waits                = {}, // stores the names of all the things we're waiting for
		wait_args            = [], // used to store the arguments to report() if it's called during a wait
		parser;

		/**********************************************************************
		 * Versioning rules                                                   *
		 *                                                                    *
		 * 1. Each 3-week iteration in which the AF is updated, increment the *
		 *    most minorest version.                                          *
		 *                                                                    *
		 * 2. When any version number gets to 9, don't increment it to 10.    *
		 *    Instead reset it to 0 and increment the next version number.    *
		 *                                                                    *
		 * 3. If the version number is 9.9.9 and you don't know what to do,   *
		 *    pat yourself on the back for keeping PAF alive for 1,000        *
		 *    sprints, then grab a beer and figure out a new versioning       *
		 *    scheme: you've earned it!                                       *
		 *                                                                    *
		 **********************************************************************/

	/**
	 * Get an array of adapter names that were specified during initialization.
	 *
	 * @memberof module:analytics/main
	 * @returns adapters an array of adapter names (strings) that were passed into
	 * {@link module:analytics/main.init}.
	 */

	function get_adapters() {
		return adapters;
	}

	/**
	 * Find out whether PAF is waiting for anything.
	 *
	 * @private
	 * @memberof module:analytics/main
	 * @returns {boolean} whether there are any pending waits
	 */
	function waiting() {

		var is_waiting = false,
			prop;

		for (prop in waits) {
			if (waits.hasOwnProperty(prop)) {
				is_waiting = true;
				break;
			}
		}

		return is_waiting;
	}

	/**
	 * Get RequireJS-style paths to a given module in many adapters.
	 *
	 * It's used inside PAF as a convenience function, but is exposed because
	 * it may be useful to others as well.
	 *
	 * Read the examples!
	 *
	 * @param {string[]|undefined} names The names of each adapter you wish to
	 * get the path to.  If `names` is undefined, use the adapters that were
	 * passed into {@link module:analytics/main.init}, which is usually the
	 * desired behavior.
	 * @param {string} module The name of the module you wish to load from each
	 * adapter.  Common modules are 'attributes' or 'events'.
	 * @returns adapter_module_paths An array of strings, each string being the
	 * RequireJS-style path to the module you requested.
	 *
	 * @example
	 * // Get paths to the events modules for Omniture and ASR:
	 * var paths = get_adapter_paths(['omniture', 'asr'], 'events');
	 * // returns: ["analytics/adapters/omniture/events", "analytics/adapters/asr/events"]
	 *
	 * // Get paths to the attributes modules for whatever adapters are already initialized:
	 * var paths = get_adapter_paths(undefined, 'attributes');
	 * // returns: ["analytics/adapters/omniture/attributes", "analytics/adapters/asr/attributes"]
	 */

	function get_adapter_paths(names, module) {

		var i,
			adapter_names,
			adapter_module_paths,
			new_path;

		adapter_module_paths = [];

		if (typeof names === "undefined") {
			for (i = 0; i < adapter_paths.length; i += 1) {
				adapter_module_paths.push(adapter_paths[i] + '/' + module);
			}
		} else {

			adapter_names = (typeof names === "undefined") ? adapters : names;

			for (i = 0; i < adapter_names.length; i += 1) {
				new_path = ADAPTER_PATH + adapter_names[i];
				if (typeof module !== "undefined" && module.length) {
					new_path += '/' + module;
				}
				adapter_module_paths.push(new_path);
			}
		}

		return adapter_module_paths;
	}

	/**
	 * Send analytics data to the requested analytics adapters.
	 *
	 * Every attribute that has been given a value will be passed into each
	 * adapters' `attributes` module, which handles fiddly things like
	 * formatting values in ways that make the analytics backend happy.
	 *
	 * This function gets invoked *automatically* on every page in the Red Hat
	 * Customer Portal.
	 *
	 * It can be useful to invoke at other times, such as inside rich
	 * client-side apps.  For example, if your app has just displayed a bunch
	 * of new content received from an AJAX call, you could invoke `report`,
	 * because from an analytics perspective, it's *is* a new pageview.  No
	 * matter that it isn't technically a new pageview.
	 *
	 * An adapter for the analytics adapter argument must exist in the
	 * `adapters/` directory.
	 *
	 * @memberof module:analytics/main
	 * @param {string[]} [adapters] The adapters to which to send analytics
	 * data.
	 */

	function report(adapters) {
		// If someone has requested us to wait, then defer the report
		if (waiting()) {
			wait_args = adapters || wait_args; // use adapters if provided, otherwise default to wait_args
		} else {
			send_page_view.apply({}, arguments);
		}
	}

	/**
	 * This private function does the bulk of the work for sending reports.
	 * See {@link module:analytics/main.report report} for the public API
	 * function to send reports.
	 *
	 * @memberof module:analytics/main
	 * @private
	 * @param {string[]} [adapters] The adapters to which to send analytics
	 * data.
	 */
	function send_page_view(adapters) {
		$(function () {
			lib.whenUserStatusReady(function () {
				var report_deps, attr_deps, event_deps;

				report_deps = ['analytics/attributes', 'chrome_lib'];

				attr_deps   = get_adapter_paths(adapters, 'attributes');
				event_deps  = get_adapter_paths(adapters, 'events');

				report_deps = report_deps.concat(attr_deps).concat(event_deps);

				require(report_deps, function (attributes, lib) {

					if (_.any(arguments, _.isUndefined)) { return; }

					lib.whenUserStatusReady(function () {
						require(event_deps, function () {

							if (_.any(arguments, _.isUndefined)) { return; }

							var i, k, event_name;

							// Find any pending events and run them against all adapters

							for (i = 0; i < arguments.length; i += 1) {
								for (k = 0; k < pending_events.length; k += 1) {
									event_name = pending_events.splice(k, 1);
									arguments[i].call_event(event_name);
								}
							}

							require(attr_deps, function () {

								if (_.any(arguments, _.isUndefined)) { return; }

								var i;
								for (i = 0; i < arguments.length; i += 1) {
									arguments[i].send(attributes);
								}
							});
						});
					});
				});
			});
		});
	}

	/**
	 * Remove any values set by a previously-called event.
	 *
	 * This method does its best to unset any values set by an analytics event.
	 * On a page, if you are calling EventA followed by EventB, sometimes
	 * values from EventA can bleed into EventB.  This is the case for many
	 * Omniture-specific events.  In those cases, you may call `wipe('EventA')`
	 * to remove the values it set, so they no longer exist once EventB is
	 * called.
	 *
	 * In order for this to work, the adapter being called must implement a
	 * `wipe` function.  The Omniture adapter, for which this function is most
	 * typically used, does implement {@link
	 * module:analytics/adapters/omniture/events.wipe this function}.
	 *
	 * @memberof module:analytics/main
	 */

	function wipe(event_name, event, adapters) {
		var adapter_paths_tmp = get_adapter_paths(adapters, 'events');
		require(adapter_paths_tmp, function () {
			var i;
			if (_.any(arguments, _.isUndefined)) { return; }
			for (i = 0; i < arguments.length; i += 1) {
				arguments[i].wipe(event_name);
			}
		});
	}

	/**
	 * Determines if we should initiate manual navigation.
	 *
	 * Omniture, which as of 2014-01-20 is the Portal's go-to analytics
	 * backend, provides a facility for tracking link clicks.  It does this by
	 * intercepting the browser's default response to a user clicking a link
	 * (navigating to it), sending
	 *
	 * The reason that approach is necessary is that Omniture's mechanism for
	 * reporting data is based on an Image request.  Image requests in web
	 * browsers are always asynchronous,
	 *
	 * This function is significantly more sophisticated than Omniture's
	 * version, especially with regards to links that open in new windows or
	 * tabs.
	 *
	 * However, it is an *indisputably* bad idea to muck with functionality as
	 * core to the web browser as following a link.
	 *
	 * This function is only implemented in order to be compatible with
	 * Omniture and will be removed as soon as Omniture provides a synchronous
	 * reporting function, or Omniture is dropped in favor of another analytics
	 * backend.
	 *
	 * This is a rather convoluted issue, so please direct any questions to me
	 * (see @author above).
	 *
	 * @memberof module:analytics/main
	 */

	function should_nav(ev) {
		// This logic is split into many variables to (try to) make it easier
		// to understand.

		// get the html element that triggered the event
		var el = lib.getEventTarget(ev || {});

		// get the html element's target attribute
		var target = el.target;

		// is it an <a> tag?
		var is_link = typeof el !== 'undefined' && el instanceof window.HTMLAnchorElement;

		// was ctrl pressed when the user clicked?
		var ctrl_key = ev.ctrlKey;

		// did they click with the middle button?  (only works in Chrome)
		var middle_btn = ev.which === 2;

		// is this the top-most window?
		var is_top = window === window.top;

		// is this window its own parent? (haha)  should be equivalent to is_top
		var is_parent = window === window.parent;

		// is target="_self"?
		var target_self = target === '_self';

		// if target="", browser behaves the same as target="_self"
		var target_none = target === '' || typeof target === "undefined";

		// is target="_top"?
		var target_top = target === '_top';

		// is target="_parent"?
		var target_parent = target === '_parent';

		// is target="_blank"?
		var target_blank = target === '_blank';

		// is the target a named window?
		var target_other = !(target_none || target_self || target_top || target_parent);

		// should the link open in the same window in which it was clicked?
		var same_window = (target_top && is_top) || (target_parent && is_parent) || target_self || target_none || !target;

		// will the link open in a new window?  this takes precedence over same_window
		var new_window = (ctrl_key || middle_btn || target_blank || target_other);

		// Now we can finally figure out if we should manually navigate.
		// It should only happen if the user clicked on a link which would
		// open in the current window.
		var to_nav = is_link && same_window && !new_window;

		return to_nav;
	}

	/**
	 * @memberof module:analytics/main
	 */

	function on(el, events, selector, event_name, adapters, data, nav) {
		var adapter_paths_tmp = get_adapter_paths(adapters, 'events'),
			$el = $(el),
			event_str = events.slice().replace('click', 'mouseup');

		require(['s_code'], function() {
			// Turn off omniture's automatic link tracking
			window.s.trackDownloadLinks = false;
		});

		function handle_click(ev) {

			// if the nav argument is defined, use it, if it isn't defined,
			// call should_nav() to make our best guess as to whether to do
			// manual navigation or not.
			if (typeof nav === 'undefined') {
				nav = should_nav(ev);
			}

			if (nav) {
				ev.preventDefault();
			} else {
			}

			// trigger the event
			trigger(event_name, ev, adapters, data, nav);

		}

		// prefetch the adapters
		require(adapter_paths_tmp, function () {
			if (_.any(arguments, _.isUndefined)) { return; }
			$el.on(event_str, selector, handle_click);
		});
	}

	/**
	 * Send an analytics event to the requested analytics adapters
	 * An adapter for the analytics adapter must exist in the adapters/
	 * directory.
	 *
	 * @memberof module:analytics/main
	 */

	function trigger(event_name, ev, adapters, data, nav) {

		var adapter_paths_tmp,
			adapter_stack = [];

		pending_events.push(event_name);

		// Create a "stack" with an element for each adapter
		// It's created by making a copy of the `adapters` array
		if (typeof adapters !== "undefined") {
			adapter_stack = adapters.concat();
		}
		adapter_paths_tmp = get_adapter_paths(adapters, 'events');

		function navigate() {
			// If it's a link, navigate to its href
			if (typeof ev !== "undefined") {
				var el = lib.getEventTarget(ev),
					we_nav;

				// if the `nav` parameter was passed in, honor it,
				// but if it wasn't passed in, fall back to the should_nav
				// function
				if (typeof nav !== "undefined") {
					we_nav = nav;
				} else {
					we_nav = should_nav(ev);
				}

				if (we_nav) {
					window.location.href = el.href;
				}
			}
		}

		function event_callback(timeout_id) {
			return function () {
				// If there are no adapters waiting, navigate
				if (adapter_stack.length !== 0) {
					adapter_stack.pop();
				}
				if (adapter_stack.length === 0) {
					clearTimeout(timeout_id);
					navigate();
				}
				wipe(event_name);
				// Remove the pending event
				pending_events.splice(pending_events.indexOf(event_name), 1);
			};
		}

		require(adapter_paths_tmp, function () {
			var i, timeout_id;

			if (_.any(arguments, _.isUndefined)) { return; }

			// Set timeout before navigating
			if (typeof ev !== "undefined") {
				timeout_id = setTimeout(function () {
					navigate();
				}, 500);
			}

			for (i = 0; i < arguments.length; i += 1) {
				// Call the event
				arguments[i].trigger(event_name, ev, data, event_callback(timeout_id));
			}
		});

	}

	/**
	 * Get the name of this module.
	 *
	 * @memberof module:analytics/main
	 * @returns NAME the name of this module
	 */
	function get_name() {
		return NAME;
	}

	/**
	 * Get the name and version of this module.
	 *
	 * @memberof module:analytics/main
	 * @returns version the name and version of this module
	 */
	function get_version() {
		return NAME_ACRONYM + ' ' + VERSION;
	}

	function init(adapters_arg) {
		// Grab the URL-based attributes from the URLParser and add
		// them to the main attributes object
		var url_patterns,
			pattern;

		// If a string was passed in for `adapters`, convert it to
		// an array
		if (typeof adapters_arg === "string") {
			adapters = [adapters_arg];
		} else {
			adapters = adapters_arg;
		}

		// Get RequireJS-style paths to each adapter
		adapter_paths = get_adapter_paths(adapters);
		// Init the URL Parser
		parser = new url.URLParser(portal_urls.url_definitions);
		url_patterns = parser.parse(location);

		// pre-fetch the attributes and events adapters
		//attr_deps   = get_adapter_paths(adapters, 'attributes');
		//event_deps  = get_adapter_paths(adapters, 'events');
		//require(attr_deps);
		//require(event_deps);

		// Set certain attributes based on URL patterns.
		// https://paftest-portalplatform.itos.redhat.com/admin/arbvars/urlpattern/
		if (typeof url_patterns !== "undefined") {
			pattern = url_patterns[0];
			if (typeof pattern !== "undefined") {
				attributes.all.Collection.set(pattern.Collection);
				attributes.all.Platform.set(pattern.Platform);
				attributes.all.ResourceID.set(pattern.ResourceID);
				attributes.all.ResourceType.set(pattern.ResourceType);
				attributes.all.UseType.set(pattern.UseType);
				if (pattern.hasOwnProperty("Product") && typeof pattern.Product !== "undefined") {
					attributes.all.Products.set(pattern.Product);
				}
				// If ErrorPageName is set, use that instead of the
				// standard pagename algorithm
				if (attributes.all.ErrorPageName.value) {
					attributes.all.PageName.set(attributes.all.ErrorPageName.value);
				} else {
					attributes.all.PageName.set(pattern.pageName);
				}
			}
		}

		// Attach references to some analytics modules to the global
		// portal.analytics object.  This is purely for developer
		// convenience while debugging.  In application code, these
		// should ALWAYS be included with RequireJS; they should never
		// be referenced as portal.analytics.attributes, etc.
		portal.analytics.attributes = attributes;
		portal.analytics.parser     = parser;
		portal.analytics.report     = report;

	}

	/**
	 * Set an attribute value.  This is a simple proxy for {@link
	 * module:analytics/attributes.set analytics/attributes.set}.
	 *
	 * @memberof module:analytics/main
	 * @param {string} attr The name of the attribute to set.  You can view all
	 * the attribute names names with {@link module:analytics/attributes.list
	 * analytics/attributes.list}.
	 * @param {string|number|array} value The value to assign to the attribute.
	 * @returns Nothing of consequence.
	 * @example
	 * chrometwo_require(['analytics/main'], function (analytics) {
	 *     analytics.set("Language", "en");
	 * });
	 */

	function set(attr, val) {
		attributes.set(attr, val);
	}

	/**
	 * A simple proxy to {@link module:analytics/attributes.get
	 * analytics/attributes.get}, added so that integrated app authors need
	 * only include analytics/main before getting attributes and wiring up
	 * events.
	 *
	 * @memberof module:analytics/main
	 */

	function get(attr) {
		return attributes.get(attr);
	}

	/**
	 * Instruct PAF to wait before sending page-view analytics.
	 *
	 * If you need to capture any analytics about data from, say, a
	 * long-running AJAX call, you should call `wait_for` as early in the page
	 * as possible, and when the AJAX call is done, call `{@link
	 * module:analytics/main.wait_end wait_end}`.
	 *
	 * Page-view analytics will be sent once no outstanding "waits" remain.
	 *
	 * The same name must be passed into both `wait_for` and `wait_end`.
	 *
	 * @memberof module:analytics/main
	 * @param {string} name A name of your choice, describing the data you're
	 * waiting for.  Remember it, since you must use the same name to end the
	 * wait.
	 * @example
	 * chrometwo_require(['analytics/main'], function (analytics) {
	 *     analytics.wait_for("my data");
	 *
	 *     // do stuff... for example wait for required data from an AJAX request
	 *     analytics.set("MyAttribute", ajaxData);
	 *
	 *     analytics.wait_end("my data");
	 * });
	 */
	function wait_for(name) {
		waits[name] = "I said I'd be done in a minute!";
	}

	/**
	 * End a wait that was previously established with a call to `{@link
	 * module:analytics/main.wait_for wait_for}`.
	 *
	 * @memberof module:analytics/main
	 * @param {string} name The same unique name that was passed into `{@link
	 * module:analytics/main.wait_for wait_for}`
	 */
	function wait_end(name) {
		delete waits[name];
		// if no more waits exist, send the report
		if (!waiting()) {
			report.apply({}, wait_args);
		}
	}

	return {
		report            : report,
		on                : on,
		trigger           : trigger,
		wipe              : wipe,
		get_version       : get_version,
		get_name          : get_name,
		get_adapter_paths : get_adapter_paths,
		get_adapters      : get_adapters,
		parser            : parser,
		set               : set,
		get               : get,
		wait_for          : wait_for,
		wait_end          : wait_end,
		init              : init
	};

});
