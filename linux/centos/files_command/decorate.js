/*global jQuery, DEBUG, document, window, define, console, localStorage, Uri*/

var DEBUG = false;

jQuery(document).ready(function () {
	"use strict";
	var dfuncs;

	/**
	 * a kiss console.log wrapper
	 */
	function debug(message) {
		if (DEBUG) {
			console.log(message);
		}
	}

	/**
	 * a kiss safe array looper
	 */
	function arrayEach(array, func) {
		var i, len;
		for (i = 0, len = array.length; i < len; i = i + 1) {
			func(array[i], i);
		}
	}


	/**
	 * extracts the decorate_* functions from the passed in string
	 * @return an array of objects with the functionName, args, and originalElement
	 */
	function getFunctionsFromClass(str, originalElement) {
		var funcAndParamsArray, functions;


		// make an array of all the function name and param pairs
		funcAndParamsArray = str.match(/decorate_[\w]*?\([\w:,' ]*\)/g);
		functions = [];

		// iterate over the fname param pairs
		arrayEach(funcAndParamsArray, function (thing) {
			var functionName, params;

			// get the name
			functionName = thing.match(/(decorate_[\w]*?)\(/)[1];

			// get the args as an array
			params = thing.match(/decorate_[\w]*?\(([\w:,' ]*)\)/)[1];
			params = params.replace(/([\w]*):/g, '"$1":');
			params = params.replace(/'/g, '"');
			params = JSON.parse('{' + params + '}');

			// only if the function exists in our namespace, add the found function, args, and the original element
			if (typeof dfuncs[functionName] === 'function') {
				functions.push({name: functionName, args: params, that: originalElement});
			} else {
				debug("found function " + functionName + " but function does not exist.");
			}
		});

		return functions;
	}

	/**
	 * runs the functions in the passed in array
	 */
	function runFunctions(arr) {
		arrayEach(arr, function (obj) {
			// run function by name, applying the params before running
			dfuncs[obj.name].apply(obj.that, [obj.args]);
		});
	}

	/**
	 * adds or concats the params to a specific element
	 */
	function addParamHelper(element, name, options) {
		var uri, tmpParam;
		uri = new Uri(element.attr('href'));
		tmpParam = uri.getQueryParamValue(name);
		if ((tmpParam === undefined)) {
			element.attr('href', uri.addQueryParam(name, options.value));
		} else {
			if (options.nest) {
				element.attr('href', uri.replaceQueryParam(name, tmpParam + '.' + options.value));
			} else {
				element.attr('href', uri.replaceQueryParam(name, options.value));
			}
		}
	}

	/**
	 * adds a parameter to either the passed in element, or the children of the element
	 */
	function addParam(element, name, options) {
		if ((options.recurse === undefined) || (options.recurse === true)) {
			// find all the hrefs
			element.find('a[href]').each(function () {
				var a = jQuery(this);
				addParamHelper(a, name, options);
			});
		} else {
			addParamHelper(element, name, options);
		}
	}

	// the namespace for decorate functions
	dfuncs = {
		decorate_ref: function (options) {
			addParam(jQuery(this), 'ref', options);
		},
		decorate_mask: function (options) {
			addParam(jQuery(this), 'mask', options);
		},
		decorate_analytics: function () {
			debug('decorate_analytics not yet implemented');
		}
	};

	jQuery('*[data-decorate]').each(function () {
		var element, functions;
		element = jQuery(this);

		// determine what function to run
		functions = getFunctionsFromClass(element.attr('data-decorate'), element);

		// run the functions
		runFunctions(functions);
	});
});