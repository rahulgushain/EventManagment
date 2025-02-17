import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Calender.css";

function Calender() {
  const [events, setEvents] = useState([]); // Stores all events
  const [date, setDate] = useState(new Date()); // Currently selected date
  const [selectedTasks, setSelectedTasks] = useState([]); // Stores tasks for selected date

  // Fetch events from MongoDB
  useEffect(() => {
    fetch("http://localhost:3003/v2/Event")
      .then((res) => res.json())
      .then((data) => {
        console.log("Raw Event Data:", data.events); // Debugging fetched dates
        if (Array.isArray(data.events)) {
          setEvents(data.events);
        } else {
          setEvents([]);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  // Convert event date to local format (YYYY-MM-DD)
  const formatEventDate = (eventDate) => {
    if (!eventDate) return null;
    let validDate = new Date(eventDate);
    return validDate.toLocaleDateString("en-CA"); // Ensures correct local date
  };

  // Store event dates
  const eventDates = events.map((event) => formatEventDate(event.date)).filter(Boolean);

  // Function to highlight event dates
  const tileClassName = ({ date }) => {
    const formattedDate = date.toLocaleDateString("en-CA"); // Local formatted date

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (eventDates.includes(formattedDate)) {
      const eventDateObj = new Date(date);
      eventDateObj.setHours(0, 0, 0, 0);

      return eventDateObj < today ? "pastEvent" : "colorFile"; // Yellow for past, red for future
    }
    return "";
  };

  // Function to update selected tasks when a date is picked
  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
    const formattedSelectedDate = selectedDate.toLocaleDateString("en-CA");

    // Filter events that match the selected date
    const tasksForSelectedDate = events
      .filter((event) => formatEventDate(event.date) === formattedSelectedDate)
      .map((event) => event.task || "No task available");

    setSelectedTasks(tasksForSelectedDate);
  };

  return (
    <div>
      <div className="md:flex gap-2 w-full justify-evenly shadow-lg p-3 rounded-lg m-auto">
        <Calendar
          onChange={handleDateChange} // ✅ Update tasks on click
          value={date}
          tileClassName={tileClassName}
          className="p-5 text-xl md:text-2xl m-auto rounded-xl w-[100px]"
        />

        {/* Display Tasks */}
        <div className="flex flex-col mt-4 m-auto p-5 bg-gray-100 rounded-lg md:w-1/3 min-h-[300px]">
          <div>
            <h1 className="text-2xl font-bold">Color Indication</h1>
            <ul className="leading-[3rem]">
              <li className="flex items-center gap-3">
                <div className="w-[20px] h-[20px] rounded-full bg-yellow-500"></div> 
                <span>Yellow for past events</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-[20px] h-[20px] rounded-full bg-blue-500"></div> 
                <span>Blue for current & selected date</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-[20px] h-[20px] rounded-full bg-red-500"></div> 
                <span>Red for future events</span>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-center text-2xl mt-9 font-semibold">
              <span className="text-2xl">Selected Date: </span>{date.toDateString()}
            </p>
          </div>

          <div className="text-2xl mt-8">
            <h3 className="text-2xl font-bold text-center">Tasks for {date.toDateString()}</h3>
            {selectedTasks.length > 0 ? (
              <ul className="list-disc pl-5">
                {selectedTasks.map((task, index) => (
                  <li key={index} className="text-gray-700">{task}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-center">No tasks for this date.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calender;
