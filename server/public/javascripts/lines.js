var db = new PouchDB('http://localhost:5984/songlineslib');

db.allDocs({ include_docs: true}).then( data => { 

    let popupwindow = new google.maps.InfoWindow();

    let row;
    for (row of data.rows) {

        let sl = row.doc;
        // map songlines
        let path1 = new google.maps.Polyline({
            path: sl.path,
            strokeColor: '#4d89ea',
            strokeOpacity: 1.0,
            strokeWeight: 8,
        });
        path1.setMap(map);
        // setting songline info as a property of the polyline is the only thing that seems to work for this loop
        path1.sl = sl;

        path1.addListener('click', (e) => {
            console.log(path1.sl.songlinename);
            popupwindow.setContent("<h2>" + path1.sl.songlinename + "</h2><br />" +
                "<a target='_blank' href='/scores/" + path1.sl.scoreURL + "'>Score</a><br />" +
                "<a target='_blank' href='" + path1.sl.recordingURL + "'>Recording</a><br />");
            popupwindow.setPosition(e.latLng);
            popupwindow.open(map);
        });
    }
});