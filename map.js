var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 40.8115616, lng: -73.9627719},
    zoom: 16
    });
    //loadOverlay();
    drawSonglines();
    pullSongline();
}

// BEGIN HAND DRAWN OVERLAY CODE (move to separate file)

function loadOverlay() {
    HandDrawnOverlay.prototype = new google.maps.OverlayView();

}

// constructor
function HandDrawnOverlay(bounds, image, map) {

    // Initialize all properties.
    this.bounds_ = bounds;
    this.image_ = image;
    this.map_ = map;
  
    // Define a property to hold the image's div. We'll
    // actually create this div upon receipt of the onAdd()
    // method so we'll leave it null for now.
    this.div_ = null;
  
    // Explicitly call setMap on this overlay.
    this.setMap(map);
}

HandDrawnOverlay.prototype.onAdd = function() {

    var div = document.createElement('div');
    div.style.borderStyle = 'none';
    div.style.borderWidth = '0px';
    div.style.position = 'absolute';
  
    // Create the img element and attach it to the div.
    var img = document.createElement('img');
    img.src = this.image_;
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.position = 'absolute';
    div.appendChild(img);
  
    this.div_ = div;
  
    // Add the element to the "overlayLayer" pane.
    var panes = this.getPanes();
    panes.overlayLayer.appendChild(div);
};

// END

function drawSonglines() {
    var songlinesrequest = new XMLHttpRequest();
    var songlinesdata;
    songlinesrequest.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
        songlinesdata = JSON.parse(this.responseText);
        var path1 = new google.maps.Polyline({
            path: songlinesdata[0].path,
            strokeColor: '#4d89ea',
            strokeOpacity: 1.0,
            strokeWeight: 8,
        });
        path1.setMap(map);
        console.log(path1);
        }

        //var entrynode = document.getElementById("score");
        //"<h1>" + songlinesdata[0].songlinename + "</h1"
        //    + "<img src=\"/scores/" + songlinesdata[0].scorepath + "\" alt=\"tust\" />";

        //var entryelement = document.createElement("div");
        //entryelement.append(entrynode);

        var songlineinfo = new google.maps.InfoWindow({
            content: document.getElementById("songline"),
            position: songlinesdata[0].path[0]
        });

        path1.addListener('click', function() { 
            songlineinfo.open(map);
        });
    }
    songlinesrequest.open("GET", "songlineslib.json", true);
    songlinesrequest.send();
}