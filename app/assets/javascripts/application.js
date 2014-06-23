// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require bootstrap.min
//= require handlebars.runtime
//= require_tree .

$(document).ready(function() {
    function initialize() {
    //just a variable storing a location
    var mapOptions = {
      center: new google.maps.LatLng(37.776616, -122.416972),
      zoom: 13,
      scrollwheel: false
    // mapTypeId: google.maps.MapTypeId.ROADMAP,
    // styles: [{"elementType":"labels","stylers":[{"visibility":"off"}]},{"elementType":"geometry","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"geometry","stylers":[{"visibility":"on"},{"color":"#000000"}]},{"featureType":"landscape","stylers":[{"color":"#ffffff"},{"visibility":"on"}]},{}]
    };
    var map = new google.maps.Map(document.getElementById("map-canvas-index"),
    mapOptions);


    // alert(gon.current_user)
    var loadGeo = function() {
      var url = "/popups.json";
      $.ajax(url, {
        type: 'get'
      }).success(function(data) {
        for (var i in data) {
          addPin(data[i].latitude, data[i].longitude, data[i].name, data[i].id);
        }
      });
    };
    loadGeo();

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