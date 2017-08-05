function addTrack() {
   $(".buttons").removeClass("visible");
   $(".buttons").addClass("hidden");

   $("#overlaybox-gps").removeClass("hidden");
   $("#overlaybox-gps").addClass("visible"); 
};

function closeTrack() {
   $(".buttons").addClass("visible");
   $(".buttons").removeClass("hidden");

   $("#overlaybox-gps").addClass("hidden");
   $("#overlaybox-gps").removeClass("visible"); 
};

function GPShandleFileSelect(evt) {
   var files = evt.target.files; // FileList
   for (var i = 0, f; f = files[i]; i++) {
            
       var reader = new FileReader();
       reader.onload = (function(theFile) {
         return function(e) {
           var xml=jQuery.parseXML(e.target.result);
           var parser = new GPXParser(xml, map);
           parser.setTrackColour("#ff0000");
           parser.setTrackWidth(5);
           parser.setMinTrackPointDelta(0.005);
           parser.centerAndZoom(xml);
           parser.addTrackpointsToMap();  
           parser.addRoutepointsToMap();
           parser.addWaypointsToMap(); 
           closeTrack();
         };
       })(f);
       reader.readAsText(f);
   };
}
 


