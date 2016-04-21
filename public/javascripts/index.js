function addDays( adds ){
  var today = new Date();
  return new Date().setDate(today.getDate() + adds);
}

$(document).ready(function() {

		$('#calendar').fullCalendar({
			header: {
				left: 'prev,next today',
				center: 'title',
				right: 'month,basicWeek,basicDay'
			},
			defaultDate: new Date(),
			editable: true,
			eventLimit: true, // allow "more" link when too many events
			events: '/agenda/data'
		});

	});
