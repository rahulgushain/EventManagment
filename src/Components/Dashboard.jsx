import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [events, setEvents] = useState({});

  useEffect(() => {
    fetch("http://localhost:3003/v2/Event")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.events)) {
          // Group events by month and date
          const groupedEvents = data.events.reduce((acc, event) => {
            if (!event.date) return acc; // Skip if date is missing

            const dateObj = new Date(event.date);
            if (isNaN(dateObj.getTime())) return acc; // Skip invalid dates

            const monthYear = dateObj.toLocaleDateString("en-CA", { year: "numeric", month: "long" });
            const formattedDate = dateObj.toISOString().split("T")[0]; // YYYY-MM-DD

            if (!acc[monthYear]) {
              acc[monthYear] = {};
            }
            if (!acc[monthYear][formattedDate]) {
              acc[monthYear][formattedDate] = [];
            }
            acc[monthYear][formattedDate].push(event.task || "No task available");

            return acc;
          }, {});

          setEvents(groupedEvents);
        }
      })
      .catch((err) => console.error("Error fetching events:", err));
  }, []);

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-3xl font-bold text-center mb-5">📅 Event Dashboard</h1>

      {Object.keys(events).length === 0 ? (
        <p className="text-center text-gray-500">No events found.</p>
      ) : (
        Object.entries(events).map(([month, dates], index) => (
          <details key={index} className="mb-4 border p-3 rounded-lg">
            <summary className="cursor-pointer font-semibold text-xl bg-gray-100 p-2 rounded-md">
              {month} ({Object.keys(dates).length} Dates)
            </summary>
            <div className="mt-2 p-2">
              {Object.entries(dates).map(([date, tasks], idx) => (
                <div key={idx} className="p-2 bg-gray-200 rounded-md mb-3">
                  <strong className="block">{new Date(date).toDateString()}</strong>
                  <ul className="list-disc pl-5">
                    {tasks.map((task, i) => (
                      <li key={i} className="text-gray-700">{task}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </details>
        ))
      )}
    </div>
  );
};

export default Dashboard;
