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
        console.log(data[i]);
        var exp = new Date(data[i].expires_at);


        $('#popups').append(
          '<a href=/popups/' + data[i].id + '>' + '<li>' + data[i].name,
          data[i].description, '</br>',
          data[i].address, '</br>',
          data[i].hours, '</br>',
          data[i].price, '</br>',
          exp.toLocaleDateString(), '</br>' + '</li></br></a>');

      }
    });
  };
  loadPopups();

  var addPopup = function(id, name, description, price, address, hours, expires_at) {
    $('#submit').click(function(e) {
      e.preventDefault();
      var name = $("#name").val();
      // $('#popups').append("<li>" + name + "</li>");
      var description = $("#description").val();
      var address = $("#address").val();
      var price = $("#price").val();
      var hours = $("#hours").val();
      var expires_at = $("#expires_at").val();
      $('#popups').append('<a href=/popups/' + name + '>' + "<li>" + name, description, address, price, hours, expires_at + "</li></a>");


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
            "expires_at": expires_at
          }
        },
        dataType: "json",
        success: function(data) {
          addPopup(data.name, data.description, data.address, data.price, data.hours, data.expires_at);
          console.log(data);
        }
      });



    });

  };
  addPopup();

  (function initialize() {
    //just a variable storing a location
    var mapOptions = {
      center: new google.maps.LatLng(37.7914136, -122.414475),
      zoom: 12
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
          addPin(data[i].latitude, data[i].longitude, data[i].name);      
        }    
      }); 

    };

    loadGeo();

    function addPin(latitude, longitude, name) {
      var loc = new google.maps.LatLng(latitude, longitude);
      console.log(loc);
      var newMarker = new google.maps.Marker({
        position: loc,
        map: map,
        title: name

      });


      var newInfoWindow = new google.maps.InfoWindow({
        content: '<a>' + name + '</a>'
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