/*
*Google Maps API3 helper functions
*
*safely loads Google Maps API into by gracefully falling back if no connection
*this allows PhoneGap based apps  to continue working even when there isn't a network connection.
*
*graceful loading based on article http://thingsico.de/blog/2011/11/using-google-maps-reliably-in-phonegap/
*
 * @namespace windows
 * @class global
 *
 * @author Nathan Sasto || @untrueaxioms
 */

window.maps= {
	
	/*
	Graceful loadup
	*/
	
	googleMapsState : "",

	setup : function() {
		loadGoogleMaps();
	 
		document.addEventListener("online", function(e) {
			if (googleMapsState == "" || googleMapsState == "error") {
				loadGoogleMaps();
			}
		}, false);
	},
	
	loadGoogleMaps : function() {
		
		googleMapsState = "loading";
	 
		var script = document.createElement("script");
		script.src = "http://maps.google.com/maps/api/js?v=3.7&sensor=true&callback=window.maps.googleMapsReady";
		script.type = "text/javascript";
	 
		script.addEventListener("error", function(e) {
			googleMapsState = "error";
		}, false);
	 
		script.addEventListener("load", function(e) {
			setTimeout(function() {
				if (googleMapsState == "loading") googleMapsState = "error";
			}, 5000);
		}, false);
	 
		document.getElementsByTagName("head")[0].appendChild(script);
	},
	
	onMapReadyCallback : function() {
		//set this function through your controller if you want specific actions on map load
		return ""
	},
	
	googleMapsReady : function() {
		googleMapsState = "ready";
		this.onMapReadyCallback();
	},
	 
	checkGoogleMapsAvailability : function() {
	
	// /* if checkNetworkWithPhoneGap is not null then check for internet connection as well (needs phonegap) */
		// if (checkNetworkWithPhoneGap) {
			// var connectionState = navigator.network.connection.type;
			// if (connectionState == Connection.NONE || connectionState == Connection.UNKNOWN) {
				// return "No network connection available";
			// }
		// };
		
		if (googleMapsState == "" || googleMapsState == "error") {
			return "Maps are not currently available";
		};
	 
		if (googleMapsState == "loading") {
			return "Maps are loading, try again soon";
		};
	 
		return "";
	},
	
	listen : document.addEventListener("deviceready", this.setup, false),
	 
	// /*
		// general helper functions
	// */
	textAddress : '',
	
	getAddress : function(geocoder, latLng, scope) {
		var self = (!scope) ? window.maps : scope;
		console.log('SCOPE IS ',self);
		geocoder.geocode( {'latLng': latLng},
			function(results, status) {
				if(status == google.maps.GeocoderStatus.OK) {
					if(results[0]) {
					//console.log(results[0].formatted_address,document.getElementById(el));
						self.textAddress = results[0].formatted_address;
					}
					else {
						self.textAddress = "No address found" ;
					}
				}
				else {
					self.textAddress = status ;			  
				}
			}
		);
	}
	
	
};