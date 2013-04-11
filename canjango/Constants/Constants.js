
steal(
	//jquery
	'can/construct'
)
.then(function($){
	can.Construct('UI.Constants',{
		'init'	:	function(){
			steal.dev.log('App Constants Init');
		},
		Hashtag_Character : '#',

		ELEMENT: {
			SECTION:		'section',
			ARTICLE:		'article',
			ASIDE:			'aside',
			MENU:				'menu',
			BODY:			'body',
			DIV:					'div',
			LIST:				'<ul></ul>',
			LI:					'li'
		},

		QUERY: {
			LIST_IN_ELEMENT: 'article.list, aside.list',
			ELEMENT_SCROLLABLE: 'aside.scroll, article.scroll'
		},

		CLASS: {
			ACTIVE:				'active',
			ASIDE:				'aside',
			SHOW:				'show',
			HIDE:					'hide',
			HIDING:				'hiding',
			RIGHT:				'right',
			LEFT:					'left',
			HORIZONTAL:	'horizontal',
			SMALL:				'small'
		},

		TRIGGER: {
			LOAD:			'load',
			UNLOAD:	'unload'
		},

		TRANSITION: {
			DURATION: 300
		},

		ATTRIBUTE: {
			ID:				'id',
			HREF:			'href',
			TITLE:			'title',
			ARTICLE:	'article',
			CLASS:		'class',
			WIDTH:		'width',
			HEIGHT:		'height',
			PIXEL:			'px',
			PERCENT:	'%',
			ROUTER:	'router',
			FIRST:		'first',
			LAST:			'last',
			EMPTY:		''
		},

		BINDING: {
			START: 			'{{',
			END: 				'}}',
			KEY: 				'value',
			SELECTOR: 	'{{value}}'
		},

		ERROR: {
			DATABASE: 'ERROR: Connecting to Data.Sql.',
			DATABASE_TRANSACTION: 'ERROR: Data.Sql >> ',
			ROUTER: 'ERROR: The target does not exists >>',
			LOADING_RESOURCE: 'ERROR: Loading resource: '
		}
	
	});
});						//steal .,then