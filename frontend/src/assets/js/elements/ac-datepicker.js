'use strict';

(function () {
  const d_week = new Datepicker(document.querySelector('#d_week'), {
    buttonClass: 'btn',
    daysOfWeekDisabled: [0, 6]
  });

  const d_highlight = new Datepicker(document.querySelector('#d_highlight'), {
    buttonClass: 'btn',
    daysOfWeekHighlighted: [1]
  });

  const d_auto = new Datepicker(document.querySelector('#d_auto'), {
    buttonClass: 'btn',
    autohide: true
  });

  const d_disable = new Datepicker(document.querySelector('#d_disable'), {
    buttonClass: 'btn',
    datesDisabled: ['02/18/2022', '02/22/2022']
  });

  const d_today = new Datepicker(document.querySelector('#d_today'), {
    buttonClass: 'btn',
    todayHighlight: true
  });

  const disp_week = new Datepicker(document.querySelector('#disp_week'), {
    buttonClass: 'btn',
    calendarWeeks: true
  });

  const rangeEl = document.querySelector('#datepicker_range');

  if (rangeEl) {
    const datepicker_range = new DateRangePicker(rangeEl, {
      buttonClass: 'btn',
      autohide: true
    });

    rangeEl.addEventListener('changeDate', function (e) {
      const dates = e.detail.date;

      if (
        Array.isArray(dates) &&
        dates.length === 2 &&
        dates[0] &&
        dates[1] &&
        window.setCustom
      ) {
        const toISO = d => d.toISOString().split('T')[0];
        window.setCustom(toISO(dates[0]), toISO(dates[1]));
      }
    });
  }

})();
