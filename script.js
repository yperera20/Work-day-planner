$(document).ready(function () {
  // Function to display the current date
  function displayCurrentDate() {
    var currentDate = dayjs().format('MMMM D, YYYY');
    $('#currentDay').text(currentDate);
  }

  function renderTimeBlocks() {
    var container = $('.container-lg');
    container.empty();

    
    var currentHour = dayjs().hour();

    for (var hour = 9; hour <= 17; hour++) {
      var timeBlockEl = $('<div>').addClass('row time-block');
      var hourEl = $('<div>').addClass('col-2 col-md-1 hour text-center py-3');
      var descriptionEl = $('<textarea>').addClass('col-8 col-md-10 description');
      var saveBtn = $('<button>').addClass('btn saveBtn col-2 col-md-1');
      var iconEl = $('<i>').addClass('fas fa-save');

   
      timeBlockEl.attr('id', 'hour-' + hour);
      hourEl.text(dayjs().hour(hour).format('hA'));
      descriptionEl.val(localStorage.getItem('hour-' + hour) || '');

      
      if (hour < currentHour) {
        timeBlockEl.addClass('past');
      } else if (hour === currentHour) {
        timeBlockEl.addClass('present');
      } else {
        timeBlockEl.addClass('future');
      }

      saveBtn.attr('aria-label', 'save');
      saveBtn.append(iconEl);
      saveBtn.on('click', function () {
        var newDescription = $(this).siblings('.description').val();
        var blockId = $(this).parent().attr('id');
        localStorage.setItem(blockId, newDescription);
      });

      
      timeBlockEl.append(hourEl, descriptionEl, saveBtn);
      container.append(timeBlockEl);
    }
  }

  displayCurrentDate();

  
  renderTimeBlocks();

  setInterval(function () {
    renderTimeBlocks();
  }, 60000); 
});
