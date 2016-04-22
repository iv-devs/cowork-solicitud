$(document).ready(function() {
  $('#txfFechas').daterangepicker({
    "timePicker": true,
    "timePicker24Hour": true,
    "autoApply": true,
    "minDate": "04/21/2016",
    locale: {
      format: 'MM/DD/YYYY h:mm'
    }
  });
});
