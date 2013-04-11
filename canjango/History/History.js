
steal(
	//jquery
	'can/construct'
)
.then(function($){
	can.Construct('UI.History',{
		'init'	:	function(){
			steal.dev.log('History Construct: Init');
			this._history = [];
		},
		/**
		* Create a new element to the browsing history based on the current section id.
		*
		* @method add
		* @param  {string}  section element
		*/
		'add' : function(section_el) {
		 if (section_el !== this.current()) {
			 this._history.push(section_el);
		 }
		},
		/**
		* Returns the current browsing history section id.
		*
		* @method current
		* @return {element} Current section element
		*/
		'current' : function() {
		 return this._history[this._history.length - 1];
		},
		/**
		* Removes the current item browsing history.
		*
		* @method removeLast
		*/
		'removeLast' : function() {
		 this._history.length -= 1;
		}
	});
});						//steal .,then