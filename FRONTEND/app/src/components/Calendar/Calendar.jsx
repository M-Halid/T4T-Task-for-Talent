import { useState } from "react";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./calendar.style.css";

const localizer = momentLocalizer(moment);

const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [selectedSlots, setSelectedSlots] = useState([]);

  const handleSelect = ({ start, end }) => {
    const title = window.prompt("New Event name");
    if (title) {
      setEvents([
        ...events,
        {
          start,
          end,
          title,
        },
      ]);
      setSelectedSlots([]);
    }
  };

  const slotPropGetter = (date) => {
    if (selectedSlots.some((selectedSlot) => +selectedSlot === +date)) {
      return {
        className: "selected",
      };
    }
  };

  const handleSelecting = (range) => {
    setSelectedSlots(getDates(range.start, range.end));
    return true;
  };

  return (
    <div className="calendar-container">
      <BigCalendar
        className="calendar"
        selectable
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        onSelectSlot={handleSelect}
        onSelecting={handleSelecting}
        slotPropGetter={slotPropGetter}
      />
    </div>
  );
};

// Helper function to get dates between start and end
function getDates(startDate, endDate) {
  let dates = [];
  let currentDate = startDate;
  while (currentDate <= endDate) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dates;
}

export default Calendar;
