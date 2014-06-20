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
//= require bootstrap.min.js
//= require turbolinks
//= require_tree .

var ready = function() {
  var loadPopups = function() {
    $.ajax('/popups.json', {
      type: 'get',
      data: {
        "q": $('#q').val()
      },
    }).success(function(data) {
      for (var i in data) {
        var exp = new Date(data[i].expires_at);
        // console.log(data[i]);

        $('#popups').append(
          '<a href=/popups/' + data[i].id + '>' + '<li>' + '<br>' + data[i].name,
          data[i].description, '</br>',
          data[i].address, '</br>',
          data[i].hours, '</br>',
          data[i].price, '</br>',
          exp.toLocaleDateString(), '</br>',
          '<a href=' + data[i].website + '>' + data[i].website + '</a>' + '</br>' + '</li></a>');
      }
    });
  };
  loadPopups();

// seach popup
  // var searchPopups = function(){ $.ajax('/popups/search', {
  //   type: 'get',
  //   data: { "geocode": $('#geocode').val()}
  // }).success(function(data){
  //   $('#popups').html("");
  //   console.log("about to append")
  //   for (var i in data){
  //     console.log(data[i]);
  //   $('#popups').append(
  //     '<a href=/popups/' + data[i].id + '>' + '<li>' + '<br>' + data[i].name,
  //         data[i].description, '</br>',
  //         data[i].address, '</br>',
  //         data[i].hours, '</br>',
  //         data[i].price, '</br>',
  //         '<a href=' + data[i].website + '>' + data[i].website + '</a>' + '</br>' + '</li></a>');
  //   }
  //   });

  //   };

  //   // end of search popups
  //   $('.searchbutton').click(function(e){
  //   e.preventDefault();
  //   searchPopups();
  //   });



  $('#submit').click(function(e) {
    e.preventDefault();
    var name = $("#name").val();
    var description = $("#description").val();
    var address = $("#address").val();
    var price = $("#price").val();
    var hours = $("#hours").val();
    var expires_at = $("#expires_at").val();
    var website = $("#website").val();

    $.ajax({
      url: ('/popups'),
      type: ('post'),
      data: {
        "popup": {
          "name": name,
          "description": description,
          "address": address,
          "price": price,
          "hours": hours,
          "expires_at": expires_at,
          "website": website
        }
      },
      dataType: "json",
      success: function(sData) {
        $('#popups').append('<a href=/popups/' + sData.id + '>' + "<li> + <br>" + name, "<br>" + description, "<br>" + address, "<br>" + price, "<br>" + hours, "<br>" + expires_at + "<br>" + '<a href=' + website + '>' + website + '</a>' + '</br>' + '</li></a>');
        $('#name').val("");
        $('#description').val("");
        $('#price').val("");
        $('#address').val("");
        $('#hours').val("");
        $('#expires_at').val("");
        $('#website').val("");
        // console.log(sData);
      }
    });

  });
  
  
  (function initialize() {
    //just a variable storing a location
    var mapOptions = {
    center: new google.maps.LatLng(37.776616, -122.416972),
    zoom: 14,
    // mapTypeId: google.maps.MapTypeId.ROADMAP,
    // styles: [{"elementType":"labels","stylers":[{"visibility":"off"}]},{"elementType":"geometry","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"geometry","stylers":[{"visibility":"on"},{"color":"#000000"}]},{"featureType":"landscape","stylers":[{"color":"#ffffff"},{"visibility":"on"}]},{}]
    };

    

    var map = new google.maps.Map(document.getElementById("map-canvas"),
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

  })();

};
$(document).ready(ready);
$(document).on('page:load', ready);