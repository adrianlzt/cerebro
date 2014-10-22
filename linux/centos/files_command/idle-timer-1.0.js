//######
//## This work is licensed under the Creative Commons Attribution-Share Alike 3.0
//## United States License. To view a copy of this license,
//## visit http://creativecommons.org/licenses/by-sa/3.0/us/ or send a letter
//## to Creative Commons, 171 Second Street, Suite 300, San Francisco, California, 94105, USA.
//######
(function($){
	$.fn.idleTimeout = function(options) {

		var defaults = {
			inactivity:   1000 * 60,     // time (ms) before user is considered inactive
			sessionAlive: 1000 * 60 * 10, // frequency (ms) to hit aliveUrl (if non-null)
			aliveUrl: '/services/ping',	 // URL that keeps session alive
			redirectUrl: null,			 // URL to land after forced logout
			logoutUrl: null,		 	 // async session destroy URL called before redirect to redirectUrl
			activityReset: true 		 // if true, reset timer on clicks & mouse movement
		};

		var opts = $.extend(defaults, options);
		var liveTimeout, sessionTimeout;

		var startLiveTimeout = function() {
    		stopLiveTimeout();
			clearTimeout(liveTimeout);
			liveTimeout = setTimeout(onInactive, opts.inactivity);
		};

		var stopLiveTimeout = function() {
			clearTimeout(liveTimeout);
			clearTimeout(sessionTimeout);
		};

		var onInactive = function() {
			if (opts.sessionAlive) {
				keepSession();
				clearTimeout(sessionTimeout);
				sessionTimeout = setTimeout(keepSession, opts.sessionAlive);
			}
		};

		var keepSession = function() {
			if (opts.aliveUrl.indexOf('/services/ping') !== -1) {
				$.getJSON(opts.aliveUrl + '?jsoncallback=?');
			} else {
				$.get(opts.aliveUrl);
			}
			clearTimeout(sessionTimeout);
			sessionTimeout = setTimeout(keepSession, opts.sessionAlive);
		};

		// export the plug-in
		return this.each(function() {
			obj = $(this);
			startLiveTimeout();
			if (opts.activityReset) {
				$(document).bind('click', startLiveTimeout);
				$(document).bind('mousemove', startLiveTimeout);
			}
		});
	};
})(jQuery);