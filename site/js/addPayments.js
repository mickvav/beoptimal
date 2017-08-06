function addTrack() {
   $(".buttons").removeClass("visible");
   $(".buttons").addClass("hidden");

   $("#overlaybox-pay").removeClass("hidden");
   $("#overlaybox-pay").addClass("visible"); 
};

function closeTrack() {
   $(".buttons").addClass("visible");
   $(".buttons").removeClass("hidden");

   $("#overlaybox-pay").addClass("hidden");
   $("#overlaybox-pay").removeClass("visible"); 
};

function PAYhandleFileSelect(evt) {
   var files = evt.target.files; // FileList
   for (var i = 0, f; f = files[i]; i++) {
            
       var reader = new FileReader();
       reader.onload = (function(theFile) {
         return function(e) {
           var data=Papa.parse(e.target.result,{header: true});
           
         };
       })(f);
       reader.readAsText(f);
   };
}
 


