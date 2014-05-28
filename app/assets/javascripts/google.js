// // $(document).ready(function() {

//   function initialize() {
//     //just a variable storing a location
//     var mapOptions = {
//       center: new google.maps.LatLng(37.7914136, -122.414475),
//       zoom: 12
//     };
//     var map = new google.maps.Map(document.getElementById("map-canvas"),
//       mapOptions);
//     // alert(gon.current_user)
//     var loadGeo = function() {    
//       var url = "/popups.json";    
//       $.ajax(url, {
//         type: 'get'
//       }).success(function(data) {      
//         for (var i in data) {        
//           addPin(data[i].latitude, data[i].longitude, data[i].name);      
//         }    
//       }); 

//     };

//     loadGeo();

//     function addPin(latitude, longitude, name) {
//       var loc = new google.maps.LatLng(latitude, longitude);
//       console.log(loc);
//       var newMarker = new google.maps.Marker({
//         position: loc,
//         map: map,
//         title: name

//       });


//       var newInfoWindow = new google.maps.InfoWindow({
//         content: '<h3>' + name + '</h3>'
//       });
//       addInfoWindowListener(newMarker, newInfoWindow);
//     };

//     var lastInfoWindow;
//     var addInfoWindowListener = function(marker, newInfoWindow) {
//       google.maps.event.addListener(marker, 'click', function() {
//         if ( !! lastInfoWindow) {
//           lastInfoWindow.close();
//         }
//         if (lastInfoWindow === newInfoWindow) {
//           lastInfoWindow = null;
//         } else {
//           newInfoWindow.open(map, this);
//           lastInfoWindow = newInfoWindow;
//         }
//       }();
//     }

//   }();

// $(document).ready(initialize);
// $(document).on('page:load', initialize);