/*global define*/
/*jslint regexp: true, browser: true*/

/**
 * URL patterns for the {@link http://access.redhat.com Red Hat Customer Portal}.
 *
 * Defined in this file are regex patterns which match some Portal URLs.
 * On a pageview, if the URL pattern is matched, the following attributes will
 * be set in `portal.analytics.attributes.all`:
 *
 *  - Platform
 *  - UseType
 *  - Collection
 *  - ResourceType
 *  - ResourceID
 *  - PageName
 *
 * @module analytics/sites/portal/urls
 * @see https://paftest-portalplatform.itos.redhat.com/admin/arbvars/urlpattern/
 * @author Michael Clayton <mclayton@redhat.com>
 * @copyright Red Hat 2013-2014
 */
define(['analytics/attributes', 'analytics/separators'], function (attributes, separators, undefined) {
	"use strict";

	var PLATFORMS,
		COLLECTIONS,
		PERSONAS,
		url_definitions,
		doc_title,
		kp_content;

	// Look-up tables

	PLATFORMS = {
		HOME            : 'home',
		PORTAL          : 'portal',
		PORTAL_SEARCH   : 'portal-search',
		KPLATFORM       : 'k-platform',
		PCM             : 'pcm',
		GROUPS          : 'groups',
		DOCS            : 'docs',
		RHN             : 'rhn',
		RHSM            : 'rhsm',
		CVE             : 'cve',
		CUSTOMER_CENTER : 'customer-center',
		JBOSS_CSP       : 'jboss-csp',
		CSP             : 'csp',
		LABS            : 'labs',
		UNIFIED         : 'u-download',
		SUBSCRIPTIONS   : 'sub-center',
		CERTIFICATION   : 'certification'
	};

	COLLECTIONS = {
		BLOGS_GENERAL        : 'blogs-general',
		BLOGS_POSTS          : 'blogs-posts',
		CVE                  : 'cve',
		ERRATA               : 'errata',
		GROUPS_ADMIN         : 'groups-admin',
		GROUPS_ANNOUNCEMENTS : 'groups-announcements',
		GROUPS_DISCUSSIONS   : 'groups-discussions',
		GROUPS_DOCUMENTS     : 'groups-documents',
		GROUPS_ETC           : 'groups-etc',
		GROUPS_GENERAL       : 'groups-general',
		GROUPS_POLLS         : 'groups-polls',
		GROUPS_USERS         : 'groups-users',
		KP_ANNOUNCEMENTS     : 'kp-announcements',
		KP_ARTICLES          : 'kp-articles',
		KP_DISCUSSIONS       : 'kp-discussions',
		KP_DOWNLOADS         : 'kp-downloads',
		KP_GENERAL           : 'kp-general',
		KP_PAGES             : 'kp-pages',
		KP_SOLUTIONS         : 'kp-solutions',
		KP_TOOLS             : 'kp-tools',
		KP_VIDEOS            : 'kp-videos',
		PORTAL_DOWNLOADS     : 'portal-downloads',
		REGISTERED_SYSTEMS   : 'registered-systems',
		SEARCH_RESULTS       : 'search-results',
		SOFTWARE_CHANNELS    : 'software-channels',
		SOFTWARE_DOWNLOADS   : 'software-downloads',
		SOFTWARE_ERRATA      : 'software-errata',
		SOFTWARE_PACKAGES    : 'software-packages',
		SUPPORT_CASES        : 'support-cases',
		SYSTEM_ENTITLEMENTS  : 'system-entitlements',
		SYSTEM_GROUPS        : 'system-groups'
	};

	PERSONAS = {
		CONSUMER : 'consumer',
		EDITOR   : 'editor',
		ADMIN    : 'admin'
	};

	kp_content = "kp-content";

	// Create a document title with the portal name removed:
	doc_title = attributes.get('ResourceTitle');
	//document.title.replace(' - Red Hat Customer Portal', '');

	function sanitize_underscores(val) {
		var retval = '';
		if (typeof val === 'string') {
			return val.replace(/_/g, ' ');
		}
		return retval;
	}

	/**
	 * This `url_definitions` object contains URL patterns for most of the
	 * URLs on the Red Hat Customer Portal.  Each of the objects in this array
	 * will be fed into the {@link module:analytics/url.URLPattern URLPattern} constructor
	 * as arguments.
	 *
	 * See {@link
	 * https://paftest-portalplatform.itos.redhat.com/admin/arbvars/urlpattern/
	 * the URL Doc} for the specification that defines all the URL patterns.
	 *
	 * @memberof module:analytics/sites/portal/urls
	 */
	url_definitions = [

		/***************
		 *  Home page  *
		 ***************/

		{
			regex           : /^\/+home\/*([?#].*)?$/, // with or without trailing slash
			platform        : PLATFORMS.HOME,
			persona         : undefined,
			collection      : undefined,
			resource_type   : "home",
			get_resource_id : undefined,
			get_page_name   : function () {
				return [this.Platform, this.ResourceType];
			}
		},

		/*******************
		 *  Portal Default  *
		 *******************/

		{
			regex           : /^\/logout\/*/,
			platform        : PLATFORMS.HOME,
			persona         : undefined,
			collection      : undefined,
			resource_type   : "logout",
			get_resource_id : undefined,
			get_page_name   : function () {
				return [this.Platform, this.ResourceType];
			}
		},


		/*******************
		 *  Portal Search  *
		 *******************/

		{
			regex           : /^\/+search\/+results\/*.*([?#].*)?$/,
			platform        : PLATFORMS.PORTAL_SEARCH,
			collection      : COLLECTIONS.SEARCH_RESULTS,
			persona         : PERSONAS.CONSUMER,
			resource_type   : "result-list",
			get_resource_id : undefined,
			get_page_name   : function () {
				return [this.Platform, this.ResourceType];
			}
		},

		{
			regex           : /^\/+search\/+browse\/+search.*([?#].*)?$/,
			platform        : PLATFORMS.PORTAL_SEARCH,
			collection      : COLLECTIONS.SEARCH_RESULTS,
			persona         : PERSONAS.CONSUMER,
			resource_type   : "browse-everything",
			get_resource_id : undefined,
			get_page_name   : function () {
				return [this.Platform, this.ResourceType, "everything"];
			}
		},

		{
			regex           : /^\/+search\/+browse\/+solutions.*([?#].*)?$/,
			platform        : PLATFORMS.PORTAL_SEARCH,
			collection      : COLLECTIONS.SEARCH_RESULTS,
			persona         : PERSONAS.CONSUMER,
			resource_type   : "browse-solutions",
			get_resource_id : undefined,
			get_page_name   : function () {
				return [this.Platform, this.ResourceType, "solutions"];
			}
		},

		{
			regex           : /^\/+search\/+browse\/+articles.*([?#].*)?$/,
			platform        : PLATFORMS.PORTAL_SEARCH,
			collection      : COLLECTIONS.SEARCH_RESULTS,
			persona         : PERSONAS.CONSUMER,
			resource_type   : "browse-articles",
			get_resource_id : undefined,
			get_page_name   : function () {
				return [this.Platform, this.ResourceType, "articles"];
			}

		},

		{
			regex           : /^\/+search\/+browse\/+videos.*([?#].*)?$/,
			platform        : PLATFORMS.PORTAL_SEARCH,
			collection      : COLLECTIONS.SEARCH_RESULTS,
			persona         : PERSONAS.CONSUMER,
			resource_type   : "browse-videos",
			get_resource_id : undefined,
			get_page_name   : function () {
				return [this.Platform, this.ResourceType, "videos"];
			}

		},

		{
			regex           : /^\/+search\/+browse\/+documentation.*([?#].*)?$/,
			platform        : PLATFORMS.PORTAL_SEARCH,
			collection      : COLLECTIONS.SEARCH_RESULTS,
			persona         : PERSONAS.CONSUMER,
			resource_type   : "browse-docs",
			get_resource_id : undefined,
			get_page_name   : function () {
				return [this.Platform, this.ResourceType, "documentation"];
			}
		},

		{
			regex           : /^\/+search\/+browse\/+discussions.*([?#].*)?$/,
			platform        : PLATFORMS.PORTAL_SEARCH,
			collection      : COLLECTIONS.SEARCH_RESULTS,
			persona         : PERSONAS.CONSUMER,
			resource_type   : "browse-discussions",
			get_resource_id : undefined,
			get_page_name   : function () {
				return [this.Platform, this.ResourceType, "discussions"];
			}
		},

		{
			regex           : /^\/+search\/+case\/*.*([?#].*)?$/,
			platform        : PLATFORMS.PORTAL_SEARCH,
			collection      : COLLECTIONS.SEARCH_RESULTS,
			persona         : PERSONAS.CONSUMER,
			resource_type   : "browse-cases",
			get_resource_id : undefined,
			get_page_name   : function () {
				return [this.Platform, this.ResourceType, "cases"];
			}

		},

		/***************
		 *  KPlatform  *
		 ***************/

		{
			regex           : /^(\/+site)?\/+knowledgebase\/*([^\/+]+)*([?#].*)?$/,
			platform        : PLATFORMS.KPLATFORM,
			collection      : COLLECTIONS.KP_SOLUTIONS,
			persona         : PERSONAS.CONSUMER,
			resource_type   : "kb-view",
			get_resource_id : undefined,
			get_page_name   : function () {
				return [this.Platform, this.ResourceType];
			}
		},
		{
			regex           : /^(\/+site)?\/+solutions\/+(\d+)\/*([?#].*)?$/,
			platform        : PLATFORMS.KPLATFORM,
			collection      : COLLECTIONS.KP_SOLUTIONS,
			persona         : PERSONAS.CONSUMER,
			resource_type   : "solution-view",
			get_resource_id : function () {
				var node_id = this.params[2];
				return [kp_content, node_id];
			},
			get_page_name   : function () {
				var node_id = this.params[2];
				return [this.Platform, this.ResourceType, node_id, doc_title];
			}
		},

		{
			regex           : /^(\/+site)?\/+([^\/+]+)\/+solutions\/+(\d+)\/*([?#].*)?$/,
			platform        : PLATFORMS.KPLATFORM,
			collection      : COLLECTIONS.KP_SOLUTIONS,
			persona         : PERSONAS.CONSUMER,
			resource_type   : "solution-view",
			get_resource_id : function () {
				var node_id = this.params[3];
				return [kp_content, node_id];
			},
			get_page_name   : function () {
				var node_id = this.params[3];
				return [this.Platform, this.ResourceType, node_id, doc_title];
			}

		},

		{
			regex           : /^(\/+site)?\/+articles\/+(\d+)\/*([?#].*)?$/,
			platform        : PLATFORMS.KPLATFORM,
			collection      : COLLECTIONS.KP_ARTICLES,
			persona         : PERSONAS.CONSUMER,
			resource_type   : "article-view",
			get_resource_id : function () {
				var node_id = this.params[2];
				return [kp_content, node_id];
			},
			get_page_name   : function () {
				var node_id = this.params[2];
				return [this.Platform, this.ResourceType, node_id, doc_title];
			}
		},

		{
			regex           : /^(\/+site)?\/+([^\/+]+)\/+articles\/+(\d+)\/*([?#].*)?$/,
			platform        : PLATFORMS.KPLATFORM,
			collection      : COLLECTIONS.KP_ARTICLES,
			persona         : PERSONAS.CONSUMER,
			resource_type   : "article-view",
			get_resource_id : function () {
				var node_id = this.params[3];
				return [kp_content, node_id];
			},
			get_page_name   : function () {
				var node_id = this.params[3];
				return [this.Platform, this.ResourceType, node_id, doc_title];
			}
		},

		{
			regex           : /^(\/+site)?\/+videos\/+(\d+)\/*([?#].*)?$/,
			platform        : PLATFORMS.KPLATFORM,
			collection      : COLLECTIONS.KP_VIDEOS,
			persona         : PERSONAS.CONSUMER,
			resource_type   : "video-view",
			get_resource_id : function () {
				var node_id = this.params[2];
				return [kp_content, node_id];
			},
			get_page_name   : function () {
				var node_id = this.params[2];
				return [this.Platform, this.ResourceType, node_id, doc_title];
			}
		},

		{
			regex           : /^(\/+site)?\/+([^\/+]+)\/+videos\/+(\d+)\/*([?#].*)?$/,
			platform        : PLATFORMS.KPLATFORM,
			collection      : COLLECTIONS.KP_VIDEOS,
			persona         : PERSONAS.CONSUMER,
			resource_type   : "video-view",
			get_resource_id : function () {
				var node_id = this.params[3];
				return [kp_content, node_id];
			},
			get_page_name   : function () {
				var node_id = this.params[3];
				return [this.Platform, this.ResourceType, node_id, doc_title];
			}
		},

		{
			regex           : /^(\/+site)?\/+announcements\/+(\d+)\/*([?#].*)?$/,
			platform        : PLATFORMS.KPLATFORM,
			collection      : COLLECTIONS.KP_ANNOUNCEMENTS,
			persona         : PERSONAS.CONSUMER,
			resource_type   : "announcement-view",
			get_resource_id : function () {
				var node_id = this.params[2];
				return [kp_content, node_id];
			},
			get_page_name   : function () {
				var node_id = this.params[2];
				return [this.Platform, this.ResourceType, node_id, doc_title];
			}
		},

		{
			regex           : /^(\/+site)?\/+([^\/+]+)\/+announcements\/+(\d+)\/*([?#].*)?$/,
			platform        : PLATFORMS.KPLATFORM,
			collection      : COLLECTIONS.KP_ANNOUNCEMENTS,
			persona         : PERSONAS.CONSUMER,
			resource_type   : "announcement-view",
			get_resource_id : function () {
				var node_id = this.params[3];
				return [kp_content, node_id];
			},
			get_page_name   : function () {
				var node_id = this.params[3];
				return [this.Platform, this.ResourceType, node_id, doc_title];
			}
		},

		{
			regex           : /^(\/+site)?\/+discussions\/+(\d+)\/*([?#].*)?$/,
			platform        : PLATFORMS.KPLATFORM,
			collection      : COLLECTIONS.KP_DISCUSSIONS,
			persona         : PERSONAS.CONSUMER,
			resource_type   : "discussion-view",
			get_resource_id : function () {
				var node_id = this.params[2];
				return [kp_content, node_id];
			},
			get_page_name   : function () {
				var node_id = this.params[2];
				return [this.Platform, this.ResourceType, node_id, doc_title];
			}
		},

		{
			regex           : /^(\/+site)?\/+([^\/+]+)\/+discussions\/+(\d+)\/*([?#].*)?$/,
			platform        : PLATFORMS.KPLATFORM,
			collection      : COLLECTIONS.KP_DISCUSSIONS,
			persona         : PERSONAS.CONSUMER,
			resource_type   : "discussion-view",
			get_resource_id : function () {
				var node_id = this.params[3];
				return [kp_content, node_id];
			},
			get_page_name   : function () {
				var node_id = this.params[3];
				return [this.Platform, this.ResourceType, node_id, doc_title];
			}
		},

		{
			regex           : /^(\/+site)?\/+tools\/+(\d+)\/*([?#].*)?$/,
			platform        : PLATFORMS.KPLATFORM,
			collection      : COLLECTIONS.KP_TOOLS,
			persona         : PERSONAS.CONSUMER,
			resource_type   : "tool-view",
			get_resource_id : function () {
				var node_id = this.params[2];
				return [kp_content, node_id];
			},
			get_page_name   : function () {
				var node_id = this.params[2];
				return [this.Platform, this.ResourceType, node_id, doc_title];
			}
		},

		{
			regex           : /^(\/+site)?\/+([^\/+]+)\/+tools\/+(\d+)\/*([?#].*)?$/,
			platform        : PLATFORMS.KPLATFORM,
			collection      : COLLECTIONS.KP_TOOLS,
			persona         : PERSONAS.CONSUMER,
			resource_type   : "tool-view",
			get_resource_id : function () {
				var node_id = this.params[3];
				return [kp_content, node_id];
			},
			get_page_name   : function () {
				var node_id = this.params[3];
				return [this.Platform, this.ResourceType, node_id, doc_title];
			}
		},

		{
			regex           : /^(\/+site)?\/+pages\/+(\d+)\/*([?#].*)?$/,
			platform        : PLATFORMS.KPLATFORM,
			persona         : PERSONAS.CONSUMER,
			collection      : COLLECTIONS.KP_PAGES,
			resource_type   : "page-view",
			get_resource_id : function () {
				var node_id = this.params[2];
				return [kp_content, node_id];
			},
			get_page_name   : function () {
				var node_id = this.params[2];
				return [this.Platform, this.ResourceType, node_id, doc_title];
			}
		},

		{
			regex           : /^(\/+site)?\/+products\/*([?#].*)?$/,
			platform        : PLATFORMS.KPLATFORM,
			persona         : PERSONAS.CONSUMER,
			collection      : COLLECTIONS.KP_PAGES,
			resource_type   : "product-view",
			get_resource_id : undefined,
			get_page_name   : function () {
				return [this.Platform, this.ResourceType];
			}
		},

		{
			regex           : /^(\/+site)?\/+products\/+([^\/+]+)\/*([?#].*)?$/,
			platform        : PLATFORMS.KPLATFORM,
			persona         : PERSONAS.CONSUMER,
			collection      : COLLECTIONS.KP_PAGES,
			resource_type   : "product-view",
			get_resource_id : undefined,
			get_page_name   : function () {
				return [this.Platform, this.ResourceType, doc_title];
			},
			get_product : function () {
				var product = this.params[2];
				return sanitize_underscores(product);
			}
		},

		{
			regex           : /^(\/+site)?\/+products\/+([^\/+]+)\/+([^?#\/+]+)\/*([?#].*)?$/,
			platform        : PLATFORMS.KPLATFORM,
			persona         : PERSONAS.CONSUMER,
			collection      : COLLECTIONS.KP_PAGES,
			resource_type   : "product-view",
			get_resource_id : undefined,
			get_page_name   : function () {
				var subproduct = this.params[3];

				if (['documentation', 'knowledgebase', 'resources'].indexOf(subproduct) >= 0) {
					attributes.set('ToolName', 'Product Search');
				}
				return [this.Platform, this.ResourceType, doc_title, subproduct];
			},
			get_product : function () {
				var product = this.params[2];
				return sanitize_underscores(product);
			}
		},

		{
			regex           : /^(\/+site)?\/+([^\/+]+)\/+pages\/+(\d+)\/*([?#].*)?$/,
			platform        : PLATFORMS.KPLATFORM,
			collection      : COLLECTIONS.KP_PAGES,
			persona         : PERSONAS.CONSUMER,
			resource_type   : "page-view",
			get_resource_id : function () {
				var node_id = this.params[3];
				return [kp_content, node_id];
			},
			get_page_name   : function () {
				var node_id = this.params[3];
				return [this.Platform, this.ResourceType, node_id, doc_title];
			}
		},

		{
			regex           : /^(\/+site)?\/+node\/+(\d+)\/*([?#].*)?$/,
			platform        : PLATFORMS.KPLATFORM,
			collection      : COLLECTIONS.KP_GENERAL,
			persona         : PERSONAS.CONSUMER,
			resource_type   : "node-view",
			get_resource_id : function () {
				var node_id = this.params[2];
				return [kp_content, node_id];
			},
			get_page_name   : function () {
				var node_id = this.params[2];
				return [this.Platform, this.ResourceType, node_id, doc_title];
			}
		},

		{
			regex           : /^(\/+site)?\/+([^\/+]+)\/+node\/+(\d+)\/*([?#].*)?$/,
			platform        : PLATFORMS.KPLATFORM,
			collection      : COLLECTIONS.KP_GENERAL,
			persona         : PERSONAS.CONSUMER,
			resource_type   : "node-view",
			get_resource_id : function () {
				var node_id = this.params[3];
				return [kp_content, node_id];
			},
			get_page_name   : function () {
				var node_id = this.params[3];
				return [this.Platform, this.ResourceType, node_id, doc_title];
			}
		},

		{
			regex           : /^(\/+site)?\/+nodes\/+(\d+)\/+edit\/*([?#].*)?$/,
			platform        : PLATFORMS.KPLATFORM,
			collection      : COLLECTIONS.KP_GENERAL,
			persona         : PERSONAS.EDITOR,
			resource_type   : "node-edit",
			get_resource_id : function () {
				var node_id = this.params[2];
				return [kp_content, node_id];
			},
			get_page_name   : function () {
				var node_id = this.params[2];
				return [this.Platform, this.ResourceType, node_id, doc_title];
			}
		},

		{
			regex           : /^(\/+site)?\/+([^\/+]+)\/+node\/+(\d+)\/+edit\/*([?#].*)?$/,
			platform        : PLATFORMS.KPLATFORM,
			collection      : COLLECTIONS.KP_GENERAL,
			persona         : PERSONAS.EDITOR,
			resource_type   : "node-edit",
			get_resource_id : function () {
				var node_id = this.params[3];
				return [kp_content, node_id];
			},
			get_page_name   : function () {
				var node_id = this.params[3];
				return [this.Platform, this.ResourceType, node_id, doc_title];
			}
		},

		{
			regex           : /^(\/+site)?\/+node\/+(\d+)\/+moderation\/*([?#].*)?$/,
			platform        : PLATFORMS.KPLATFORM,
			collection      : COLLECTIONS.KP_GENERAL,
			persona         : PERSONAS.EDITOR,
			resource_type   : "node-moderate",
			get_resource_id : function () {
				var node_id = this.params[2];
				return [kp_content, node_id];
			},
			get_page_name   : function () {
				var node_id = this.params[2];
				return [this.Platform, this.ResourceType, node_id, doc_title];
			}
		},

		{
			regex           : /^(\/+site)?\/+node\/+(\d+)\/+translate\/*([?#].*)?$/,
			platform        : PLATFORMS.KPLATFORM,
			collection      : COLLECTIONS.KP_GENERAL,
			persona         : PERSONAS.EDITOR,
			resource_type   : "node-translation-list",
			get_resource_id : function () {
				var node_id = this.params[2];
				return [kp_content, node_id];
			},
			get_page_name   : function () {
				var node_id = this.params[2];
				return [this.Platform, this.ResourceType, node_id, doc_title];
			}
		},

		{
			regex           : /^(\/+site)?\/+node\/+(\d+)\/+devel\/*([?#].*)?$/,
			platform        : PLATFORMS.KPLATFORM,
			collection      : COLLECTIONS.KP_GENERAL,
			persona         : PERSONAS.EDITOR,
			resource_type   : "node-devel-view",
			get_resource_id : function () {
				var node_id = this.params[2];
				return [kp_content, node_id];
			},
			get_page_name   : function () {
				var node_id = this.params[2];
				return [this.Platform, this.ResourceType, node_id, doc_title];
			}
		},

		{
			regex           : /^(\/+site)?\/+admin\/+config\/+(\d+)\/*([?#].*)?$/,
			platform        : PLATFORMS.KPLATFORM,
			persona         : PERSONAS.ADMIN,
			collection      : COLLECTIONS.KP_GENERAL,
			resource_type   : undefined,
			get_resource_id : undefined,
			get_page_name   : function () {
				return ["{SUB_URL}"];
			}
		},

		{
			regex           : /^(\/+site)?\/+([^\/+]+)\/+admin\/+config\/+(\d+)\/*([?#].*)?$/,
			platform        : PLATFORMS.KPLATFORM,
			persona         : PERSONAS.ADMIN,
			collection      : COLLECTIONS.KP_GENERAL,
			resource_type   : undefined,
			get_resource_id : undefined,
			get_page_name   : function () {
				return ["{SUB_URL}"];
			}

		},

		{
			regex           : /^(\/+site)?\/+users\/+(\d+)\/*([?#].*)?$/,
			platform        : PLATFORMS.KPLATFORM,
			persona         : PERSONAS.CONSUMER,
			collection      : COLLECTIONS.KP_GENERAL,
			resource_type   : "kp-user",
			get_resource_id : function () {
				var user_id = this.params[2];
				return ['kp', 'user', user_id];
			},
			get_page_name   : function () {
				return [this.Platform, this.ResourceType, this.params[2], doc_title];
			}
		},

		{
			regex           : /^(\/+site)?\/+([^\/+]+)\/+users\/+(\d+)\/*([?#].*)?$/,
			platform        : PLATFORMS.KPLATFORM,
			persona         : PERSONAS.CONSUMER,
			collection      : COLLECTIONS.KP_GENERAL,
			resource_type   : "kp-user",
			get_resource_id : function () {
				var user_id = this.params[3];
				return ['kp', 'users', user_id];
			},
			get_page_name   : function () {
				return [this.Platform, this.ResourceType, this.params[2], doc_title];
			}
		},

		{
			regex           : /^(\/+site)?\/+users\/+(\d+)\/+notifications\/*([?#].*)?$/,
			platform        : PLATFORMS.KPLATFORM,
			persona         : PERSONAS.CONSUMER,
			collection      : undefined,
			resource_type   : undefined,
			get_resource_id : function () {
				var user_id = this.params[2];
				return ['kp', 'user', user_id];
			},
			get_page_name   : function () {
				var user_id = this.params[2];
				return [this.Platform, this.ResourceType, user_id, doc_title];
			}
		},

		{
			regex           : /^(\/+site)?\/+([^\/+]+)\/+users\/+(\d+)\/+notifications\/*([?#].*)?$/,
			platform        : PLATFORMS.KPLATFORM,
			persona         : PERSONAS.CONSUMER,
			collection      : undefined,
			resource_type   : undefined,
			get_resource_id : undefined,
			get_page_name   : function () {
				return [this.Platform, this.ResourceType, this.params[1], doc_title];
			}
		},

		{
			regex           : /^(\/+site)?\/+downloads\/+evals\/([^/?#]+)\/*([?#].*)?$/,
			platform        : PLATFORMS.PORTAL,
			persona         : PERSONAS.CONSUMER,
			collection      : undefined,
			resource_type   : "eval-conf",
			get_resource_id : undefined,
			get_page_name   : function () {
				return [this.Platform, this.ResourceType, doc_title.toLowerCase()];
			}
		},

		{
			regex           : /^(\/+site)?\/+downloads\/*([?#].*)?$/,
			platform        : PLATFORMS.KPLATFORM,
			persona         : PERSONAS.CONSUMER,
			collection      : COLLECTIONS.KP_DOWNLOADS,
			resource_type   : "download-view",
			get_resource_id : undefined,
			get_page_name   : function () {
				return [this.Platform, this.ResourceType, doc_title];
			}
		},

		{
			regex           : /^\/+search\/+browse\/+docker-images\/*([?#].*)?$/,
			platform        : PLATFORMS.PORTAL,
			persona         : PERSONAS.CONSUMER,
			collection      : COLLECTIONS.PORTAL_DOWNLOADS,
			resource_type   : "download-docker-images",
			get_resource_id : undefined,
			get_page_name   : function () {
				return [this.Platform, this.ResourceType];
			}
		},

		{
			regex           : /^(\/+site)?\/+([^\/+]+)\/+downloads\/*([?#].*)?$/,
			platform        : PLATFORMS.KPLATFORM,
			persona         : PERSONAS.CONSUMER,
			collection      : COLLECTIONS.KP_DOWNLOADS,
			resource_type   : "download-view",
			get_resource_id : undefined,
			get_page_name   : function () {
				return [this.Platform, this.ResourceType, doc_title];
			}
		},

		{
			regex           : /^(\/+site)?\/+([^\/+]+)\/+downloads\/*([?#].*)?$/,
			platform        : PLATFORMS.KPLATFORM,
			persona         : PERSONAS.CONSUMER,
			collection      : COLLECTIONS.KP_DOWNLOADS,
			resource_type   : "download-view",
			get_resource_id : undefined,
			get_page_name   : function () {
				return [this.Platform, this.ResourceType, doc_title];
			}
		},


		// Blogs
		{
			regex           : /^(\/+site)?\/+blogs\/*([?#].*)?$/,
			platform        : PLATFORMS.KPLATFORM,
			persona         : PERSONAS.CONSUMER,
			collection      : COLLECTIONS.BLOGS_GENERAL,
			resource_type   : "blogs-dashboard",
			get_resource_id : undefined,
			get_page_name   : function () {
				return [this.Platform, this.ResourceType, doc_title];
			}
		},
		{
			regex           : /^(\/+site)?\/+blogs\/+([^\/+]+)\/*([?#].*)?$/,
			platform        : PLATFORMS.KPLATFORM,
			persona         : PERSONAS.CONSUMER,
			collection      : COLLECTIONS.BLOGS_GENERAL,
			resource_type   : "blog-dashboard",
			get_resource_id : function () {
				var blog_id = this.params[2];
				return ['kp', 'blog', blog_id];
			},
			get_page_name   : function () {
				var blog_id = this.params[2];
				return [this.Platform, this.ResourceType, blog_id, doc_title];
			}
		},
		{
			regex           : /^(\/+site)?\/+blogs\/+([^\/+]+)\/+posts\/*([?#].*)?$/,
			platform        : PLATFORMS.KPLATFORM,
			persona         : PERSONAS.CONSUMER,
			collection      : COLLECTIONS.BLOGS_POSTS,
			resource_type   : "blog-post-list",
			get_resource_id : undefined,
			get_page_name   : function () {
				var blog_id = this.params[2];
				return [this.Platform, this.ResourceType, blog_id, doc_title];
			}
		},
		{
			regex           : /^(\/+site)?\/+blogs\/+([^\/+]+)\/+posts\/+([^\/+]+)\/*([?#].*)?$/,
			platform        : PLATFORMS.KPLATFORM,
			persona         : PERSONAS.CONSUMER,
			collection      : COLLECTIONS.BLOGS_POSTS,
			resource_type   : "blog-post-view",
			get_resource_id : function () {
				var node_id = this.params[3];
				return ['kp', 'content', node_id];
			},
			get_page_name   : function () {
				var node_id = this.params[3];
				return [this.Platform, this.ResourceType, node_id, doc_title];
			}
		},
		{
			regex           : /^(\/+site)?\/+node\/+([^\/+]+)\/+members\/*([?#].*)?$/,
			platform        : PLATFORMS.KPLATFORM,
			persona         : PERSONAS.CONSUMER,
			collection      : COLLECTIONS.BLOGS_POSTS,
			resource_type   : "blog-member-list",
			get_resource_id : undefined,
			get_page_name   : function () {
				var blog_id = this.params[2];
				return [this.Platform, this.ResourceType, blog_id, doc_title];
			}
		},

		// Private Groups (Drupal 7)
		{
			regex           : /^(\/+site)?\/+groups\/*([?#].*)?$/,
			platform        : PLATFORMS.KPLATFORM,
			persona         : PERSONAS.CONSUMER,
			collection      : COLLECTIONS.GROUPS_GENERAL,
			resource_type   : "groups-dashboard",
			get_resource_id : undefined,
			get_page_name   : function () {
				return [this.Platform, this.ResourceType, doc_title];
			}
		},

		{
			regex           : /^(\/+site)?\/+groups\/+([^\/+]+)\/*([?#].*)?$/,
			platform        : PLATFORMS.KPLATFORM,
			persona         : PERSONAS.CONSUMER,
			collection      : COLLECTIONS.GROUPS_GENERAL,
			resource_type   : "group-dashboard",
			get_resource_id : function () {
				var group_id = this.params[2];
				return ['kg', 'group', group_id];
			},
			get_page_name   : function () {
				var group_id = this.params[2];
				attributes.set('GroupID', group_id);
				return [this.Platform, this.ResourceType, group_id, doc_title];
			}
		},

		{
			regex           : /^(\/+site)?\/+groups\/+([^\/+]+)\/+announcements\/*([?#].*)?$/,
			platform        : PLATFORMS.KPLATFORM,
			persona         : PERSONAS.CONSUMER,
			collection      : COLLECTIONS.GROUPS_ANNOUNCEMENTS,
			resource_type   : "group-announcement-list",
			get_resource_id : undefined,
			get_page_name   : function () {
				var group_id = this.params[2];
				attributes.set('GroupID', group_id);
				return [this.Platform, this.ResourceType, group_id, doc_title];
			}
		},

		{
			regex           : /^(\/+site)?\/+groups\/+([^\/+]+)\/+announcements\/+([^\/+]+)\/*([?#].*)?$/,
			platform        : PLATFORMS.KPLATFORM,
			persona         : PERSONAS.CONSUMER,
			collection      : COLLECTIONS.GROUPS_ANNOUNCEMENTS,
			resource_type   : "group-announcement-view",
			get_resource_id : function () {
				var node_id = this.params[3];
				return ['kg', 'content', node_id];
			},
			get_page_name   : function () {
				var group_id = this.params[2],
					node_id  = this.params[3];
				attributes.set('GroupID', group_id);
				return [this.Platform, this.ResourceType, node_id, doc_title];
			}
		},

		{
			regex           : /^(\/+site)?\/+groups\/+([^\/+]+)\/+discussions\/*([?#].*)?$/,
			platform        : PLATFORMS.KPLATFORM,
			persona         : PERSONAS.CONSUMER,
			collection      : COLLECTIONS.GROUPS_DISCUSSIONS,
			resource_type   : "group-discussion-list",
			get_resource_id : undefined,
			get_page_name   : function () {
				var group_id = this.params[2];
				attributes.set('GroupID', group_id);
				return [this.Platform, this.ResourceType, group_id, doc_title];
			}
		},

		{
			regex           : /^(\/+site)?\/+groups\/+([^\/+]+)\/+discussions\/+([^\/+]+)\/*([?#].*)?$/,
			platform        : PLATFORMS.KPLATFORM,
			persona         : PERSONAS.CONSUMER,
			collection      : COLLECTIONS.GROUPS_DISCUSSIONS,
			resource_type   : "group-discussion-view",
			get_resource_id : function () {
				var node_id = this.params[3];
				return ['kg', 'content', node_id];
			},
			get_page_name   : function () {
				var group_id = this.params[2],
					node_id  = this.params[3];
				attributes.set('GroupID', group_id);
				return [this.Platform, this.ResourceType, node_id, doc_title];
			}
		},

		{
			regex           : /^(\/+site)?\/+groups\/+([^\/+]+)\/+browse\/*([?#].*)?$/,
			platform        : PLATFORMS.KPLATFORM,
			persona         : PERSONAS.CONSUMER,
			collection      : COLLECTIONS.GROUPS_GENERAL,
			resource_type   : "group-content-list",
			get_resource_id : undefined,
			get_page_name   : function () {
				var group_id = this.params[2];
				attributes.set('GroupID', group_id);
				return [this.Platform, this.ResourceType, group_id, doc_title];
			}
		},

		{
			regex           : /^(\/+site)?\/+node\/+([^\/+]+)\/+members\/*([?#].*)?$/,
			platform        : PLATFORMS.KPLATFORM,
			persona         : PERSONAS.CONSUMER,
			collection      : COLLECTIONS.GROUPS_GENERAL,
			resource_type   : "group-member-list",
			get_resource_id : undefined,
			get_page_name   : function () {
				var group_id = this.params[2];
				attributes.set('GroupID', group_id);
				return [this.Platform, this.ResourceType, group_id, doc_title];
			}
		},

		// Groups (Drupal 6)
		{
			regex           : /^\/+groups\/*([?#].*)?$/,
			platform        : PLATFORMS.GROUPS,
			persona         : PERSONAS.CONSUMER,
			collection      : "groups-etc",
			resource_type   : "groups-dashboard",
			get_resource_id : undefined,
			get_page_name   : function () {
				return [this.Platform, this.ResourceType];
			}

		},

		{
			regex           : /^\/+groups\/+([^\/+]+)\/*([?#].*)?$/,
			platform        : PLATFORMS.GROUPS,
			persona         : PERSONAS.CONSUMER,
			collection      : "groups-etc",
			resource_type   : "groups-group-dashboard",
			get_resource_id : undefined,
			get_page_name   : function () {
				return [this.Platform, this.ResourceType, "{GROUP_NAME}"];
			}

		},

		{
			regex           : /^\/+node\/+([^\/+]+)\/+browse\/*([?#].*)?$/,
			platform        : PLATFORMS.GROUPS,
			persona         : PERSONAS.CONSUMER,
			collection      : "groups-discussions",
			resource_type   : "groups-discussions-list",
			get_resource_id : undefined,
			get_page_name   : function () {
				return [this.Platform, this.ResourceType, this.params[1]];
			}

		},

		{
			regex           : /^\/+discussion\/+([^\/+]+)\/*([?#].*)?$/,
			platform        : PLATFORMS.GROUPS,
			persona         : PERSONAS.CONSUMER,
			collection      : "groups-discussions",
			resource_type   : "groups-discussion-view",
			get_resource_id : undefined,
			get_page_name   : function () {
				return [this.Platform, this.ResourceType, this.params[1]];
			}

		},

		{
			regex           : /^\/+wiki\/+([^\/+]+)\/*([?#].*)?$/,
			platform        : PLATFORMS.GROUPS,
			persona         : PERSONAS.CONSUMER,
			collection      : "groups-documents",
			resource_type   : "groups-document-view",
			get_resource_id : undefined,
			get_page_name   : function () {
				return [this.Platform, this.ResourceType, this.params[1]];
			}

		},

		{
			regex           : /^\/+notice\/+([^\/+]+)\/*([?#].*)?$/,
			platform        : PLATFORMS.GROUPS,
			persona         : PERSONAS.CONSUMER,
			collection      : "groups-announcements",
			resource_type   : "groups-announcement-view",
			get_resource_id : undefined,
			get_page_name   : function () {
				return [this.Platform, this.ResourceType, this.params[1]];
			}

		},

		// Groups Poll url missing from table
		{
			regex           : /^\/+tag\/+([^\/+]+)\/*([?#].*)?$/,
			platform        : PLATFORMS.GROUPS,
			persona         : PERSONAS.CONSUMER,
			collection      : "groups-etc",
			resource_type   : "groups-taxonomy-tags-list",
			get_resource_id : undefined,
			get_page_name   : function () {
				return [this.Platform, this.ResourceType, this.params[1]];
			}

		},

		{
			regex           : /^\/+users\/+([^\/+]+)\/*([?#].*)?$/,
			platform        : PLATFORMS.GROUPS,
			persona         : PERSONAS.CONSUMER,
			collection      : "groups-users",
			resource_type   : "groups-user-profile-view",
			get_resource_id : undefined,
			get_page_name   : function () {
				return [this.Platform, this.ResourceType, this.params[1]];
			}

		},

		// Documentation

		{
			regex           : /^(\/+site)?\/+documentation\/*(index\.html)?([?#].*)?$/,
			platform        : PLATFORMS.PORTAL,
			persona         : PERSONAS.CONSUMER,
			collection      : "docs",
			resource_type   : "docs-index",
			get_resource_id : undefined,
			get_page_name   : function () {
				return [this.Platform, this.ResourceType];
			}
		},
		{
			//                                            {LOCALE}
			regex           : /^(\/+site)?\/+documentation\/+([^\/+]+)\/*(index\.html)?([?#].*)?$/,
			platform        : PLATFORMS.PORTAL,
			persona         : PERSONAS.CONSUMER,
			collection      : "docs",
			resource_type   : "docs-index",
			get_resource_id : undefined,
			get_page_name   : function () {
				var locale = sanitize_underscores(this.params[2]);
				attributes.set("Language", locale);
				return [this.Platform, this.ResourceType];
			}
		},
		{
			//                                            {LOCALE}    {PRODUCT}
			regex           : /^(\/+site)?\/+documentation\/+([^\/+]+)\/+([^\/+]+)\/*([^\/+]*)([?#].*)?$/,
			platform        : PLATFORMS.PORTAL,
			collection      : "docsA",
			persona         : PERSONAS.CONSUMER,
			resource_type   : "docs-index",
			get_resource_id : undefined,
			get_page_name   : function () {

				var locale  = sanitize_underscores(this.params[2]),
					product = sanitize_underscores(this.params[3]);

				attributes.set("Language", locale);
				attributes.set("Products", product);

				return [
					this.Platform,
					this.ResourceType,
					product
				];
			},
			get_product : function () {
				var product = this.params[3];
				return sanitize_underscores(product);
			}

		},
		{
			//                                            {LOCALE}    {PRODUCT}   {VERSION}
			regex           : /^(\/+site)?\/+documentation\/+([^\/+]+)\/+([^\/+]+)\/+([^\/+]+)\/*([^\/+]*)([?#].*)?$/,
			platform        : PLATFORMS.PORTAL,
			collection      : "docsB",
			persona         : PERSONAS.CONSUMER,
			resource_type   : "docs-index",
			get_resource_id : undefined,
			get_page_name   : function () {

				var locale              = this.params[2],
					product             = sanitize_underscores(this.params[3]),
					product_version     = sanitize_underscores(this.params[4]);

				attributes.set('Products', product + ' ' + product_version);
				attributes.set('Language', locale);

				return [
					this.Platform,
					this.ResourceType,
					product,
					product_version
				];

			},
			get_product : function () {
				var product         = this.params[3],
					product_version = this.params[4];
				return sanitize_underscores(product + ' ' + product_version);
			}
		},
		{
			//                                            {LOCALE}    {PRODUCT}   {VERSION}   {FORMAT}    {TITLE}     {HTMLfile}
			regex           : /^(\/+site)?\/+documentation\/+([^\/+]+)\/+([^\/+]+)\/+([^\/+]+)\/+([^\/+]+)\/+([^\/+]+)\/*([^\/+]*)([?#].*)?$/,
			platform        : PLATFORMS.DOCS,
			collection      : "docs",
			persona         : PERSONAS.CONSUMER,
			resource_type   : "docs-view",
			get_resource_id : undefined,
			get_page_name   : function () {

				var locale              = this.params[2],
					product             = this.params[3],
					product_version     = this.params[4],
					documentation_title = sanitize_underscores(this.params[6]),
					content_subtype;

				if (documentation_title.indexOf('Release Notes') !== -1) {
					content_subtype = 'Release Notes';
				} else if (documentation_title.indexOf('Technical Notes') !== -1) {
					content_subtype = 'Technical Notes';
				} else {
					content_subtype = 'General';
				}

				attributes.set('Products', product + ' ' + product_version);
				attributes.set('ResourceTitle', documentation_title);
				attributes.set('ResourceType', 'documentation');
				attributes.set('ContentSubType', content_subtype);
				attributes.set('Language', locale);
				attributes.set('PublicationState', ['active', 'published']);
				//attributes.set('PublicationStatus', 'published');
				//attributes.set('PublicationState', 'active');

				return [
					this.Platform,
					this.ResourceType,
					sanitize_underscores(product),
					sanitize_underscores(product_version),
					sanitize_underscores(documentation_title)
				];

			},
			get_product : function () {
				var product = this.params[3],
					product_version = this.params[4];
				return sanitize_underscores(product + ' ' + product_version);
			}
		},

		/*************
		 *  Support  *
		 *************/

		{
			regex           : /^\/+support\/+cases\/+list\/+open\/*([?#].*)group=([^&]+)?$/,
			platform        : PLATFORMS.PCM,
			collection      : COLLECTIONS.SUPPORT_CASES,
			persona         : PERSONAS.CONSUMER,
			resource_type   : "case-list-open",
			get_resource_id : function () {
				var group_id = this.params[2];
				return ["case", "group", group_id].join(separators.dash);
			},
			get_page_name   : function () {
				return [this.Platform, this.ResourceType];
			}
		},

		{
			regex           : /^\/+support\/+cases\/+list\/+all\/*([?#].*)?$/,
			platform        : PLATFORMS.PCM,
			collection      : COLLECTIONS.SUPPORT_CASES,
			persona         : PERSONAS.CONSUMER,
			resource_type   : "case-list-all",
			get_resource_id : undefined,
			get_page_name   : function () {
				return [this.Platform, this.ResourceType];
			}
		},

		{
			regex           : /^\/+support\/+cases\/+list\/+closed\/*([?#].*)?$/,
			platform        : PLATFORMS.PCM,
			collection      : COLLECTIONS.SUPPORT_CASES,
			persona         : PERSONAS.CONSUMER,
			resource_type   : "case-list-closed",
			get_resource_id : undefined,
			get_page_name   : function () {
				return [this.Platform, this.ResourceType];
			}
		},

		{
			regex           : /^\/+support\/+cases\/*([?#].*)?$/,
			platform        : PLATFORMS.PCM,
			collection      : COLLECTIONS.SUPPORT_CASES,
			persona         : PERSONAS.CONSUMER,
			resource_type   : "case-list-open",
			get_resource_id : undefined,
			get_page_name   : function () {
				return [this.Platform, this.ResourceType];
			}
		},

		//Support case edit URL pattern missing

		{
			regex           : /^\/+support\/+cases\/+list\/+new\/*.*([?#].*)?$/,
			platform        : PLATFORMS.PCM,
			collection      : COLLECTIONS.SUPPORT_CASES,
			persona         : PERSONAS.CONSUMER,
			resource_type   : "case-creation",
			get_resource_id : undefined,
			get_page_name   : function () {
				return [this.Platform, this.ResourceType];
			}
		},

		{
			regex           : /^\/+support\/+cases\/+([^\/+]+)\/*([?#].*)?$/,
			platform        : PLATFORMS.PCM,
			collection      : COLLECTIONS.SUPPORT_CASES,
			persona         : PERSONAS.CONSUMER,
			resource_type   : "case-view",
			get_resource_id : undefined,
			get_page_name   : function () {
				return [this.Platform, this.ResourceType, this.params[1]];
			}
		},

		{
			regex           : /^\/+support\/+cases\/+([^\/+]+)\/+edit\/*([?#].*)?$/,
			platform        : PLATFORMS.PCM,
			collection      : COLLECTIONS.SUPPORT_CASES,
			persona         : PERSONAS.CONSUMER,
			resource_type   : "case-edit",
			get_resource_id : function () {
				var case_id = this.params[1];
				return ["case", case_id];
			},
			get_page_name   : function () {
				var case_id = this.params[1];
				return [this.Platform, this.ResourceType, case_id];
			}
		},

		/********************
		*  Support Policy  *
		********************/

		{
			regex           : /^\/+support\/+policy\/+updates\/+cloudsolutions\/*([?#].*)?$/,
			platform        : PLATFORMS.PCM,
			collection      : COLLECTIONS.SUPPORT_CASES,
			persona         : PERSONAS.CONSUMER,
			resource_type   : "case-edit",
			get_resource_id : function () {
				var case_id = this.params[1];
				return ["case", case_id];
			},
			get_page_name   : function () {
				var case_id = this.params[1];
				return [this.Platform, this.ResourceType, case_id];
			}
		},

		/**********************
		 *  Customer Success  *
		 **********************/
		{
			regex           : /^\/+customer-success\/*([?#].*)?$/,
			platform        : PLATFORMS.PORTAL,
			collection      : undefined,
			persona         : PERSONAS.CONSUMER,
			resource_type   : "customer-success",
			get_resource_id : undefined,
			get_page_name   : function () {
				return [this.Platform, this.ResourceType];
			}
		},

		/***********************
		 *  Unified Downloads  *
		 ***********************/

		{
			//                                           {  ???  } / {  ???  } / {ProdVer} / {Arch}
			regex           : /^\/+downloads\/+content\/+([^\/+]+)\/+([^\/+]+)\/+([^\/+]+)\/+([^\/+]+)\/+product-downloads\/*.*#erratatab.*?$/,
			platform        : PLATFORMS.UNIFIED,
			collection      : COLLECTIONS.SOFTWARE_ERRATA,
			persona         : PERSONAS.CONSUMER,
			resource_type   : "errata-list",
			get_resource_id : undefined,
			get_page_name   : function () {
				return [this.Platform, this.ResourceType, doc_title];
			}
		},
		{
			//                                           {  ???  } / {  ???  } / {ProdVer} / {Arch}
			regex           : /^\/+downloads\/+content\/+([^\/+]+)\/+([^\/+]+)\/+([^\/+]+)\/+([^\/+]+)\/+product-downloads\/*[^\/+]*$/,
			platform        : PLATFORMS.UNIFIED,
			collection      : COLLECTIONS.SOFTWARE_DOWNLOADS,
			persona         : PERSONAS.CONSUMER,
			resource_type   : "software-list",
			get_resource_id : undefined,
			get_page_name   : function () {
				return [this.Platform, this.ResourceType, doc_title];
			}
		},
		{
			//                                           {  ???  } / {  ???  } / {ProdVer} / {Arch}
			regex           : /^\/+downloads\/+content\/+([^\/+]+)\/+([^\/+]+)\/+([^\/+]+)\/+([^\/+]+)\/+packages.*$/,
			platform        : PLATFORMS.UNIFIED,
			collection      : COLLECTIONS.SOFTWARE_DOWNLOADS,
			persona         : PERSONAS.CONSUMER,
			resource_type   : "package-list",
			get_resource_id : undefined,
			get_page_name   : function () {
				return [this.Platform, this.ResourceType, doc_title];
			}
		},
		{
			//                                           {product}
			regex           : /^\/+downloads\/+content\/+([^\/+]+).*?$/,
			platform        : PLATFORMS.UNIFIED,
			collection      : COLLECTIONS.SOFTWARE_DOWNLOADS,
			persona         : PERSONAS.CONSUMER,
			resource_type   : "product-list",
			get_resource_id : undefined,
			get_page_name   : function () {
				return [this.Platform, this.ResourceType, doc_title];
			}
		},
		// the "download detail" url is incomplete and can't be implemented
		// the "package detail" url is incomplete and can't be implemented
		// the "errata detail" url is incomplete and can't be implemented

		/*********
		 *  RHN  *
		 *********/

		{ // Channels, all
			regex           : /^\/+rhn\/+software\/+channels\/+All\.do.*?$/,
			platform        : PLATFORMS.RHN,
			collection      : COLLECTIONS.SOFTWARE_CHANNELS,
			persona         : PERSONAS.CONSUMER,
			resource_type   : "channel-list",
			get_resource_id : undefined,
			get_page_name   : function () {
				return [this.Platform, this.ResourceType];
			}
		},
		{ // Channels, beta
			regex           : /^\/+rhn\/+software\/+channels\/+Beta\.do.*?$/,
			platform        : PLATFORMS.RHN,
			collection      : COLLECTIONS.SOFTWARE_CHANNELS,
			persona         : PERSONAS.CONSUMER,
			resource_type   : "channel-list-beta",
			get_resource_id : undefined,
			get_page_name   : function () {
				return [this.Platform, this.ResourceType];
			}
		},
		{ // Channels, retired
			regex           : /^\/+rhn\/+software\/+channels\/+Retired\.do.*?$/,
			platform        : PLATFORMS.RHN,
			collection      : COLLECTIONS.SOFTWARE_CHANNELS,
			persona         : PERSONAS.CONSUMER,
			resource_type   : "channel-list-retired",
			get_resource_id : undefined,
			get_page_name   : function () {
				return [this.Platform, this.ResourceType];
			}
		},
		{ // Channel
			regex           : /^\/+network\/+software\/+channels\/+details\.pxt.*cid=([^&]+)?$/,
			platform        : PLATFORMS.RHN,
			collection      : COLLECTIONS.SOFTWARE_CHANNELS,
			persona         : PERSONAS.CONSUMER,
			resource_type   : "channel-view",
			get_resource_id : undefined,
			get_page_name: function () {
				return [this.Platform, this.ResourceType];
			}
		},
		{ // Software, all
			regex           : /^\/+rhn\/+software\/+downloads\/+AllISOs\.do.*?$/,
			platform        : PLATFORMS.RHN,
			collection      : COLLECTIONS.SOFTWARE_DOWNLOADS,
			persona         : PERSONAS.CONSUMER,
			resource_type   : "software-list",
			get_resource_id : undefined,
			get_page_name   : function () {
				return [this.Platform, this.ResourceType];
			}
		},
		{ // Software, supported
			regex           : /^\/+rhn\/+software\/+downloads\/+SupportedISOs\.do.*?$/,
			platform        : PLATFORMS.RHN,
			collection      : COLLECTIONS.SOFTWARE_DOWNLOADS,
			persona         : PERSONAS.CONSUMER,
			resource_type   : "software-list-supported",
			get_resource_id : undefined,
			get_page_name   : function () {
				return [this.Platform, this.ResourceType];
			}
		},
		{ // Software, retired
			regex           : /^\/+rhn\/+software\/+downloads\/+RetiredISOs\.do.*?$/,
			platform        : PLATFORMS.RHN,
			collection      : COLLECTIONS.SOFTWARE_DOWNLOADS,
			persona         : PERSONAS.CONSUMER,
			resource_type   : "software-list-retired",
			get_resource_id : undefined,
			get_page_name   : function () {
				return [this.Platform, this.ResourceType];
			}
		},
		{ // Software
			regex           : /^\/+rhn\/+software\/+channel\/+downloads\/+Download\.do.*cid=([^&]+)?$/,
			platform        : PLATFORMS.RHN,
			collection      : COLLECTIONS.SOFTWARE_DOWNLOADS,
			persona         : PERSONAS.CONSUMER,
			resource_type   : "software-view",
			get_resource_id : function () {
				var channel_id = this.params[1];
				return "rhn-software-" + channel_id;
			},
			get_page_name   : function () {
				return [this.Platform, this.ResourceType];
			}
		},
		{ // Software downloadable              { type  }   { md5   }   {filenme}
			regex           : /^\/+rhn\/+isos\/+([^\/+]+)\/+([^\/+]+)\/+([^\/+]+).*?$/,
			platform        : PLATFORMS.RHN,
			collection      : COLLECTIONS.SOFTWARE_DOWNLOADS,
			persona         : PERSONAS.CONSUMER,
			resource_type   : "software-download-file",
			get_resource_id : undefined,
			get_page_name   : undefined
		},
		{ // Packages search
			regex           : /^\/+rhn\/+channels\/+software\/+Search\.do.*?$/,
			platform        : PLATFORMS.RHN,
			collection      : COLLECTIONS.SOFTWARE_PACKAGES,
			persona         : PERSONAS.CONSUMER,
			resource_type   : "package-search",
			get_resource_id : undefined,
			get_page_name   : function () {
				return [this.Platform, this.ResourceType];
			}
		},
		{ // Packages index
			regex           : /^\/+network\/+software\/+packages\/+name_overview\.pxt.*?$/,
			platform        : PLATFORMS.RHN,
			collection      : COLLECTIONS.SOFTWARE_PACKAGES,
			persona         : PERSONAS.CONSUMER,
			resource_type   : "package-list",
			get_resource_id : undefined,
			get_page_name   : function () {
				return [this.Platform, this.ResourceType];
			}
		},
		{ // Package
			regex           : /^\/+rhn\/+software\/+packages\/+details\/+Overview\.do.*pid=([^&]+)?$/,
			platform        : PLATFORMS.RHN,
			collection      : COLLECTIONS.SOFTWARE_PACKAGES,
			persona         : PERSONAS.CONSUMER,
			resource_type   : "package-view",
			get_resource_id : function () {
				var package_id = this.params[1];
				return "rhn-pkg-" + package_id;
			},
			get_page_name   : function () {
				return [this.Platform, this.ResourceType];
			}
		},
		{ // Software downloadable                {   id  }   { name  }   {version}   {arch   }   {filenme}
			regex           : /^\/+rhn\/+public\/+([^\/+]+)\/+([^\/+]+)\/+([^\/+]+)\/+([^\/+]+)\/+([^\/+]+)\/*([^\/]+)*$/,
			platform        : PLATFORMS.RHN,
			collection      : COLLECTIONS.SOFTWARE_PACKAGES,
			persona         : PERSONAS.CONSUMER,
			resource_type   : "package-download-file",
			get_resource_id : undefined,
			get_page_name   : undefined
		},
		{ // Errata products index
			regex           : /^\/+security\/+updates\/+(active|eol)\/*([^\/]+)*$/,
			platform        : PLATFORMS.RHN,
			collection      : COLLECTIONS.ERRATA,
			persona         : PERSONAS.CONSUMER,
			resource_type   : "errata-product-list",
			get_resource_id : undefined,
			get_page_name   : function () {
				return [this.Platform, this.ResourceType];
			}
		},
		{ // Errata index
			regex           : /^\/+errata\/*([^\/]+)-errata.html([?#].*)?$/,
			platform        : PLATFORMS.RHN,
			collection      : COLLECTIONS.ERRATA,
			persona         : PERSONAS.CONSUMER,
			resource_type   : "errata-list",
			get_resource_id : undefined,
			get_page_name   : function () {
				var channel = this.params[1];
				return [this.Platform, this.ResourceType, channel];
			}
		},
		{ // Errata
			regex           : /^\/+errata\/+([^\/]+).html([?#].*)?$/,
			platform        : PLATFORMS.RHN,
			collection      : COLLECTIONS.ERRATA,
			persona         : PERSONAS.CONSUMER,
			resource_type   : "errata-view",
			get_resource_id : undefined,
			get_page_name   : function () {
				var advisory_id = this.params[1];
				return [this.Platform, this.ResourceType, advisory_id];
			}
		},
		{ // System entitlements list
			regex           : /^\/+rhn\/+systems\/+SystemEntitlements\.do([?#].*)?$/,
			platform        : PLATFORMS.RHN,
			collection      : COLLECTIONS.SYSTEM_ENTITLEMENTS,
			persona         : PERSONAS.CONSUMER,
			resource_type   : "system-entitlements-list",
			get_resource_id : undefined,
			get_page_name   : function () {
				return [this.Platform, this.ResourceType];
			}
		},
		{ // System entitlements list, virtual guests list
			regex           : /^\/+rhn\/+systems\/+entitlements\/+GuestLimitedHosts\.do([?#].*)?$/,
			platform        : PLATFORMS.RHN,
			collection      : COLLECTIONS.SYSTEM_ENTITLEMENTS,
			persona         : PERSONAS.CONSUMER,
			resource_type   : "system-entitlements-virtual-guests-list",
			get_resource_id : undefined,
			get_page_name   : function () {
				return [this.Platform, this.ResourceType];
			}
		},
		{ // System entitlements list, channels
			regex           : /^\/+rhn\/+channels\/+software\/+Entitlements\.do([?#].*)?$/,
			platform        : PLATFORMS.RHN,
			collection      : COLLECTIONS.SYSTEM_ENTITLEMENTS,
			persona         : PERSONAS.CONSUMER,
			resource_type   : "system-entitlements-channels-list",
			get_resource_id : undefined,
			get_page_name   : function () {
				return [this.Platform, this.ResourceType];
			}
		},
		{ // System
			regex           : /^\/+rhn\/+systems\/+Notifications\.do([?#].*)?$/,
			platform        : PLATFORMS.RHN,
			collection      : COLLECTIONS.REGISTERED_SYSTEMS,
			persona         : PERSONAS.CONSUMER,
			resource_type   : "notifications-preferences",
			get_resource_id : undefined,
			get_page_name   : function () {
				return [this.Platform, this.ResourceType];
			}
		},
		{ // System search
			regex           : /^\/+rhn\/+systems\/+Search\.do([?#].*)?$/,
			platform        : PLATFORMS.RHN,
			collection      : COLLECTIONS.REGISTERED_SYSTEMS,
			persona         : PERSONAS.CONSUMER,
			resource_type   : "registered-systems-search",
			get_resource_id : undefined,
			get_page_name   : function () {
				return [this.Platform, this.ResourceType];
			}
		},
		{ // System list
			regex           : /^\/+rhn\/+systems\/+SystemList\.do([?#].*)?$/,
			platform        : PLATFORMS.RHN,
			collection      : COLLECTIONS.REGISTERED_SYSTEMS,
			persona         : PERSONAS.CONSUMER,
			resource_type   : "registered-systems-list",
			get_resource_id : undefined,
			get_page_name   : function () {
				return [this.Platform, this.ResourceType];
			}
		},
		{ // System list, virtual
			regex           : /^\/+rhn\/+systems\/+VirtualSystemsList\.do([?#].*)?$/,
			platform        : PLATFORMS.RHN,
			collection      : COLLECTIONS.REGISTERED_SYSTEMS,
			persona         : PERSONAS.CONSUMER,
			resource_type   : "registered-systems-list-virtual",
			get_resource_id : undefined,
			get_page_name   : function () {
				return [this.Platform, this.ResourceType];
			}
		},
		{ // System list, out of date
			regex           : /^\/+rhn\/+systems\/+OutOfDate\.do([?#].*)?$/,
			platform        : PLATFORMS.RHN,
			collection      : COLLECTIONS.REGISTERED_SYSTEMS,
			persona         : PERSONAS.CONSUMER,
			resource_type   : "registered-systems-list-outofdate",
			get_resource_id : undefined,
			get_page_name   : function () {
				return [this.Platform, this.ResourceType];
			}
		},
		{ // System list, unentitled
			regex           : /^\/+rhn\/+systems\/+Unentitled\.do([?#].*)?$/,
			platform        : PLATFORMS.RHN,
			collection      : COLLECTIONS.REGISTERED_SYSTEMS,
			persona         : PERSONAS.CONSUMER,
			resource_type   : "registered-systems-list-unentitled",
			get_resource_id : undefined,
			get_page_name   : function () {
				return [this.Platform, this.ResourceType];
			}
		},
		{ // System list, ungrouped
			regex           : /^\/+rhn\/+systems\/+Ungrouped\.do([?#].*)?$/,
			platform        : PLATFORMS.RHN,
			collection      : COLLECTIONS.REGISTERED_SYSTEMS,
			persona         : PERSONAS.CONSUMER,
			resource_type   : "registered-systems-list-ungrouped",
			get_resource_id : undefined,
			get_page_name   : function () {
				return [this.Platform, this.ResourceType];
			}
		},
		{ // System list, inactive
			regex           : /^\/+rhn\/+systems\/+Inactive\.do([?#].*)?$/,
			platform        : PLATFORMS.RHN,
			collection      : COLLECTIONS.REGISTERED_SYSTEMS,
			persona         : PERSONAS.CONSUMER,
			resource_type   : "registered-systems-list-inactive",
			get_resource_id : undefined,
			get_page_name   : function () {
				return [this.Platform, this.ResourceType];
			}
		},
		{ // System list, registered
			regex           : /^\/+rhn\/+systems\/+Registered\.do([?#].*)?$/,
			platform        : PLATFORMS.RHN,
			collection      : COLLECTIONS.REGISTERED_SYSTEMS,
			persona         : PERSONAS.CONSUMER,
			resource_type   : "registered-systems-list-registered",
			get_resource_id : undefined,
			get_page_name   : function () {
				return [this.Platform, this.ResourceType];
			}
		},
		{ // System list, satellites
			regex           : /^\/+rhn\/+systems\/+SatelliteList\.do([?#].*)?$/,
			platform        : PLATFORMS.RHN,
			collection      : COLLECTIONS.REGISTERED_SYSTEMS,
			persona         : PERSONAS.CONSUMER,
			resource_type   : "registered-systems-list-satellites",
			get_resource_id : undefined,
			get_page_name   : function () {
				return [this.Platform, this.ResourceType];
			}
		},
		{ // System list, proxies
			regex           : /^\/+rhn\/+systems\/+ProxyList\.do([?#].*)?$/,
			platform        : PLATFORMS.RHN,
			collection      : COLLECTIONS.REGISTERED_SYSTEMS,
			persona         : PERSONAS.CONSUMER,
			resource_type   : "registered-systems-list-proxies",
			get_resource_id : undefined,
			get_page_name   : function () {
				return [this.Platform, this.ResourceType];
			}
		},
		{ // System
			regex           : /^\/+rhn\/+systems\/+details\/+Overview\.do([?#].*)sid=([^&]+)?$/,
			platform        : PLATFORMS.RHN,
			collection      : COLLECTIONS.REGISTERED_SYSTEMS,
			persona         : PERSONAS.CONSUMER,
			resource_type   : "registered-system-overview",
			get_resource_id : function () {
				var system_id = this.params[2];
				return "rhn-system-" + system_id;
			},
			get_page_name   : function () {
				return [this.Platform, this.ResourceType];
			}
		},
		{ // System properties
			regex           : /^\/+rhn\/+systems\/+details\/+Edit\.do([?#].*)sid=([^&]+)?$/,
			platform        : PLATFORMS.RHN,
			collection      : COLLECTIONS.REGISTERED_SYSTEMS,
			persona         : PERSONAS.CONSUMER,
			resource_type   : "registered-system-properties-view",
			get_resource_id : function () {
				var system_id = this.params[2];
				return "rhn-system-" + system_id;
			},
			get_page_name   : function () {
				return [this.Platform, this.ResourceType];
			}
		},
		{ // System connection
			regex           : /^\/+network\/+systems\/+details\/+connection\.pxt([?#].*)sid=([^&]+)?$/,
			platform        : PLATFORMS.RHN,
			collection      : COLLECTIONS.REGISTERED_SYSTEMS,
			persona         : PERSONAS.CONSUMER,
			resource_type   : "registered-system-connection-view",
			get_resource_id : function () {
				var system_id = this.params[2];
				return "rhn-system-" + system_id;
			},
			get_page_name   : function () {
				return [this.Platform, this.ResourceType];
			}
		},
		{ // System proxies
			regex           : /^\/+network\/+systems\/+details\/+proxy\.pxt([?#].*)sid=([^&]+)?$/,
			platform        : PLATFORMS.RHN,
			collection      : COLLECTIONS.REGISTERED_SYSTEMS,
			persona         : PERSONAS.CONSUMER,
			resource_type   : "registered-system-proxies-list",
			get_resource_id : function () {
				var system_id = this.params[2];
				return "rhn-system-" + system_id;
			},
			get_page_name   : function () {
				return [this.Platform, this.ResourceType];
			}
		},
		{ // System satellite
			regex           : /^\/+rhn\/+systems\/+details\/+Satellite\.do([?#].*)sid=([^&]+)?$/,
			platform        : PLATFORMS.RHN,
			collection      : COLLECTIONS.REGISTERED_SYSTEMS,
			persona         : PERSONAS.CONSUMER,
			resource_type   : "registered-system-satellites-list",
			get_resource_id : function () {
				var system_id = this.params[2];
				return "rhn-system-" + system_id;
			},
			get_page_name   : function () {
				return [this.Platform, this.ResourceType];
			}
		},
		{ // System hardware profile
			regex           : /^\/+rhn\/+systems\/+details\/+hardware\.pxt([?#].*)sid=([^&]+)?$/,
			platform        : PLATFORMS.RHN,
			collection      : COLLECTIONS.REGISTERED_SYSTEMS,
			persona         : PERSONAS.CONSUMER,
			resource_type   : "registered-system-hardware-profile",
			get_resource_id : function () {
				var system_id = this.params[2];
				return "rhn-system-" + system_id;
			},
			get_page_name   : function () {
				return [this.Platform, this.ResourceType];
			}
		},
		{ // System notes
			regex           : /^\/+network\/+systems\/+details\/+notes_list\.pxt([?#].*)sid=([^&]+)?$/,
			platform        : PLATFORMS.RHN,
			collection      : COLLECTIONS.REGISTERED_SYSTEMS,
			persona         : PERSONAS.CONSUMER,
			resource_type   : "registered-system-notes",
			get_resource_id : function () {
				var system_id = this.params[2];
				return "rhn-system-" + system_id;
			},
			get_page_name   : function () {
				return [this.Platform, this.ResourceType];
			}
		},
		{ // System relevant packages
			regex           : /^\/+rhn\/+systems\/+details\/+packages\/+Packages\.do([?#].*)sid=([^&]+)?$/,
			platform        : PLATFORMS.RHN,
			collection      : COLLECTIONS.REGISTERED_SYSTEMS,
			persona         : PERSONAS.CONSUMER,
			resource_type   : "registered-system-packages-list",
			get_resource_id : function () {
				var system_id = this.params[2];
				return "rhn-system-" + system_id;
			},
			get_page_name   : function () {
				return [this.Platform, this.ResourceType];
			}
		},
		{ // System relevant errata
			regex           : /^\/+rhn\/+systems\/+details\/+ErrataList\.do([?#].*)sid=([^&]+)?$/,
			platform        : PLATFORMS.RHN,
			collection      : COLLECTIONS.REGISTERED_SYSTEMS,
			persona         : PERSONAS.CONSUMER,
			resource_type   : "registered-system-errata-list",
			get_resource_id : function () {
				var system_id = this.params[2];
				return "rhn-system-" + system_id;
			},
			get_page_name   : function () {
				return [this.Platform, this.ResourceType];
			}
		},
		{ // System relevant channels
			regex           : /^\/+rhn\/+systems\/+details\/+SystemChannels\.do([?#].*)sid=([^&]+)?$/,
			platform        : PLATFORMS.RHN,
			collection      : COLLECTIONS.REGISTERED_SYSTEMS,
			persona         : PERSONAS.CONSUMER,
			resource_type   : "registered-system-channels-list",
			get_resource_id : function () {
				var system_id = this.params[2];
				return "rhn-system-" + system_id;
			},
			get_page_name   : function () {
				return [this.Platform, this.ResourceType];
			}
		},
		{ // System virtual guests
			regex           : /^\/+rhn\/+systems\/+details\/+virtualization\/+VirtualGuestsList\.do([?#].*)sid=([^&]+)?$/,
			platform        : PLATFORMS.RHN,
			collection      : COLLECTIONS.REGISTERED_SYSTEMS,
			persona         : PERSONAS.CONSUMER,
			resource_type   : "registered-system-virtual-guests-list",
			get_resource_id : function () {
				var system_id = this.params[2];
				return "rhn-system-" + system_id;
			},
			get_page_name   : function () {
				return [this.Platform, this.ResourceType];
			}
		},
		{ // System groups
			regex           : /^\/+network\/+systems\/+details\/+admin_group_list\.pxt([?#].*)sid=([^&]+)?$/,
			platform        : PLATFORMS.RHN,
			collection      : COLLECTIONS.REGISTERED_SYSTEMS,
			persona         : PERSONAS.CONSUMER,
			resource_type   : "registered-system-groups-lists",
			get_resource_id : function () {
				var system_id = this.params[2];
				return "rhn-system-" + system_id;
			},
			get_page_name   : function () {
				return [this.Platform, this.ResourceType];
			}
		},
		{ // System pending events
			regex           : /^\/+network\/+systems\/+details\/+history\/+pending\.pxt([?#].*)sid=([^&]+)?$/,
			platform        : PLATFORMS.RHN,
			collection      : COLLECTIONS.REGISTERED_SYSTEMS,
			persona         : PERSONAS.CONSUMER,
			resource_type   : "registered-system-pending-events-list",
			get_resource_id : function () {
				var system_id = this.params[2];
				return "rhn-system-" + system_id;
			},
			get_page_name   : function () {
				return [this.Platform, this.ResourceType];
			}
		},
		{ // System groups list
			regex           : /^\/+rhn\/+systems\/+SystemGroupList\.do([?#].*)?$/,
			platform        : PLATFORMS.RHN,
			collection      : COLLECTIONS.SYSTEM_GROUPS,
			persona         : PERSONAS.CONSUMER,
			resource_type   : "system-groups-list",
			get_resource_id : undefined,
			get_page_name   : function () {
				return [this.Platform, this.ResourceType];
			}
		},
		{ // System group (overview)
			regex           : /^\/+network\/+systems\/+groups\/+details\.pxt([?#].*)sgid=([^&]+)?$/,
			platform        : PLATFORMS.RHN,
			collection      : COLLECTIONS.SYSTEM_GROUPS,
			persona         : PERSONAS.CONSUMER,
			resource_type   : "registered-system-pending-events-list",
			get_resource_id : function () {
				var system_group_id = this.params[2];
				return "rhn-system-group: " + system_group_id;
			},
			get_page_name   : function () {
				return [this.Platform, this.ResourceType];
			}
		},
		{ // System group, systems
			regex           : /^\/+network\/+systems\/+groups\/+system_list\.pxt([?#].*)sgid=([^&]+)?$/,
			platform        : PLATFORMS.RHN,
			collection      : COLLECTIONS.SYSTEM_GROUPS,
			persona         : PERSONAS.CONSUMER,
			resource_type   : "registered-system-systems-list",
			get_resource_id : function () {
				var system_group_id = this.params[2];
				return "rhn-system-group: " + system_group_id;
			},
			get_page_name   : function () {
				return [this.Platform, this.ResourceType];
			}
		},
		{ // System group, target systems
			regex           : /^\/+network\/+systems\/+groups\/+target_system_list\.pxt([?#].*)sgid=([^&]+)?$/,
			platform        : PLATFORMS.RHN,
			collection      : COLLECTIONS.SYSTEM_GROUPS,
			persona         : PERSONAS.CONSUMER,
			resource_type   : "registered-system-target-systems-list",
			get_resource_id : function () {
				var system_group_id = this.params[2];
				return "rhn-system-group: " + system_group_id;
			},
			get_page_name   : function () {
				return [this.Platform, this.ResourceType];
			}
		},
		{ // System group, relevant errata
			regex           : /^\/+network\/+systems\/+groups\/+errata_list\.pxt([?#].*)sgid=([^&]+)?$/,
			platform        : PLATFORMS.RHN,
			collection      : COLLECTIONS.SYSTEM_GROUPS,
			persona         : PERSONAS.CONSUMER,
			resource_type   : "registered-system-errata-list",
			get_resource_id : function () {
				var system_group_id = this.params[2];
				return "rhn-system-group: " + system_group_id;
			},
			get_page_name   : function () {
				return [this.Platform, this.ResourceType];
			}
		},
		{ // System group, admins
			regex           : /^\/+network\/+systems\/+groups\/+admin_list\.pxt([?#].*)sgid=([^&]+)?$/,
			platform        : PLATFORMS.RHN,
			collection      : COLLECTIONS.SYSTEM_GROUPS,
			persona         : PERSONAS.CONSUMER,
			resource_type   : "registered-system-admins-list",
			get_resource_id : function () {
				var system_group_id = this.params[2];
				return "rhn-system-group: " + system_group_id;
			},
			get_page_name   : function () {
				return [this.Platform, this.ResourceType];
			}
		},


		/*********
		 *  CSP  *
		 *********/

		{
			regex           : /^\/+jbossnetwork\/+restricted\/+listSoftware.html([?#].*)?$/,
			platform        : PLATFORMS.CSP,
			collection      : COLLECTIONS.SOFTWARE_DOWNLOADS,
			persona         : PERSONAS.CONSUMER,
			resource_type   : "software-list",
			get_resource_id : undefined,
			get_page_name   : function () {
				return [this.Platform, this.ResourceType];
			}
		},

		{
			regex           : /^\/+jbossnetwork\/+restricted\/+softwareDetail.html\?.*softwareId=([^&]+).*$/,
			platform        : PLATFORMS.CSP,
			collection      : COLLECTIONS.SOFTWARE_DOWNLOADS,
			persona         : PERSONAS.CONSUMER,
			resource_type   : "software-download",
			get_resource_id : function () {
				var download_id = this.params[1];
				return ['csp', 'software', download_id];
			},
			get_page_name   : function () {
				var download_id = this.params[1];
				return [this.Platform, this.ResourceType, download_id];
			}
		},

		/***************
		 *  Certified  *
		 ***************/

		{ // /search/browse/certified-software
			regex           : /^\/+search\/+browse\/+certified-cloud-providers\/*([?#].*)?$/,
			platform        : PLATFORMS.CERTIFICATION,
			collection      : undefined,
			persona         : PERSONAS.CONSUMER,
			resource_type   : "browse-cloud-providers",
			get_resource_id : undefined,
			get_page_name   : function () {
				return [this.Platform, this.ResourceType];
			}
		},
		{ // /search/browse/certified-software
			regex           : /^\/+search\/+browse\/+certified-hardware\/*([?#].*)?$/,
			platform        : PLATFORMS.CERTIFICATION,
			collection      : undefined,
			persona         : PERSONAS.CONSUMER,
			resource_type   : "browse-hardware",
			get_resource_id : undefined,
			get_page_name   : function () {
				return [this.Platform, this.ResourceType];
			}
		},
		{ // /search/browse/certified-software
			regex           : /^\/+search\/+browse\/+certified-software\/*([?#].*)?$/,
			platform        : PLATFORMS.CERTIFICATION,
			collection      : undefined,
			persona         : PERSONAS.CONSUMER,
			resource_type   : "browse-software",
			get_resource_id : undefined,
			get_page_name   : function () {
				return [this.Platform, this.ResourceType];
			}
		},
		{ // /site/ecosystem/
			regex           : /^(\/+site)?\/+ecosystem\/*([?#].*)?$/,
			platform        : PLATFORMS.CERTIFICATION,
			collection      : undefined,
			persona         : PERSONAS.CONSUMER,
			resource_type   : "cert-index",
			get_resource_id : undefined,
			get_page_name   : function () {
				return [this.Platform, this.ResourceType];
			}
		},
		{ // /site/ecosystem/vendors/{NODE_ID}
			regex           : /^(\/+site)?\/+ecosystem\/+vendors\/+(\d+)\/*([?#].*)?$/,
			platform        : PLATFORMS.CERTIFICATION,
			collection      : undefined,
			persona         : PERSONAS.CONSUMER,
			resource_type   : "cert-vendor",
			get_resource_id : function () {
				var node_id = this.params[2];
				return ['certification', node_id];
			},
			get_page_name   : function () {
				var node_id = this.params[2];
				return [this.Platform, this.ResourceType, node_id];
			}
		},
		{ // /site/ecosystem/hardware
			regex           : /^(\/+site)?\/+ecosystem\/+hardware\/*([?#].*)?$/,
			platform        : PLATFORMS.CERTIFICATION,
			collection      : undefined,
			persona         : PERSONAS.CONSUMER,
			resource_type   : "cert-hw-landing",
			get_resource_id : undefined,
			get_page_name   : function () {
				return [this.Platform, this.ResourceType];
			}
		},
		{ // /site/ecosystem/hardware/browse
			regex           : /^(\/+site)?\/+ecosystem\/+hardware\/browse\/*([?#].*)?$/,
			platform        : PLATFORMS.CERTIFICATION,
			collection      : undefined,
			persona         : PERSONAS.CONSUMER,
			resource_type   : "cert-hw-list",
			get_resource_id : undefined,
			get_page_name   : function () {
				return [this.Platform, this.ResourceType];
			}
		},
		{ // /site/ecosystem/hardware/{NODE_ID}
			regex           : /^(\/+site)?\/+ecosystem\/+hardware\/+(\d+)\/*([?#].*)?$/,
			platform        : PLATFORMS.CERTIFICATION,
			collection      : undefined,
			persona         : PERSONAS.CONSUMER,
			resource_type   : "certified-hardware-view",
			get_resource_id : function () {
				var node_id = this.params[2];
				return ['certification', node_id];
			},
			get_page_name   : function () {
				var node_id = this.params[2];
				return [this.Platform, this.ResourceType, node_id];
			}
		},
		{ // /site/ecosystem/software
			regex           : /^(\/+site)?\/+ecosystem\/+software\/*([?#].*)?$/,
			platform        : PLATFORMS.CERTIFICATION,
			collection      : undefined,
			persona         : PERSONAS.CONSUMER,
			resource_type   : "cert-sw-landing",
			get_resource_id : undefined,
			get_page_name   : function () {
				return [this.Platform, this.ResourceType];
			}
		},
		{ // /site/ecosystem/software/browse
			regex           : /^(\/+site)?\/+ecosystem\/+software\/browse\/*([?#].*)?$/,
			platform        : PLATFORMS.CERTIFICATION,
			collection      : undefined,
			persona         : PERSONAS.CONSUMER,
			resource_type   : "cert-sw-list",
			get_resource_id : undefined,
			get_page_name   : function () {
				return [this.Platform, this.ResourceType];
			}
		},
		{ // /site/ecosystem/software/{NODE_ID}
			regex           : /^(\/+site)?\/+ecosystem\/+software\/+(\d+)\/*([?#].*)?$/,
			platform        : PLATFORMS.CERTIFICATION,
			collection      : undefined,
			persona         : PERSONAS.CONSUMER,
			resource_type   : "certified-software-view",
			get_resource_id : function () {
				var node_id = this.params[2];
				return ['certification', node_id];
			},
			get_page_name   : function () {
				var node_id = this.params[2];
				return [this.Platform, this.ResourceType, node_id];
			}
		},
		{ // /site/ecosystem/cloud-provider/{NODE_ID}
			regex           : /^(\/+site)?\/+ecosystem\/+cloud-provider\/+(\d+)\/*([?#].*)?$/,
			platform        : PLATFORMS.CERTIFICATION,
			collection      : undefined,
			persona         : PERSONAS.CONSUMER,
			resource_type   : "certified-cloud-provider-view",
			get_resource_id : function () {
				var node_id = this.params[2];
				return ['certification', node_id];
			},
			get_page_name   : function () {
				var node_id = this.params[2];
				return [this.Platform, this.ResourceType, node_id];
			}
		},
		{ // /site/ecosystem/cloud
			regex           : /^(\/+site)?\/+ecosystem\/+cloud\/*([?#].*)?$/,
			platform        : PLATFORMS.CERTIFICATION,
			collection      : undefined,
			persona         : PERSONAS.CONSUMER,
			resource_type   : "cert-cloud-landing",
			get_resource_id : undefined,
			get_page_name   : function () {
				return [this.Platform, this.ResourceType];
			}
		},
		{ // /site/ecosystem/cloud/browse
			regex           : /^(\/+site)?\/+ecosystem\/+cloud\/browse\/*([?#].*)?$/,
			platform        : PLATFORMS.CERTIFICATION,
			collection      : undefined,
			persona         : PERSONAS.CONSUMER,
			resource_type   : "cert-cloud-list",
			get_resource_id : undefined,
			get_page_name   : function () {
				return [this.Platform, this.ResourceType];
			}
		},
		{ // /site/ecosystem/cloud/{NODE_ID}
			regex           : /^(\/+site)?\/+ecosystem\/+cloud\/+(\d+)\/*([?#].*)?$/,
			platform        : PLATFORMS.CERTIFICATION,
			collection      : undefined,
			persona         : PERSONAS.CONSUMER,
			resource_type   : "cert-cloud",
			get_resource_id : function () {
				var node_id = this.params[2];
				return ['certification', node_id];
			},
			get_page_name   : function () {
				var node_id = this.params[2];
				return [this.Platform, this.ResourceType, node_id];
			}
		},

		/*********
		 *  CVE  *
		 *********/

		{
			regex           : /^\/+security\/+cve\/+(CVE-[^\/?#]*)\/*.*/,
			platform        : PLATFORMS.CVE,
			collection      : COLLECTIONS.CVE,
			persona         : PERSONAS.CONSUMER,
			resource_type   : "cve-view",
			get_resource_id : function () {
				var cve_name = this.params[1];
				return cve_name;
			},
			get_page_name   : function () {
				var cve_name = this.params[1];
				return [this.Platform, this.ResourceType, cve_name];
			}
		},

		{
			regex           : /^\/+security\/+cve\/*.*/,
			platform        : PLATFORMS.CVE,
			collection      : COLLECTIONS.CVE,
			persona         : PERSONAS.CONSUMER,
			resource_type   : "cve-list",
			get_resource_id : undefined,
			get_page_name   : function () {
				return [this.Platform, this.ResourceType];
			}
		},

		/*****************************
		 *  Subscription management  *
		 *****************************/

		{
			regex           : /^\/+subscriptions\/+activate\/+protected\/+activate\.html([?#].*)?$/,
			platform        : PLATFORMS.SUBSCRIPTIONS,
			collection      : undefined,
			persona         : PERSONAS.CONSUMER,
			resource_type   : "sub-activation",
			get_resource_id : undefined,
			get_page_name   : function () {
				return [this.Platform, this.ResourceType];
			}
		},

		{
			regex           : /^\/+subscriptions\/+rhntransition\/*([?#].*)?$/,
			platform        : PLATFORMS.SUBSCRIPTIONS,
			collection      : undefined,
			persona         : PERSONAS.CONSUMER,
			resource_type   : "rhn-transition",
			get_resource_id : undefined,
			get_page_name   : function () {
				return [this.Platform, this.ResourceType];
			}
		},

		{
			regex           : /^\/+management\/+subscriptions\/+(\d+)\/*([?#].*)?$/,
			platform        : PLATFORMS.SUBSCRIPTIONS,
			collection      : undefined,
			persona         : undefined,
			resource_type   : "sub-view",
			get_resource_id : undefined,
			get_page_name   : function () {
				return [this.Platform, this.ResourceType];
			}
		},

		{
			regex           : /^\/+management\/+subscriptions\/*([^\/+]*)([?#](active|expiring|expired|all))?$/,
			platform        : PLATFORMS.SUBSCRIPTIONS,
			collection      : undefined,
			persona         : undefined,
			resource_type   : "sub-list",
			get_resource_id : undefined,
			get_page_name   : function () {
				return [this.Platform, this.ResourceType];
			}
		},

		{
			regex           : /^\/+management\/+subscription-management\/*([?#].*)?$/,
			platform        : PLATFORMS.SUBSCRIPTIONS,
			collection      : undefined,
			persona         : undefined,
			resource_type   : "sub-mgmt",
			get_resource_id : undefined,
			get_page_name   : function () {
				return [this.Platform, this.ResourceType];
			}
		},

		{
			regex           : /^\/+management\/+consumers\/+register\/*([?#].*)?$/,
			platform        : PLATFORMS.SUBSCRIPTIONS,
			collection      : undefined,
			persona         : undefined,
			resource_type   : "unit-register",
			get_resource_id : undefined,
			get_page_name   : function () {
				return [this.Platform, this.ResourceType];
			}
		},

		{ //                                                {    UUID     }
			regex           : /^\/+management\/+consumers\/+([A-Fa-f0-9-]+)\/*([?#].*)?$/,
			platform        : PLATFORMS.SUBSCRIPTIONS,
			collection      : undefined,
			persona         : undefined,
			resource_type   : "unit-view",
			get_resource_id : undefined,
			get_page_name   : function () {
				return [this.Platform, this.ResourceType];
			}
		},

		{
			regex           : /^\/+management\/+consumers\/*([?#].*)?$/,
			platform        : PLATFORMS.SUBSCRIPTIONS,
			collection      : undefined,
			persona         : undefined,
			resource_type   : "unit-list",
			get_resource_id : undefined,
			get_page_name   : function () {
				return [this.Platform, this.ResourceType];
			}
		},

		{ // /management/consumer/consumers/create/system
			regex           : /^\/+management\/+consumer\/+consumers\/+create\/+([^\/]+)\/*([?#].*)?$/,
			platform        : PLATFORMS.SUBSCRIPTIONS,
			collection      : undefined,
			persona         : undefined,
			resource_type   : "unit-register",
			get_resource_id : undefined,
			get_page_name   : function () {
				var unit_type = this.params[1];
				return [this.Platform, this.ResourceType, unit_type];
			}
		},

		{
			regex           : /^\/+management\/+distributors\/+register\/*([?#].*)?$/,
			platform        : PLATFORMS.SUBSCRIPTIONS,
			collection      : undefined,
			persona         : undefined,
			resource_type   : "app-register",
			get_resource_id : undefined,
			get_page_name   : function () {
				return [this.Platform, this.ResourceType];
			}
		},


		{ // /management/distributors
			regex           : /^\/+management\/+distributors\/*([?#].*)?$/,
			platform        : PLATFORMS.SUBSCRIPTIONS,
			collection      : undefined,
			persona         : undefined,
			resource_type   : "app-list",
			get_resource_id : undefined,
			get_page_name   : function () {
				return [this.Platform, this.ResourceType];
			}
		},

		{ //                                                {    UUID     }
			regex           : /^\/+management\/+distributors\/+([A-Fa-f0-9-]+)\/*([?#].*)?$/,
			platform        : PLATFORMS.SUBSCRIPTIONS,
			collection      : undefined,
			persona         : undefined,
			resource_type   : "app-view",
			get_resource_id : undefined,
			get_page_name   : function () {
				return [this.Platform, this.ResourceType];
			}
		},

		{ // /management/consumer/consumers/create/system
			regex           : /^\/+management\/+distributor\/+distributors\/+create\/+([^\/]+)\/*([?#].*)?$/,
			platform        : PLATFORMS.SUBSCRIPTIONS,
			collection      : undefined,
			persona         : undefined,
			resource_type   : "app-register",
			get_resource_id : undefined,
			get_page_name   : function () {
				var app_type = this.params[1];
				return [this.Platform, this.ResourceType, app_type];
			}
		},

		{
			regex           : /^\/+management\/+utilization\/*([?#].*)?$/,
			platform        : PLATFORMS.SUBSCRIPTIONS,
			collection      : undefined,
			persona         : undefined,
			resource_type   : "sub-utilization",
			get_resource_id : undefined,
			get_page_name   : function () {
				return [this.Platform, this.ResourceType];
			}
		},

		{
			regex           : /^\/+management\/+overconsumption\/*([?#].*)?$/,
			platform        : PLATFORMS.SUBSCRIPTIONS,
			collection      : undefined,
			persona         : undefined,
			resource_type   : "sub-overconsumption",
			get_resource_id : undefined,
			get_page_name   : function () {
				return [this.Platform, this.ResourceType];
			}
		},

		{
			regex           : /^\/+management\/*([^\/+]*)([?#].*)?$/,
			platform        : PLATFORMS.SUBSCRIPTIONS,
			collection      : undefined,
			persona         : undefined,
			resource_type   : "sub-overview",
			get_resource_id : undefined,
			get_page_name   : function () {
				return [this.Platform, this.ResourceType];
			}
		},


		/********
		 * Labs *
		 ********/
		{
			regex           : /^\/labs\/.*/,
			platform        : PLATFORMS.LABS,
			collection      : undefined,
			persona         : PERSONAS.CONSUMER,
			resource_type   : function () {
				var app_name = window.location.pathname.match(/\/labs\/(.*?)\//);
				if (app_name !== null) {
					if (app_name.length >= 2) {
						return app_name[1];
					}
				}
				return "labs-landing-page";
			},
			get_resource_id : undefined,
			get_page_name   : function () {
				if (window.location.pathname.match(/^\/labs\/[a-zA-Z0-9].*/) !== null) {
					window.require('analytics/main').trigger("LabsBegin");
				}
				return [this.Platform, this.ResourceType(), doc_title];
			}
		},


		/********************************
		 *  Catch-all default pageName  *
		 ********************************/

		{
			regex           : /.*/,
			platform        : undefined,
			collection      : undefined,
			persona         : undefined,
			resource_type   : undefined,
			get_resource_id : undefined,
			get_page_name   : function () {
				return ['undefined'];
			}
		}
	];

	return {
		url_definitions : url_definitions
	};

});
