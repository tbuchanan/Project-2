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
         console.log(data[i]);


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
 };

 $(document).ready(ready);
 $(document).on('page:load', ready);