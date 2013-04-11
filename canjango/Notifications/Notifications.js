/**
 * Notification system in CSS3
 *
 * @namespace UI
 * @class Notifications
 *
 * based on lungo by tapquo
 * @author Nathan Sasto || @untrueaxioms
 */

 
steal(
	//jquery
	'can/control'
)
.then(function($)	{
	can.Control('UI.Notifications',{
		defaults : {pluginName : 'ui_notifications'}
	},
	{
		'init': function( element ){
			
			this._options = [];
			this._window = null;

			var self = this;			
			
			var Constants = new UI.Constants();
			
			this.DELAY_TIME = 1;
			this.ANIMATION_MILISECONDS = 200;
			this.ATTRIBUTE = Constants.ATTRIBUTE;
			this.BINDING = Constants.BINDING;
			this.loading = {
				selector: '*',
				html: '<div class="loading {{value}}">\
							<span class="top"></span>\
							<span class="right"></span>\
							<span class="bottom"></span>\
							<span class="left"></span>\
						</div>'
			}
			
			this.SELECTOR = {
				BODY: 'body',
				NOTIFICATION: '.notification',
				MODAL: '.notification .window',
				MODAL_HREF: '.notification .window a',
				WINDOW_CLOSABLE: '.notification [data-action=close], .notification > .error, .notification > .success',
				CONFIRM_BUTTONS: '.notification .confirm a.button'
			};

			this.STYLE = {
				MODAL: 'modal',
				VISIBLE: 'visible',
				SHOW: 'show',
				WORKING: 'working',
				INPUT: 'input'
			};


			this.MARKUP_NOTIFICATION = '<div class="notification"><div class="window"></div></div>';
			
			this.element.html(this.MARKUP_NOTIFICATION);
			this._el = this.element.find(this.SELECTOR.NOTIFICATION);
			this._window = this._el.children('.window');
			this.CALLBACK_HIDE = this.hide();
			this._el.find(this.SELECTOR.WINDOW_CLOSABLE).click( 'hide');

		}, 				//init	
		'show' : function(title, icon, seconds, callback) {
			
			var markup;
			if (title !== undefined) {
				markup = this._markup(title, null, icon);
			} else {
				var data_loading = this.loading.html;
				markup = data_loading.replace(this.BINDING.START + this.BINDING.KEY + this.BINDING.END, 'icon white');

			}
			this._el.html(markup);
			this._show(markup, 'growl');
			this._hide(seconds, callback);
		},
		'hide' : function() {
			var self=this;
			
			this._window.removeClass('show');
			setTimeout(function() {
				self._el.css('display', 'none').removeClass('html').removeClass('confirm').removeClass('notify').removeClass('growl');
			}, self.ANIMATION_MILISECONDS - 50);
		},	
		'confirm' : function(options) {
			this._options = options;
			var markup = this._markup(options.title, options.description, options.icon);
			markup += this._button_markup(options.accept, 'accept');
			markup += this._button_markup(options.cancel, 'cancel');
			
			this.element.html(this.MARKUP_NOTIFICATION);
			this._el = this.element.find(this.SELECTOR.NOTIFICATION);
			this._window = this._el.children('.window');
			
			this._show(markup, 'confirm');
		},
	   'success' : function(title, description, icon, seconds, callback) {
			this._notify(title, description, icon, 'success rounded', seconds, callback);
		},
		'error' : function(title, description, icon, seconds, callback) {
			this._notify(title, description, icon, 'error  rounded', seconds, callback);
		},
		'_notify' : function(title, description, icon, stylesheet, seconds, callback) {
			this.element.html(this.MARKUP_NOTIFICATION);
			this._el = this.element.find(this.SELECTOR.NOTIFICATION);
			this._window = this._el.children('.window');
			
			this._show(this._markup(title, description, icon), stylesheet);
			if (seconds) {
				this._hide(seconds, callback);
			}
		},		
		'html' : function(markup, button) {
			markup += (button) ? '<a href="#" class="button large anchor" data-action="close">' + button + '</a>' : '';
			this._show(markup, 'html');
		},
		'_show' : function(html, stylesheet) {
			var self=this;
			
			this._el.show();
			this._window.removeClass(this.STYLE.SHOW);
			this._window.removeClass('error').removeClass('success').removeClass('html').removeClass('growl');
			this._window.addClass(stylesheet);
			this._window.html(html);

			setTimeout(function() {
				self._window.addClass(self.STYLE.SHOW);
			}, this.DELAY_TIME);
		},
		'_hide' : function(seconds, callback) {
			var self=this;
			if (seconds !== undefined && seconds !== 0) {
				var miliseconds = seconds * 1000;
				setTimeout(function() {
					self.hide();
					// if (callback) callback.apply(callback);
					if (callback) setTimeout(callback, self.ANIMATION_MILISECONDS);

				}, miliseconds);
			}
		},
		'_markup' : function(title, description, icon) {
			description = !description ? "&nbsp;" : description;
			return '<span class="icon ' + icon + '"></span><strong class="text bold">' + title + '</strong><small>' + description + '</small>';
		},
		'_button_markup' : function(options, callback) {
			return '<a href="#" data-callback="' + callback + '" class="button anchor large text thin">' + options.label + '</a>';
		},
		/*
		subscribe Events
		*/

		 'a.button click'  : function(event) {
				var button = this._el.find(event[0]);
				var callback = this._options[button.data('callback')].callback;
				if (callback) callback.call(callback);
				this.hide();
		}
	});
});			// steal then
