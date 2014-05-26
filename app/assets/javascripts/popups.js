 $(document).ready(function() {
   var loadPopups = function() {
     $.ajax('/popups.json', {
       type: 'get'
     }).success(function(data) {
       for (var i in data) {
         $('#popups').append(
           '<li>' + data[i].name + '</li>',
           '<li>' + data[i].description + '</li>',
           '<li>' + data[i].address + '</li>',
           '<li>' + data[i].hours + '</li>',
           '<li>' + data[i].expires_at + '</li>',
           '<li>' + data[i].image + '</li>');
       }
     });
   };
   loadPopups();

   var addPopup = function(name, image) {
     $('#submit').click(function(e) {
       e.preventDefault();
       var name = $("#name").val();
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
           addPopup(data.name, data.image);
           console.log(data);
         }
       });

     });

   };
   addPopup();
 });