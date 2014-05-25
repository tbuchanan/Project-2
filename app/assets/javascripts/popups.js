 
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
           '<li>' + data[i].expires_at + '</li>');
       }
     });
   };
   loadPopups();

   var addPopup = function(name) {
     $('#submit').click(function(e) {
       e.preventDefault();
       var name = $("#name").val();
       $('#popups').append("<li>" + name + "</li>");
       $.ajax({
         url: ('/popups'),
         type: ('post'),
         data: {
           "popup": {
             "name": name
           }
         },
         dataType: "json",
         success: function(data) {
           addPopup(data.name);
           console.log(data);
         }
       });

     });

   }
   addPopup();
 });
