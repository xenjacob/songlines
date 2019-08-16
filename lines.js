var testsl;

// fetch all songlines
$.ajax({
    url: "songlineslib.json",
    dataType: "json",
    method: "GET"
}).done(function(data) {
    testsl = data[0];
    console.log(testsl);

    // map songlines
    var path1 = new google.maps.Polyline({
        path: testsl.path,
        strokeColor: '#4d89ea',
        strokeOpacity: 1.0,
        strokeWeight: 8,
    });
    path1.setMap(map);    
  
    // 
    var songlineinfo1 = new google.maps.InfoWindow({
        content: document.getElementById("songline"),
        position: testsl.path[0]
    });
    
    path1.addListener('click', function() { 
        songlineinfo1.open(map);
    });

});
