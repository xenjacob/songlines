let testsl;

// fetch all songlines
$.ajax({
    url: "songlineslib.json",
    dataType: "json",
    method: "GET"
}).done(function (data) {
    testsl = data[0];
    console.log(testsl);

    // map songlines
    let path1 = new google.maps.Polyline({
        path: testsl.path,
        strokeColor: '#4d89ea',
        strokeOpacity: 1.0,
        strokeWeight: 8,
    });
    path1.setMap(map);

    let popupwindow = new google.maps.InfoWindow({
        content: document.getElementById("popupinfo"),
        position: testsl.path[0]
    });

    path1.addListener('click', (e) => {
        popupwindow.setContent("<h2>" + testsl.songlinename + "</h2><br />" +
                "<a href='/scores/" + testsl.scoreURL + "'>Score</a><br />");
        popupwindow.open(map);
    });

});
