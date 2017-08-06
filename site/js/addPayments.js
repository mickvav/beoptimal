function addPayments() {
   $(".buttons").removeClass("visible");
   $(".buttons").addClass("hidden");

   $("#overlaybox-pay").removeClass("hidden");
   $("#overlaybox-pay").addClass("visible"); 
};

function closePayments() {
   $(".buttons").addClass("visible");
   $(".buttons").removeClass("hidden");

   $("#overlaybox-pay").addClass("hidden");
   $("#overlaybox-pay").removeClass("visible"); 
};

function ColnamesConvert(row) {
   //
   // Receives - object with 'rowname' -> 'rowvalue' pairs
   // of any .csv                    
   // 
   // Returns - object with at most 4 pairs with 
   // distinct rownames:
   //
   // DateTime - points to UTC datetime
   // Description - points to some textual description
   // Amount - parsed amount of money
   // Currency - Currency code. text
   // 
   // This function is bank-specific and
   // should be overwritten if you attach anonther 
   // bank plugin.
   //
   // This example works for Alpha Bank.
   if(!(
      row.hasOwnProperty("Дата операции") &&
      row.hasOwnProperty("Приход") &&
      row.hasOwnProperty("Расход") &&
      row.hasOwnProperty("Описание операции") &&
      row.hasOwnProperty("Валюта"))) {
      return null;
   };
   var datere = /(\d{2})\.(\d{2})\.(\d{4}) (\d{2}):(\d{2}):(\d{2}) ([A-Z]+)/;
   var [ fullre, day, month,year, hour,minute,second, tz ] = datere.exec(row["Дата операции"]);
// FIXME :: Deal with timezone
   var dateObject = new Date(year+"-"+month+"-"+day+"T"+hour+":"+minute+":"+second);

   var income = parseFloat(row["Приход"].replace(',','.'));
   var outcome = parseFloat(row["Расход"].replace(',','.'));
   var total = income-outcome;
   return {
            DateTime : dateObject.getTime(),
            Description : row["Описание операции"],
            Amount : total,
            Currency : row["Валюта"]
          };
};

function ExtractDataFromText(text) {
   // This function may be redefined by bank-specific plugin.
   return Papa.parse(text,{header: true});
};

function PAYhandleFileSelect(evt) {
   var files = evt.target.files; // FileList
   for (var i = 0, f; f = files[i]; i++) {
            
       var reader = new FileReader();
       reader.onload = (function(theFile) {
         return function(e) {
            var data = ExtractDataFromText(e.target.result);            for(var j = 0, row; row = data.data[j];j++) {
               var converted = ColnamesConvert(row);
               if(converted !== null) {
                  map.tpayarray.push(converted);
               };
            };

            closePayments();
            UpdateSummary(); 
         };
       })(f);
       reader.readAsText(f);
   };
};
 


