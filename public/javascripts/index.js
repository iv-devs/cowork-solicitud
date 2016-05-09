

$(document).ready(function() {

	$('#calendar').fullCalendar({
		header: {
			left: 'prev,next today',
			center: 'title',
			right: 'month,agendaWeek,agendaDay'
		},
		defaultDate: new Date(),
		editable: false,
		selectable: true,
		selectHelper: true,
		selectConstraint: 'businessHours',
        	eventConstraint: 'businessHours',
		businessHours : {
			start: '08:00',
			end: '21:00',
			dow: [ 1, 2, 3, 4, 5, 6 ]
		},
		allDaySlot: false,
		events: '/agenda/data',
		dayClick: function(date, jsEvent, view) {
			if(view.name == 'month' || view.name == 'agendaWeek') {
				$('#calendar').fullCalendar('changeView', 'agendaDay');
				$('#calendar').fullCalendar('gotoDate', date);
			}
		},
		eventClick: function( event, jsEvent, view ) {
			window.location.href = "agenda/" + event.slug;
		},
		select: function( start, end, jsEvent, view ){
			if( view.name == 'agendaDay' ){
				$("#hdnStart").val(start);
				$("#hdnEnd").val(end);
				$('#myModal').modal('toggle');
			}
		}
	});

});
