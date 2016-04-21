$(document).ready(function() {
       $('#txfDateStart').datetimepicker();
       $('#txfDateEnd').datetimepicker({
           useCurrent: false //Important! See issue #1075
       });
       $("#txfDateStart").on("dp.change", function (e) {
           $('#txfDateEnd').data("DateTimePicker").minDate(e.date);
       });
       $("#txfDateEnd").on("dp.change", function (e) {
           $('#txfDateStart').data("DateTimePicker").maxDate(e.date);
       });
});
