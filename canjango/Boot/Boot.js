
steal(
	//jquery
	'can/control',
	'canjango/Constants',
	'canjango/History',
	'canjango/Aside',
	'canjango/Article',
	'canjango/Notifications'
	)
.then(
	'can/route'	
)
.then(function($){
	can.Control('UI.Boot',{
	 pluginName: 'UI',
		defaults :{
			CacheId : {
				section: '#home',
				article: "#map",
				aside: '',
				navigation: ''
			}
		}//defaults
	}, 
	{
		'init': function( element , options ){
			var self = this;
			
			//Create new History construct
			this.History = new UI.History();
			this.History.add(this.options.CacheId.section);

			this.Cache = {
				section 	:  this.element.find(this.options.CacheId.section),
				article		:  this.element.find(this.options.CacheId.article),
				aside		:  '',
				navigation	: ''
			};
			
			var Constants = new UI.Constants();
			this.CLASS = Constants.CLASS;
			this.ELEMENT = Constants.ELEMENT;
			this.ERROR = Constants.ERROR;
			this.TRIGGER = Constants.TRIGGER;
			this.ATTRIBUTE = Constants.ATTRIBUTE;
			this.HASHTAG_CHARACTER = Constants.Hashtag_Character;
			this.TRANSITION = Constants.TRANSITION;
			
			steal.dev.log('UI: Init Aside Control -> ui.aside');
			steal.dev.log('UI: Init Article Control -> ui.article');
			//steal.dev.log('UI: Init Notifications Control -> ui.notifications');
			
			this.ui = {
				description: 'CanJango Boot Variable',
				aside : new UI.Aside(this.element),
				article : new UI.Article(this.element)//,
				//notifications : new UI.Notifications(this.element)
			};
			
			
			window.location.hash = '';
			steal.dev.log('UI: Init');
			// empty the hash
			
			steal.dev.log('UI: Init routing');
			// set up router binding
			//can.route(":target");

		}, 				//init
		'_goAside' : function(element) {
			var section_id = this.History.current();
			var aside_id = element.attr(this.ATTRIBUTE.HREF);
			this.ui.aside.toggle(aside_id, this.Cache);
		},
		'_goMenu' : function(id) {
			lng.dom("[data-control=menu]" + id).toggleClass(CLASS.SHOW);
		},			//_goMenu
		'{can.route} target': function( route, ev, newVal, oldVal ) {
			//no routing functionality at the moment
		},				//route
		
		/*Bind clicks to appropriate events */
		
		'header a[href][data-router=aside] click' : function(el,ev){
			ev.preventDefault();
			steal.dev.log('UI: Click "header a[href][data-router=aside]" -> Aside');
			//this.ui.aside.hide();
		},
		'aside a[href][data-router] click' : function(el,ev){
			ev.preventDefault();
			steal.dev.log('UI: Click "aside a[href][data-router]" -> Target from Aside');
			this.ui.aside.hide();
		},
		/* Open Target */
		'a[href][data-router], li[href][data-router] click' : function(el,ev){
			ev.preventDefault();
			
			steal.dev.log('UI: Click "a[href][data-router]" -> Target');
			var target_type = el.data(this.ATTRIBUTE.ROUTER);
			var target_id = el.attr(this.ATTRIBUTE.HREF);
			
			steal.dev.log('UI: Click. target_type:',target_type.toUpperCase(),',target_id:',target_id);

			switch(target_type) {
				case this.ELEMENT.SECTION:
					this._goSection(target_id);
					break;

				case this.ELEMENT.ARTICLE:
					this._goArticle(el);
					break;

				case this.ELEMENT.ASIDE:
					this._goAside(el);
					break;

				case this.ELEMENT.MENU:
					this._goMenu(target_id);
					break;
			} //switch
		},
		'[data-control=menu] a[href] click' : function(el,ev){
			steal.dev.log('UI: Click "[data-control=menu] a[href]"-> Data control from menu');
		},
		/**
		 * Displays the <article> in a particular <section>.
		 *
		 **/
		'_goArticle' : function(element) {		

			var section_id = this.History.current();
			var article_id;
			if (typeof(element) == 'object') {
				article_id =  element.attr(this.ATTRIBUTE.HREF);
			} 
			else {
				article_id = element;
			}

			var current =  this.Cache.article;	
			
			if (this._notCurrentTarget(article_id, current)) {
				this._goSection(section_id);
				var target = this.Cache.section.find(this.ELEMENT.ARTICLE + article_id);
								
				if (target.length > 0) {
					if (this._sectionId(current) !== this._sectionId(target)) {
						current = this.Cache.section.children(this.ELEMENT.ARTICLE);
					}

					current.removeClass(this.CLASS.ACTIVE).trigger(this.TRIGGER.UNLOAD);
					target.addClass(this.CLASS.ACTIVE).trigger(this.TRIGGER.LOAD);

					this.Cache.article = target;

					//:TODO make this work
					this.ui.article.switchNavItems(article_id, this.Cache);
					this.ui.article.switchReferenceItems(article_id, this.Cache.section);

					if ((element) && (typeof(element) == 'object')) this.ui.article.title(element.data(this.ATTRIBUTE.TITLE));
				}
			}				
		},				//_goArticle
		/**
		 * Displays the <section> specified
		 *
		 * @param {string} <section> Id
		 */
		 '_goSection' : function(section_id) {
			if (section_id === '#back') {
				this.back();
			} else {
				/* if it's not back, transition to target section */
				var current =  this.Cache.section;
				
				if (this._notCurrentTarget(section_id, current)) {
					var target =jQuery(current).siblings(this.ELEMENT.SECTION + section_id);
					
					if (target.length > 0) {
						target_transition = target.data('transition');
						if (target_transition) {
							this._assignTransitionOrigin(current);
							this._assignTransition(current, target_transition);
						}
						
						this.element.find(current).removeClass(this.CLASS.SHOW).addClass(this.CLASS.HIDE);
						target.removeClass(this.CLASS.HIDE).addClass(this.CLASS.SHOW);
						this.Cache.section = target;
						this.article = target.find(this.ELEMENT.ARTICLE + '.' + this.CLASS.ACTIVE);

						this.History.add(section_id);
						this._sectionTriggers(current, target);
					}
				}
			}			//else
		},				//_goSection
		/**
		 * Return to previous section.
		 *
		 * @method back
		 */
		'back' : function() {
			var current = this.Cache.section;
			var self=this;
			
			if (this.Cache.aside) {
				//this.ui.aside.hide();
				setTimeout(function() {
					self._back(current);
				}, self.TRANSITION.DURATION);
			} else {
				self._back(current);
			}
		},
		'_back' : function(current) {
			var self=this;
			current.removeClass(this.CLASS.SHOW).addClass(this.CLASS.HIDING);
			setTimeout(function() {
				current.removeClass(self.CLASS.HIDING);
			}, self.TRANSITION.DURATION);
			
			this.History.removeLast();
			target = current.siblings(this.ELEMENT.SECTION + this.History.current());
			
			this._assignTransition(target, target.data('transition-origin'));
			target.removeClass(this.CLASS.HIDE).addClass(this.CLASS.SHOW);
			this.Cache.section = target;
			this.Cache.article = target.find(this.ELEMENT.ARTICLE + "." + this.CLASS.ACTIVE);

			this._sectionTriggers(current, target);
		},
		'_notCurrentTarget' : function(target, ref) {
			var element = jQuery(ref);//this.element.find(ref);
			return (target !== this.HASHTAG_CHARACTER + element.attr('id')) ? true : false;
		},
		'_sectionId' : function(el) {
			return el.closest('section').attr('id');
		},
		'_articleId' : function(el) {
			return el.closest('article').attr('id');
		},
		'_sectionTriggers' : function(current, target) {
			this.element.find(current).trigger(this.TRIGGER.UNLOAD);
			this.element.find(target).trigger(this.TRIGGER.LOAD);
		},
		'_assignTransition' : function(section, transitionName) {
			var section_el = this.element.find(section);
			section_el.data('transition', transitionName);
		},
		'_assignTransitionOrigin' : function(section) {
			var section_el = this.element.find(section);
			section_el.data('transition-origin', section_el.data('transition'));
		}
	})					//can.Control
});						//steal .,then

