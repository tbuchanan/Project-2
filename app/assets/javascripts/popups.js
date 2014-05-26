 
 $(document).ready(function() {
   var loadPopups = function() {
     $.ajax('/popups.json', {
       type: 'get'
     }).success(function(data) {
       for (var i in data) {
         $('#popups').append(
           '<li>' + data[i].name,
                    data[i].description,
                    data[i].address,
                    data[i].hours,
                    data[i].expires_at + '</li>');
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
