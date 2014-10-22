/* jshint browser: true */
/* global define */

/**
 * This module automatically applies applies jQuery's equalHeight's plugin, by
 * looking for elements with matching `data-eh"` attribute values.
 *
 * For example...
 *
 *     <div data-eh="giveUsEqualHeight" class="foo">
 *         Some content...
 *     </div>
 *     <div data-eh="giveUsEqualHeight" class="foo">
 *         Some other content...
 *     </div>
 *
 * Previously, you'd have to run `$('.foo').equalHeights();` to apply equal
 * heights to both divs, but this module will automatically apply
 * `equalHeights` to any HTML elements that have matching `data-eh` values.
 *
 * @module data-eh
 * @author Michael Clayton <mclayton@redhat.com>
 * @copyright Red Hat 2014
 */

/* global define */
/* jshint browser: true */

(function (global) {

define([
    "jquery",
    "underscore",
    "equalHeights"
],
function main($, _) {

    function apply() {

        var uniq_vals   = _.uniq( $.map( $("[data-eh]"), get_data_attr_val ) );
        var els_on_page = _.map( uniq_vals, create_selector );

        _.each( els_on_page, apply_equalheights );

    }

    function get_data_attr_val(el) {
        return $(el).attr('data-eh'); 
    }

    function create_selector(val) {
        return "[data-eh=" + val + "]";
    }

    /**
     * Resets the current height to `auto`, in case equalHeights has already
     * been run on these elements, and then re-runs equalHeights.
     */
    function apply_equalheights(els) {
        $(els).css('height', 'auto').equalHeights();
    }

    function init() {
        // run apply onready
        $(_.defer(apply));

        // run (throttled) apply on resize
        $(window).resize(_.throttle(apply, 200));
    }

    init();

    return {
        apply: apply
    };

});

})(window);
