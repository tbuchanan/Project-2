 $(document).ready(function() {
   var loadPopups = function() {
     $.ajax('/popups.json', {
       type: 'get',
       data: {
         "q": $('#q').val()
       },
     }).success(function(data) {
       for (var i in data) {
         console.log(data[i])
         $('#popups').append(
           '<a href= http://localhost:3000/popups/' + data[i].id + '>' + '<li>' + data[i].name,
           data[i].description,
           data[i].address,
           data[i].hours,
           data[i].expires_at + '</li></a>');
       }
     });
   };
   loadPopups();

   var addPopup = function(name, image) {
     $('#submit').click(function(e) {
       e.preventDefault();
       var name = $("#name").val();
       $('#popups').append("<li>" + name + "</li>");
       var image = $("#upload").val();
       $('#popups').append("<li>", name, "</li>",
         "<li>", image, "</li>");
       // $("#name").val();

       $.ajax({
         url: ('/popups'),
         type: ('post'),
         data: {
           "popup": {
             "name": name,
             "image": image
           }
         },
         dataType: "json",
         success: function(data) {
           // addPopup(data.name, data.image);
           console.log(data);
         }
       });

     });

   };
   addPopup();
 });