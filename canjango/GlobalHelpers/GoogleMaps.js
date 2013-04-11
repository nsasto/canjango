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

window.global= {
	
	/*
	Graceful loadup
	*/
	
	googleMapsState : "",

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