/**
 * Manage UI interactions related to ASIDE
 *
 * @namespace UI.Aside
 * based on lungo by tapquo
 * @author Nathan Sasto || @untrueaxioms
 */

 
steal(
	//jquery
	'can/control'
)
.then(function($)	{
	can.Control('UI.Aside',{
		'init': function( element ){
			var self = this;			
			
			var Constants = new UI.Constants();
			
			this.CLASS = Constants.CLASS;
			this.ELEMENT = Constants.ELEMENT;
			this.ATTRIBUTE = Constants.ATTRIBUTE;
			this.TRANSITION = Constants.TRANSITION;
			this.Cache = {};
		}, 				//init	
		/**
		 * Toggle an aside element
		 *
		 * @method toggle
		 *
		 * @param  {string} Aside id
		 */
		'toggle' : function(aside_id, cache) {
			this.Cache = cache;
			var aside = this._findAside(aside_id);
			if (aside) {
				var is_visible = aside.hasClass(this.CLASS.SHOW);
				if (is_visible) {
					this.hide(aside);
				} else {
					this.show(aside);
				}
			}
			aside = null;
		},
		/**
		 * Display an aside element with a particular <section>
		 *
		 * @method show
		 * @param  {string} Aside id
		 */
		'show' : function(aside) {

			if (typeof aside == 'string') aside = _findAside(aside);
			
			if (aside) {
				this.Cache.aside = aside;
				var aside_stylesheet = this._asideStylesheet(aside);

				aside.addClass(this.CLASS.SHOW);
				
				var cache_section = this.element.find(this.Cache.section);
				cache_section.addClass(aside_stylesheet).addClass(this.CLASS.ASIDE);
			}

			aside = null;
		},
		/**
		 * Hide an aside element with a particular section
		 *
		 * @method hide
		 */
		'hide' : function(target) {
			var self=this;
			var aside = target || this.Cache.aside;
			if (aside) {
				var cache_section = this.element.find(this.Cache.section)
				cache_section.removeClass(this.CLASS.ASIDE).removeClass(this.CLASS.RIGHT).removeClass(this.CLASS.SMALL);
				
				var aside_stylesheet = this._asideStylesheet(aside);
				
				if (aside_stylesheet) {				
					(this.Cache.section).removeClass(aside_stylesheet);
				}

				setTimeout(function() {
					self.Cache.aside = null;
					aside.removeClass(self.CLASS.SHOW);
				}, self.TRANSITION.DURATION);
			}
		},
		'_findAside' : function(aside_id) {
			var aside = null;
			var asides = this.element.find(this.ELEMENT.ASIDE);

			if (asides.length == 1) {
				var current_id = '#' + asides[0].id ;
				if (current_id == aside_id) {
					aside = this.element.find(asides[0]);
				}
			}
			else if (asides.length > 1) {
				aside = asides.siblings(this.ELEMENT.ASIDE + aside_id);
			}
			return aside;
		},
		'_asideStylesheet' : function(aside) {
			var aside_stylesheet = aside.attr(this.ATTRIBUTE.CLASS);
			var classes = '';
			//@todo: Refactor
			if (aside_stylesheet) {
				classes += (aside_stylesheet.indexOf(this.CLASS.RIGHT) > -1) ? this.CLASS.RIGHT + ' ': '';
				classes += (aside_stylesheet.indexOf(this.CLASS.SMALL) > -1) ? this.CLASS.SMALL + ' ': '';
			}
			return classes;
		}
	});
});			// steal then

// todo 'suscribeEvents' : function(hrefs) {
