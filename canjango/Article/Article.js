/**
 * Manage UI interactions related to ARTICLE
 *
 * @namespace UIArticle
 * based on lungo by tapquo
 * @author Nathan Sasto || @untrueaxioms
 */

 
steal(
	//jquery
	'can/control'
)
.then(function($)	{
	can.Control('UI.Article',{
		'init': function( element ){
			var self = this;			
			
			var Constants = new UI.Constants();
			
			this.CLASS = Constants.CLASS;
			this.ELEMENT = Constants.ELEMENT;
			this.ATTRIBUTE = Constants.ATTRIBUTE;
			this.Cache = {};
			this.SELECTORS = {
				NAVIGATION_ITEM: 'a[href][data-router="article"]',
				REFERENCE_LINK: ' a[href][data-article]',
				TITLE_OF_ARTICLE: 'header .title, footer .title',
				ASIDE_REFERENCE_LIST: 'li a.active, li.active'
			};
		}, 				//init	
		/**
		 *
		 * @method show
		 */
		'title' : function(value) {
			if (value) {
				lng.Element.Cache.section.find(SELECTORS.TITLE_OF_ARTICLE).text(value);
			}
		},

		'switchNavItems' : function(article_id, cache) {
			this.Cache = cache;
			this.Cache.section.find(this.SELECTORS.NAVIGATION_ITEM).removeClass(this.CLASS.ACTIVE);

			var active_nav_items = 'a[href="' + article_id + '"][data-router="article"]';
			this.Cache.section.find(active_nav_items).addClass(this.CLASS.ACTIVE);

			if (this.Cache.aside) {
				aside = this.Cache.aside;

				aside.find(this.SELECTORS.ASIDE_REFERENCE_LIST).removeClass(this.CLASS.ACTIVE);
				aside.find(active_nav_items).addClass(this.CLASS.ACTIVE).parent().addClass(this.CLASS.ACTIVE);
			}
		},

		'switchReferenceItems' : function(article_id, section) {
			var reference = "[data-article=" + article_id.replace('#', '') + "]";
			section.find(this.SELECTORS.REFERENCE_LINK).hide().siblings(reference).show();
		}
	})	
});			// steal then

