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
//= require_tree .

$(document).ready(function() {
    function initialize() {
    //just a variable storing a location
    var mapOptions = {
      center: new google.maps.LatLng(37.776616, -122.416972),
      zoom: 13,
      scrollwheel: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: [{"featureType":"landscape","stylers":[{"saturation":20},{"lightness":65},{"visibility":"on"}]},{"featureType":"poi","stylers":[{"saturation":100},{"lightness":51},{"visibility":"simplified"}]},{"featureType":"road.highway","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"road.arterial","stylers":[{"saturation":-100},{"lightness":30},{"visibility":"on"}]},{"featureType":"road.local","stylers":[{"saturation":-100},{"lightness":40},{"visibility":"on"}]},{"featureType":"transit","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"administrative.province","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":-25},{"saturation":-100}]},{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#ffff00"},{"lightness":-25},{"saturation":-97}]}]
    };
    var map = new google.maps.Map(document.getElementById("map-canvas-index"),
    mapOptions);


    var loadGeo = function() {
      var url = "/popups.json";
      $.ajax(url, {
        type: 'get'
      }).success(function(data) {
        for (var i in data) {
          addPin(data[i].latitude, data[i].longitude, data[i].name, data[i].id, data[i].address, data[i].category, data[i].image);
        }
      });
    };
    loadGeo();


// pins are showing up on top of all pins. need to clear map before search
    // var loadSearch = function() {
    //   // Find search string and geocode and add to url
    //   var url = "/popups/search.json";
    //   $.ajax(url, {
    //     type: 'get',
    //     data: {
    //     "q": $('#q').val(),
    //     "geocode": $('#geocode').val()
    //   }
    //   }).success(function(data) {
    //     for (var i in data) {
    //       addPin(data[i].latitude, data[i].longitude, data[i].name, data[i].id);
    //     }
    //   });
    // };

    // $('#search_form').on('submit', function(event) {
    //   // event.preventDefault();
    //   loadSearch();
    // })

  
    function addPin(latitude, longitude, name, id, address, category, image) {
      var loc = new google.maps.LatLng(latitude, longitude);
      console.log(loc);
      var newMarker = new google.maps.Marker({
        position: loc,
        map: map,
        animation: google.maps.Animation.DROP,
        icon: "http://i.imgur.com/xYtLJ5D.png",
        title: name
      });

    //   infobox = new InfoBox({
    //      content: document.getElementById("infobox"),
    //      disableAutoPan: false,
    //      maxWidth: 150,
    //      pixelOffset: new google.maps.Size(-140, 0),
    //      zIndex: null,
    //      boxStyle: {
    //         background: "url('http://google-maps-utility-library-v3.googlecode.com/svn/trunk/infobox/examples/tipbox.gif') no-repeat",
    //         opacity: 0.75,
    //         width: "280px"
    //     },
    //     closeBoxMargin: "12px 4px 2px 2px",
    //     closeBoxURL: "http://www.google.com/intl/en_us/mapfiles/close.gif",
    //     infoBoxClearance: new google.maps.Size(1, 1)
    // });
    
    // google.maps.event.addListener(marker, 'click', function() {
    //     infobox.open(map, this);
    //     map.panTo(loc);
    // });

      // --> adding autocomplete functionality 
    var input = document.getElementById('location');
    var searchform = document.getElementById('search_form');
    var place;
    var autocomplete = new google.maps.places.Autocomplete(input);

    google.maps.event.addListener(autocomplete, 'place_changed', function () {
        place = autocomplete.getPlace();
        //console.log(place);
    });

    searchform.addEventListener("Search", function() {
        var newlatlong = new google.maps.LatLng(place.geometry.location.lat(),place.geometry.location.lng());
        map.setCenter(newlatlong);
        marker.setPosition(newlatlong);
        map.setZoom(12);
 
    });
     
    //Reset the input box on click
    input.addEventListener('click', function(){
        input.value = "";
    });

    // end of autocomplete code

      var contentString = "<img width='100' src=" + image + ">" + "<br>" + "<a href=/popups/" + id + '>' + name + "</a>" + '<br>' + address + '<br>' + category ;
      
      var newInfoWindow = new google.maps.InfoWindow({
        content: contentString
      });
      addInfoWindowListener(newMarker, newInfoWindow);
    };

    var lastInfoWindow;
    var addInfoWindowListener = function(marker, newInfoWindow) {
      google.maps.event.addListener(marker, 'mouseover', function() {
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
