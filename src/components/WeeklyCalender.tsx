import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface WeeklyCalendarProps {
  onDateClick: (date: Date) => void;
  selectedDate: Date;
}

const WeeklyCalendar: React.FC<WeeklyCalendarProps> = ({
  onDateClick,
  selectedDate,
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getWeekDates = (date: Date) => {
    const dates: Date[] = [];
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay());

    for (let i = 0; i < 7; i++) {
      const newDate = new Date(startOfWeek);
      newDate.setDate(startOfWeek.getDate() + i);
      dates.push(newDate);
    }
    return dates;
  };

  const handleDateClick = (date: Date) => {
    onDateClick(date);
    // 여기에 선택된 날짜에 대한 추가 로직을 구현할 수 있습니다.
    // 예: 부모 컴포넌트에 선택된 날짜 전달
  };

  const changeWeek = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + (direction === "prev" ? -7 : 7));
    setCurrentDate(newDate);
  };

  const weekDates = getWeekDates(currentDate);

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="flex justify-between items-center p-4 border-b">
        <button
          onClick={() => changeWeek("prev")}
          className="text-gray-600 hover:text-gray-800">
          <ChevronLeft size={20} />
        </button>
        <span className="font-semibold">
          {weekDates[0].toLocaleDateString("ko-KR", {
            month: "long",
            year: "numeric",
          })}
        </span>
        <button
          onClick={() => changeWeek("next")}
          className="text-gray-600 hover:text-gray-800">
          <ChevronRight size={20} />
        </button>
      </div>
      <div className="flex justify-between items-center p-4">
        {weekDates.map((date, index) => (
          <div
            key={index}
            className={`text-center cursor-pointer p-2 rounded-full ${
              date.toDateString() === selectedDate.toDateString()
                ? "bg-slate-900 text-white"
                : date.toDateString() === new Date().toDateString()
                ? "text-slate-900"
                : ""
            }`}
            onClick={() => handleDateClick(date)}>
            <div className="text-xs">
              {["일", "월", "화", "수", "목", "금", "토"][date.getDay()]}
            </div>
            <div className="text-sm font-bold">{date.getDate()}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyCalendar;
