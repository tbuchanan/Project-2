 $(document).ready(function(){
 var loadPopups = function() {
    $.ajax('/popups.json', {
      type: 'get'
    }).success(function(data) {
      for (var i in data) {
        $('#popups').append(
        	'<li>' + data[i].name,
        	'<br>' + data[i].description,
    		 '<br>' + data[i].address,
    		 '<br>' + data[i].hours,
    		 '<br>' + data[i].expires_at + '</li>');
      }
    });
  };
  loadPopups();


 function addPopup(name, description){
  $('#submit').click(function(e){
    e.preventDefault();
    var name = $("#name").val();
    $('#popups').append("<li>" + name + "</li>");
    // $("#name").val("");
   

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



