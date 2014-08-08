$(document).ready(function() {
    function initialize() {
    
    var mapLoad = {
      center: new google.maps.LatLng(37.776616, -122.416972),
      zoom: 13,
      scrollwheel: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: [{"featureType":"landscape.natural","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#e0efef"}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"hue":"#1900ff"},{"color":"#c0e8e8"}]},{"featureType":"landscape.man_made","elementType":"geometry.fill"},{"featureType":"road","elementType":"geometry","stylers":[{"lightness":100},{"visibility":"simplified"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"water","stylers":[{"color":"#7dcdcd"}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"visibility":"on"},{"lightness":700}]}]
    }

    var map = new google.maps.Map(document.getElementById("map-search"), mapLoad);
    var search_name = $('#q').val();
    var search_loc = $('#location').val();

    function loadSearch() {
      $.ajax({ url: '/popups/search.json',
        type: 'get',
        data: {
        "q": $('#q').val(),
      }
      }).success(function(data) {
        for (var i in data) {
          console.log(i);
          addPin(data[i].latitude, data[i].longitude, data[i].name, data[i].id, data[i].address, data[i].category, data[i].image, data[i].price);
        }
      });
    }
    // this function needs help
    $('#search_form').on('submit', function(event) {
      event.preventDefault();

      if (search_loc != true && search_name != true) {
      // alert("tacos");
        if (search_loc !=""){
          alert("tacos");
          loadSearchGeo(search_loc);
        }
        else if (search_name !="") {
          alert("salsa");
          loadSearch(search_name);
        }
      loadSearch();
      loadSearchGeo();
      }  
      // else if (search_name !== null && search_loc === null) {         
      //   alert("salsa");
      //     loadSearch();
      // } 
      // else if (search_loc !== null && search_name !== null) {    
      //   alert("burritos");
      //     loadSearchGeo();
      // }
      else {
        alert("burritos");
      }
    });
      
    function loadSearchGeo() {
      // Find search string and geocode and add to url
      $.ajax({url: "/popups/search_geocode.json", 
        type: 'get',
        data: {
        "geocode": $('#location').val()
      }
      }).success(function(data) {
        for (var i in data) {
          console.log(i);
          addPin(data[i].latitude, data[i].longitude, data[i].name, data[i].id, data[i].address, data[i].category, data[i].image, data[i].price);
        }
      });
    }

    //  $('#search_form').on('submit', function(event) {
    //   event.preventDefault();
    //   loadSearchGeo(search_loc);
    // });
   // }

    var addPin = function(latitude, longitude, name, id, address, category, image, price) {
      var loc = new google.maps.LatLng(latitude, longitude);
      var newMarker = new google.maps.Marker({
        position: loc,
        map: map,
        icon: "http://i.imgur.com/xYtLJ5D.png",
        animation: google.maps.Animation.DROP,
        title: name
      });
      
      var contentString = "<a href=/popups/" + id + '>' + name + "</a>" + "<br>" + "<img width='90' height='90' src=" + image + ">" + "<br>";
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
        } 
        else {
          newInfoWindow.open(map, this);
          lastInfoWindow = newInfoWindow;
        }
      });
      // newInfoWindow.open(map,marker);
    }
  };
  google.maps.event.addDomListener(window, 'load', initialize);
});