$(document).ready(function() {
  var markers = [];
  // var prev_infowindow = false;

  function initialize() {
    //just a variable storing a location
    var mapOptions = {
      center: new google.maps.LatLng(32.7758, 96.7967),
      zoom: 2
    };
    // alert(gon.current_user)
    var loadPins = function() {    
      var url = "/popups.json";    
      $.ajax(url, {
        type: 'get'
      }).success(function(data) {      
        for (var i in data) {        
          addPin(data[i].lat, data[i].lng);      
        }    

        function addPin(lat, lng, email) {
          var loc = new google.maps.LatLng(lat, lng);
          console.log(loc);
        }
      });

      loadPins();

      var map = new google.maps.Map(document.getElementById("map-canvas"),
        mapOptions);

      //code loads the map

    };
    initialize();
  }
});