$(document).ready(function() {
  var cb = function(start, end, label) {
    //console.log(start.toISOString(), end.toISOString(), label);
    $('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
    //alert("Callback has fired: [" + start.format('MMMM D, YYYY') + " to " + end.format('MMMM D, YYYY') + ", label = " + label + "]");
  };

  var startDate = moment(new Date('2016-02-10'));
  var endDate = moment(new Date('2016-02-11'));

  var optionSet1 = {
    startDate: startDate,
    endDate: endDate,
    minDate: '01/01/2016',
    maxDate: '12/31/2020',
    dateLimit: {
      days: 60
    },
    showDropdowns: true,
    showWeekNumbers: true,
    timePicker: false,
    timePickerIncrement: 1,
    timePicker12Hour: true,
    ranges: {
      'Today': [moment(), moment()],
      'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
      'Last 7 Days': [moment().subtract(6, 'days'), moment()]
    },
    opens: 'left',
    buttonClasses: ['btn btn-default'],
    applyClass: 'btn-small btn-primary',
    cancelClass: 'btn-small',
    format: 'MM/DD/YYYY',
    separator: ' to ',
    locale: {
      applyLabel: 'Submit',
      cancelLabel: 'Clear',
      fromLabel: 'From',
      toLabel: 'To',
      customRangeLabel: 'Custom',
      daysOfWeek: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
      monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      firstDay: 1
    }
  };
  $('#reportrange span').html(startDate.format('DD/MM/YYYY') + ' - ' + endDate.format('DD/MM/YYYY'));
  $('#reportrange').daterangepicker(optionSet1, cb);
  $('#reportrange').on('show.daterangepicker', function() {
    //console.log("show event fired");
  });
  $('#reportrange').on('hide.daterangepicker', function() {
    //console.log("hide event fired");
  });
  $('#reportrange').on('apply.daterangepicker', function(ev, picker) {
    //console.log("apply event fired, start/end dates are " + picker.startDate.format('MMMM D, YYYY') + " to " + picker.endDate.format('MMMM D, YYYY'));
  });
  $('#reportrange').on('cancel.daterangepicker', function(ev, picker) {
    //console.log("cancel event fired");
  });
  $('#options1').click(function() {
    $('#reportrange').data('daterangepicker').setOptions(optionSet1, cb);
  });
  $('#options2').click(function() {
    $('#reportrange').data('daterangepicker').setOptions(optionSet2, cb);
  });
  $('#destroy').click(function() {
    $('#reportrange').data('daterangepicker').remove();
  });
  $('#single_cal1').daterangepicker({
    singleDatePicker: true,
    calender_style: "picker_1",
    format: 'DD/MM/YYYY'
  }, function(start, end, label) {
    //console.log(start.toISOString(), end.toISOString(), label);
  });
});
NProgress.done();