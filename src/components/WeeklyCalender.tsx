import { useState } from "react";

const WeeklyCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getWeekDates = () => {
    const dates: Date[] = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(currentDate);
      date.setDate(currentDate.getDate() - currentDate.getDay() + i);
      dates.push(date);
    }
    return dates;
  };

  return (
    <div className="flex justify-between items-center p-4 bg-white shadow-md">
      {getWeekDates().map((date, index) => (
        <div key={index} className="text-center">
          <div className="text-xs">
            {["일", "월", "화", "수", "목", "금", "토"][date.getDay()]}
          </div>
          <div
            className={`text-sm font-bold ${
              date.toDateString() === new Date().toDateString()
                ? "text-sky-500"
                : ""
            }`}>
            {date.getDate()}
          </div>
        </div>
      ))}
    </div>
  );
};

export default WeeklyCalendar;
