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
//= require turbolinks
//= require bootstrap.min
//= require_tree .

var ready = function() {
  // var loadPopups = function() {
  //   $.ajax('/popups.json', {
  //     type: 'get',
  //     data: {
  //       "q": $('#q').val()
  //     },
  //   }).success(function(data) {
  //     for (var i in data) {
  //       var exp = new Date(data[i].expires_at);
  //       // console.log(data[i]);

  //       $('#popups').append(
  //         '<a href=/popups/' + data[i].id + '>' + '<li>' + '<br>' + data[i].name,
  //         data[i].description, '</br>',
  //         data[i].address, '</br>',
  //         data[i].hours, '</br>',
  //         data[i].price, '</br>',
  //         exp.toLocaleDateString(), '</br>',
  //         '<a href=' + data[i].website + '>' + data[i].website + '</a>' + '</br>' + '</li></a>');
  //     }
  //   });
  // };
  // loadPopups();  
  
  (function initialize() {
    //just a variable storing a location
    var mapOptions = {
      center: new google.maps.LatLng(37.776616, -122.416972),
      zoom: 13,
      scrollwheel: false,
    // mapTypeId: google.maps.MapTypeId.ROADMAP,
    // styles: [{"elementType":"labels","stylers":[{"visibility":"off"}]},{"elementType":"geometry","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"geometry","stylers":[{"visibility":"on"},{"color":"#000000"}]},{"featureType":"landscape","stylers":[{"color":"#ffffff"},{"visibility":"on"}]},{}]
    };

    var map = new google.maps.Map(document.getElementById("map-canvas"),
      mapOptions);
  


    var loadGeo = function() {
      var url = "/popups.json";
      $.ajax(url, {
        type: 'get'
      }).success(function(data) {
        for (var i in data) {
          addPin(data[i].latitude, data[i].longitude, data[i].name, data[i].id, data[i].address, data[i].category);
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

  
    function addPin(latitude, longitude, name, id, address, category) {
      var loc = new google.maps.LatLng(latitude, longitude);
      console.log(loc);
      var newMarker = new google.maps.Marker({
        position: loc,
        map: map,
        animation: google.maps.Animation.DROP,
        icon: "http://i.imgur.com/7sKFaCa.png",
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

      var contentString = "<a href=/popups/" + id + '>' + name + "</a>" + '<br>' + address + '<br>' + category + '<br>' ;
      
      var newInfoWindow = new google.maps.InfoWindow({
        content: contentString
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

  })();

};
$(document).ready(ready);
$(document).on('page:load', ready);