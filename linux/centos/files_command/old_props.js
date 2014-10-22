/*global define*/
/*jslint browser: true*/

define(['s_code', 'analytics/adapters/omniture/old_fns'], function () {

	var proxy_s = {};

	function doOldAnalytics() {

		if (window.checkRegEvent() === 1) {
			// just deleted omni_reg and omni_login cookies
			proxy_s.events = "event1";
		} else if (window.checkLoginEvent() === 1) {
			// just deleted omni_login cookie
			proxy_s.events = "event2";
		}
	}

	function copy_s_props() {
		var prop;
		for (prop in window.s) {
			if (window.s.hasOwnProperty(prop)) {
				proxy_s[prop] = window.s[prop];
			}
		}
	}

	doOldAnalytics();
	copy_s_props();

	proxy_s.prop1="";
	proxy_s.prop2="";
	proxy_s.prop3="";
	proxy_s.prop4=window.location.href;
	proxy_s.prop5="";

	if (typeof window.pageLocale !== "undefined"){
		window.s.eVar22 = window.pageLocale;
		proxy_s.eVar22 = proxy_s.eVar22.toLowerCase();
		proxy_s.prop2 = proxy_s.eVar22.toLowerCase();
	}

	if (document.question_form) {
		proxy_s.eVar4 = document.question_form.question_box.value;
		proxy_s.eVar4 = proxy_s.eVar4.toLowerCase();
	}

	if (document.getElementById("search_keyword") !== null) {
		proxy_s.eVar4 = document.getElementById("search_keyword").value;
		proxy_s.eVar4 = proxy_s.eVar4.toLowerCase();
	}

	if (!proxy_s.eVar3 || proxy_s.eVar3 === "") {
		proxy_s.eVar3 = window.getLoginStatus();
		proxy_s.prop1 = window.getLoginStatus();
	}

	if (window.checkRegEvent() === 1) { // just deleted omni_reg and omni_login cookies
		proxy_s.events = "event1";
	} else if (window.checkLoginEvent() === 1) { // just deleted omni_login cookie
		proxy_s.events = "event2";
	}

	// TODO this is a temporary preservation shim of the old events code
	window.s.events = proxy_s.events;

	return proxy_s;

});
