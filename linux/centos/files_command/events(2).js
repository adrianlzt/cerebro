/*global define*/
/*jslint browser: true*/

/**
 * Analytics event module.  Events are used for capturing things like mouse
 * clicks, in-page tab changes, important AJAX transactions, etc.
 *
 * Anything that is not tied directly to a page request can be captured by an
 * event.
 *
 * This module defines the {@link module:analytics/events.AnalyticsEvent
 * AnalyticsEvent} class.  For any event you would like to add, an event
 * definition must be created.  For example, in order to capture clicks on
 * search results, a `PortalSearchResultClick` event definition was created,
 * which defines what data needs to be captured.
 *
 * Those event definitions (ie. implementations) for the Portal live in {@link
 * module:analytics/adapters/omniture/events
 * analytics/adapters/omniture/events}.
 *
 * Events are initiated by calling {@link module:analytics/main.trigger
 * analytics/main.trigger}.
 *
 * @module analytics/events
 * @see https://mojo.redhat.com/docs/DOC-175737
 * @author Michael Clayton <mclayton@redhat.com>
 * @copyright Red Hat 2013-2014
 */
define(function () {

	"use strict";

	/**
	 * Represents an Analytics Event, as defined in:
	 *
	 * @memberof module:analytics/events
	 * @constructor
	 * @param {object} args An event definition object.
	 * @param {string} args.name A human-readable name for the event (letters
	 * only, no spaces, camel case).  For example, `"PortalSearchResultClick"`.
	 * @param {array} [args.value] An initial value for the event.  Optional;
	 * will be `undefined` if not provided.
	 * @param {function} args.trigger A function which triggers the event (ie.
	 * sends it to whichever analytics engines have been wired up).
	 *
	 * @see https://mojo.redhat.com/docs/DOC-175737#jive_content_id_Events
	 */
	function AnalyticsEvent(args) {

		var p;

		// Make 'new' keyword optional
		if (!(this instanceof AnalyticsEvent)) {
			return new AnalyticsEvent(args);
		}

		// Copy all of args' props onto this AnalyticsEvent.
		for (p in args) {
			if (args.hasOwnProperty(p)) {
				this[p] = args[p];
			}
		}

	}

	return {
		AnalyticsEvent: AnalyticsEvent
	};

});
