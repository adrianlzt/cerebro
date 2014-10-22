/* globals define */

/**
 * This is a module for dismissing "notices", "alerts", or any temporary
 * messages that appear on a webpage.  The module will add a dismiss button
 * (an 'X') that, when clicked, will hide the message on the current page, and
 * that message will remain hidden on subsequent pageviews.
 *
 * localStorage is used to keep track of which messages have been dismissed.
 *
 * This module deals with two data types, jq objects and alert objects.
 *
 * A "jq object" is a jQuery object which represents an outage message in the
 * DOM.  It has all the jQuery paraphernalia you'd expect of a jQuery object.
 *
 * An "alert object" is a JavaScript object with one required property, `text`.
 * The `text` property's value is the actual text that the outage message
 * contains.  Alert objects have an optinal property, `expire_on`, which
 * is applied when the user clicks the `X`, and stores the timestamp of the
 * click.  The timestamp is stored so that entries may be expired.
 *
 * @example
 * // Here's an example alert object:
 *
 * {
 *     text: "The Customer Portal will be down on July 12."
 * }
 *
 * @module dismiss
 */

define(['underscore', 'jquery', 'chrome_lib'], function(_, $, lib) {

    var STORE_KEY = 'dismissed';
    var CONTAINER = 'body';
    var BUTTON    = '.dismiss-button';
    var TTL       = 7; // days.  the number of days the alert will stay dismissed

    /**
     * Add days to a JavaScript Date object.
     *
     * @memberof module:dismiss
     * @param {Date} date A Date object.
     * @param {number} days The number of days to add to the given date.
     * @returns {Date} A new Date object with the given days added.
     */
    function add_days( date, days ) {
        var d = new Date(date.valueOf());
        d.setDate(d.getDate() + days);
        return d;
    }

    /**
     * Transform a jq object into an alert object.
     *
     * @memberof module:dismiss
     * @param {jq_object} jq_obj A jQuery object.
     * @returns {alert} An alert object.
     * @example
     * > to_alert( $('#notices li') )
     * { text: "The text from the list i tem" }
     */
    function to_alert( jq_obj ) {
        return {
            text      : $(jq_obj).text(),
            expire_on : get_expiry_date()
        };
    }

    function get_expiry_date() {
        return add_days(new Date(), TTL).toUTCString();
    }

    /**
     * Transform an alert object into a jq object.  The jq object must exist on
     * the current page.
     *
     * @memberof module:dismiss
     * @param {alert} alert An alert object.
     * @returns {jq_object} A jQuery object.
     * @example
     * > to_jq( {text: "Some text"} )
     *
     */
    function to_jq( alert ) {
        return $(CONTAINER).find('[data-dismissable]:contains("' + alert.text + '")');
    }

    /**
     * Finds all the notices or outage messages on the current page and
     * converts them into an array of alert objects.
     *
     * @memberof module:dismiss
     * @returns {alert[]} An array of the alert objects which exist on the
     * current page.
     * @example
     * > alerts_on_page()
     * [
     *  { text: "The portal will be down tomorrow." },
     *  { text: "The portal will be up on Wednesday." },
     *  { text: "The sun will set in the west." }
     * ]
     */
    function alerts_on_page() {
        return _.map($(CONTAINER).find('[data-dismissable]'), to_alert);
    }

    /**
     * Get an array containing all the alerts that have been dismissed.
     *
     * @memberof module:dismiss
     * @returns {alert[]}
     */
    function dismissed_alerts() {
        // provide an empty array if nothing is in localStorage
        return lib.store.local.get(STORE_KEY) || [];
    }

    /**
     * Add the given alert to the list of dismissed alerts.  This function adds
     * a property, `expire_on`, to alert object, which is later used to expire
     * old dismissals.
     *
     * @memberof module:dismiss
     * @param {alert} alert The alert that is being dismissed.
     * @returns {alert} The given alert, but with an updated `expire_on` value.
     */
    function dismiss( alert ) {
        var dismissed        = dismissed_alerts();
        var alert_copy       = _.clone(alert);
        alert_copy.expire_on = get_expiry_date();
        dismissed.push(alert_copy);
        lib.store.local.set(STORE_KEY, dismissed);
        hide(alert);
        return alert_copy;
    }

    /**
     * Remove the given alert from the list of dismissed alerts.  This removes the given alert from localStorage.
     *
     * @memberof module:dismiss
     * @param {alert} alert The alert to remove.
     * @returns {alert} The given alert (it will not be modified).
     */
    function undismiss( alert ) {
        // Remove the alert from localStorage
        lib.store.local.set(STORE_KEY, _.reject(dismissed_alerts(), prop_equal(alert, 'text')));
        show(alert);
        return alert;
    }

    function prop_equal(obj_a, prop) {
        return function(obj_b) {
            return _.isEqual(obj_a[prop], obj_b[prop]);
        };
    }

    /**
     * Hide the given alert.
     *
     * @memberof module:dismiss
     * @param {alert} alert The alert to remove.
     */
    function hide( alert ) {
        to_jq(alert).fadeOut(168*2);
    }

    /**
     * Create a new cache-busting URL parameter for RequireJS AMD modules.
     *
     * @memberof module:dismiss
     */
    function show( alert ) {
        to_jq(alert).fadeIn(168*2);
    }

    /**
     * Predicate for determining if the given string has been dismissed by the
     * user.
     *
     * This is the same as {@link module:dismiss.is_alert_dismissed
     * is_alert_dismissed}, but it accepts a string instead of an `alert`
     * object.
     *
     * @memberof module:dismiss
     * @param {string} text The text that may have been dismissed by the user.
     * @returns {boolean} Whether or not the given text has been dismissed by
     * the user.
     */
    function is_dismissed( text ) {
        return _.contains(_.pluck(dismissed_alerts(), 'text'), text);
    }

    /**
     * Predicate for determining if the given alert has been dismissed by the
     * user.
     *
     * This is the same as {@link module:dismiss.is_dismissed is_dismissed},
     * but it accepts an `alert` object instead of a string.
     *
     * @memberof module:dismiss
     * @param {alert} alert An alert object.
     * @returns {boolean} Whether or not the given alert has been dismissed by
     * the user.
     */
    function is_alert_dismissed( alert ) {
        return _.some(dismissed_alerts(), _.partial(_.isEqual, alert));
    }

    /**
     * A functional (non-method) version of jQuery's `.parent()` method.
     *
     * @memberof module:dismiss
     * @returns {jQuery} a jQuery object representing the DOM element that is
     * the parent of `this`.  Useful in composing event handlers.
     */
    function parent() {
        return $.prototype.parent.call( $(this) );
    }

    /**
     * An event handler for revealing the `X` button.
     *
     * @memberof module:dismiss
     */
    function reveal_dismiss_button() {
        $(this).find(BUTTON).show();
    }

    /**
     * An event handler for hiding the `X` button.
     *
     * @memberof module:dismiss
     */
    function conceal_dismiss_button() {
        $(this).find(BUTTON).hide();
    }

    /**
     * An event handler for when the user clicks the `X` button to dismiss the
     * alert.
     *
     * @memberof module:dismiss
     * @function
     */
    var dismiss_button_handler = _.compose( dismiss, to_alert, parent );

    /**
     * Given an alert object, this function will add an `X` button to the DOM
     * element which matches the alert's text.
     *
     * It also establishes {@link module:dismiss.dismiss_button_handler
     * dismiss_button_handler} as the `click` handler for the `X` button.
     *
     * @memberof module:dismiss
     * @param {alert} alert The alert to add an `X` button to.
     */
    function add_button( alert ) {
        var jq_obj = to_jq(alert);

        // Check whether a button already exists, so we don't add it twice
        if (jq_obj.find(BUTTON).length === 0) {
            jq_obj.append('<button class="dismiss-button"></button>')
            .find(BUTTON)
            // .hide()
            .click(dismiss_button_handler);
        }
    }

    function dismissable_hover_handler() {
        var alert = to_alert( $(this) );
        add_button( alert );
        reveal_dismiss_button.call(this);
    }

    /**
     * Predicate for determining whether an alert is expired.
     *
     * @memberof module:dismiss
     * @param {alert} alert An alert which may or may not be expired.
     * @returns {boolean} `true` if the alert has expired, `false` if it hasn't
     * expired.
     */
    function is_expired( alert ) {
        return (new Date(alert.expire_on)).getTime() < (new Date()).getTime();
    }

    /**
     * Establish hover events for all alerts on the page and expire any
     * out-of-date dismissals.
     *
     * @memberof module:dismiss
     */
    function init() {

        // // Get all the alerts that have been dismissed
        var dismissed = dismissed_alerts();

        var needs_expiry = _.filter(dismissed, is_expired);

        // Expire them!
        _.map(needs_expiry, undismiss);

        $(CONTAINER).on('mouseenter', '[data-dismissable]', dismissable_hover_handler);
        $(CONTAINER).on('mouseleave', '[data-dismissable]', conceal_dismiss_button);
    }

    return {
        init         : init,
        is_dismissed : is_dismissed
    };

});
