$(document).ready(function() {
    function initialize() {
    //just a variable storing a location
    var mapLoad = {
      center: new google.maps.LatLng(37.776616, -122.416972),
      zoom: 13,
      scrollwheel: false
    }

    var map = new google.maps.Map(document.getElementById("map-search"), mapLoad);

    var loadSearch = function() {
      // Find search string and geocode and add to url
      var url = "/popups/search.json";
      $.ajax(url, {
        type: 'get',
        data: {
        "q": $('#q').val(),
        "geocode": $('#geocode').val()
      }
      }).success(function(data) {
        for (var i in data) {
          addPin(data[i].latitude, data[i].longitude, data[i].name, data[i].id);
        }
      });
    }

    loadSearch();

    $('#search_form').on('submit', function(event) {
    });

    function addPin(latitude, longitude, name, id) {
      var loc = new google.maps.LatLng(latitude, longitude);
      console.log(loc);
      var newMarker = new google.maps.Marker({
        position: loc,
        map: map,
        title: name
      });
      var newInfoWindow = new google.maps.InfoWindow({
        content: "<a href=/popups/" + id + '>' + name + "</a>"
      });
      addInfoWindowListener(newMarker, newInfoWindow);
    };

    var lastInfoWindow;
    var addInfoWindowListener = function(marker, newInfoWindow) {
      google.maps.event.addListener(marker, 'click', function() {
        if ( !! lastInfoWindow) {
          lastInfoWindow.close();
        }
        if (lastInfoWindow === newInfoWindow) {
          lastInfoWindow = null;
        } else {
          newInfoWindow.open(map, this);
          lastInfoWindow = newInfoWindow;
        }
      });
    }
  };
  google.maps.event.addDomListener(window, 'load', initialize);
});
