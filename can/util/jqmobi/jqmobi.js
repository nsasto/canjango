steal('jqmobi', 'can/util/can.js', 'can/util/array/each.js', function($,can) {
	
	// _jQuery node list._
	$ = jq;
	
	console.log('$',$,'can',can);

	//Add required jq functions from JQuery;
	
	$.makeArray = function( arr, results ) {
		var type,
			ret = results || [];

		if ( arr != null ) {
			// The window, strings (and functions) also have 'length'
			// Tweaked logic slightly to handle Blackberry 4.7 RegExp issues #6930
			type = jq.type( arr );

			if ( arr.length == null || type === "string" || type === "function" || type === "regexp" || jq.isWindow( arr ) ) {
				core_push.call( ret, arr );
			} else {
				jq.merge( ret, arr );
			}
		}

		return ret;
	};
	// [[Class]] -> type pairs
		class2type = {};
	// Save a reference to some core methods
		core_push = Array.prototype.push;
		core_slice = Array.prototype.slice;
		core_indexOf = Array.prototype.indexOf;
		core_toString = Object.prototype.toString;
		core_hasOwn = Object.prototype.hasOwnProperty;
		core_trim = String.prototype.trim
		
	$.type = function( obj ) {
		return obj == null ?
			String( obj ) :
			class2type[ core_toString.call(obj) ] || "object";
	}
	
	$.isWindow = function( obj ) {
			return obj != null && obj == obj.window;
	},
		
	$.merge = function( first, second ) {
		var l = second.length,
			i = first.length,
			j = 0;

		if ( typeof l === "number" ) {
			for ( ; j < l; j++ ) {
				first[ i++ ] = second[ j ];
			}

		} else {
			while ( second[j] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	}
	//extend can
	
	$.extend( can, $, {
		trigger: function( obj, event, args ) {
			if ( obj.trigger ) {
				obj.trigger( event, args );
			} else {
				$.event.trigger( event, args, obj, true );
			}
		},
		addEvent: function(ev, cb){
			$([this]).bind(ev, cb);
			return this;
		},
		removeEvent: function(ev, cb){
			$([this]).unbind(ev, cb);
			return this;
		},
		// jq caches fragments, we always needs a new one
		buildFragment : function(elems, context){
			var oldFragment = $.buildFragment,
				ret;

			elems = [elems];
			// Set context per 1.8 logic
			context = context || document;
			context = !context.nodeType && context[0] || context;
			context = context.ownerDocument || context;

			ret = oldFragment.call( jq, elems, context);

			return ret.cacheable ? $.clone(ret.fragment) : ret.fragment || ret;
		},
		$: $,
		each: can.each
	});

	// Wrap binding functions.
	$.each(['bind','unbind','undelegate','delegate'],function(i,func){
		can[func] = function(){
			var t = this[func] ? this : $([this]);
			t[func].apply(t, arguments);
			return this;
		};
	});

	// Wrap modifier functions.
	$.each(["append","filter","addClass","remove","data","get"], function(i,name){
		can[name] = function(wrapped){
			return wrapped[name].apply(wrapped, can.makeArray(arguments).slice(1));
		};
	});

	// Memory safe destruction.
	var oldClean = $.cleanData;

	$.cleanData = function( elems ) {
		$.each( elems, function( i, elem ) {
			if ( elem ) {
				can.trigger(elem,"destroyed",[],false);
			}
		});
		oldClean(elems);
	};


		
	return can;
});
