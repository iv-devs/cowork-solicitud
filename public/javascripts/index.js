

$(document).ready(function() {

		$('#calendar').fullCalendar({
			header: {
				left: 'prev,next today',
				center: 'title',
				right: 'month,agendaWeek,agendaDay'
			},
			defaultDate: new Date(),
			editable: true,
			eventLimit: true, // allow "more" link when too many events
			events: '/agenda/data'
			dayClick: function(date, jsEvent, view) {
				if(view.name == 'month' || view.name == 'agendaWeek') {
					$('#calendar').fullCalendar('changeView', 'agendaDay');
					$('#calendar').fullCalendar('gotoDate', date);      
				}
			}
		});

	});
