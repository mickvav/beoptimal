function GuessPaymentsPositions() {
   var track=map.tpointarray;
   var pays=map.tpayarray;
  if(pays.length > 0 && track.length > 0 ) {
   for(var i = 0, p; p = pays[i]; i++ ) {
      j0=0;
      jt0=(p.DateTime > track[0].time ? track[0].time : p.DateTime);
      for(var j = 0, t; t = track[j]; j++) {
         if(t.time > jt0 && t.time <=p.DateTime) {
             j0=j;
             jt0=t.time;
         };
      };
      j1=0;
      jt1=(p.DateTime < track[0].time ? track[0].time : p.DateTime);
      for(var j = 0, t; t = track[j]; j++) {
         if(t.time < jt1 && t.time >=p.DateTime) {
             j1=j;
             jt1=t.time;
         };
      };
      console.log("j0:"+j0 + "j1:"+j1);
      if(jt1==jt0) {
         p.ll = track[j0].ll;
      } else {
        var w0 = (jt1-p.DateTime) / (jt1-jt0);
        var w1 = (p.DateTime-jt0) / (jt1-jt0);
        p.ll = new google.maps.LatLng(
            w0*track[j0].ll.lat()+
            w1*track[j1].ll.lat(),
            w0*track[j0].ll.lng()+
            w1*track[j1].ll.lng());

      }; 
   }; 
  };
};

function DrawPayments() {
   var pays=map.tpayarray;
   GuessPaymentsPositions();
   for(var i = 0, p; p = pays[i]; i++ ) {
      if(p.hasOwnProperty("ll") ) {
        if(p.hasOwnProperty("marker")) {
          p.marker.setMap(null);
        };
        p.marker = new google.maps.Marker({
             position : p.ll,
             map : map,
             title : p.Description + "  " + p.Amount + " " + p.Currency + "  " + (new Date(p.DateTime)).toLocaleString()
             });
        var infowindow = new google.maps.InfoWindow({
             content :  p.Description + "<br>" + p.Amount + " " + p.Currency + "<br>" + (new Date(p.DateTime)).toLocaleString()

             });
        infowindow.my_marker=p.marker;
        p.marker.addListener('click', function() {
             infowindow.open(map,infowindow.my_marker);
             });
      };
   };
};
