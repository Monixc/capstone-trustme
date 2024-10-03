"use client";

import React, { useState, useEffect } from "react";
import WeeklyCalendar from "@/components/WeeklyCalender";
import { Book, Save, BarChart2 } from "lucide-react";

const moodEmojis = ["😊", "😃", "😐", "😔", "😡"];

export default function DiaryPage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [diaryTitle, setDiaryTitle] = useState("");
  const [diaryContent, setDiaryContent] = useState("");
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [showMoodSelector, setShowMoodSelector] = useState(false);

  useEffect(() => {
    // 페이지 로드 시 오늘 날짜의 일기 내용을 불러오는 로직
    console.log("오늘 날짜의 일기 내용을 불러옵니다.");
  }, []);

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setAnalysisResult(null);
    // 여기에서 선택된 날짜에 해당하는 일기 내용을 불러오는 로직 추가
    console.log("선택된 날짜의 일기 내용을 불러옵니다:", date);
  };

  const handleSaveDiary = () => {
    // 일기 저장 로직 구현
    console.log("일기 저장:", {
      title: diaryTitle,
      content: diaryContent,
      mood: selectedMood,
    });
    // 저장 후 사용자에게 피드백을 주는 로직 (예: 토스트 메시지) 추가
  };

  const handleAnalyzeDiary = () => {
    // 실제 API 연동 전 임시 분석 결과
    setAnalysisResult("일기 분석 결과가 여기에 표시됩니다.");
  };

  return (
    <main className="p-4 bg-gray-100 min-h-screen">
      <div className="mb-6">
        <WeeklyCalendar
          onDateClick={handleDateClick}
          selectedDate={selectedDate}
        />
      </div>

      <div className="bg-white rounded-xl p-6 shadow-md max-w-2xl mx-auto">
        <input
          type="text"
          value={diaryTitle}
          onChange={(e) => setDiaryTitle(e.target.value)}
          placeholder="일기 제목"
          className="w-full text-2xl font-bold mb-2 focus:outline-none"
        />
        <div className="flex items-center justify-between mb-4">
          <p className="text-gray-600">
            {selectedDate.toLocaleDateString("ko-KR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <div className="relative">
            <button
              onClick={() => setShowMoodSelector(!showMoodSelector)}
              className="text-2xl">
              {selectedMood || "😊"}
            </button>
            {showMoodSelector && (
              <div className="absolute right-0 mt-2 bg-white rounded-lg shadow-md p-2 flex space-x-2">
                {moodEmojis.map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => {
                      setSelectedMood(emoji);
                      setShowMoodSelector(false);
                    }}
                    className="text-2xl hover:bg-gray-100 rounded-full p-1">
                    {emoji}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        <textarea
          className="w-full h-64 p-4 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-slate-900"
          value={diaryContent}
          onChange={(e) => setDiaryContent(e.target.value)}
          placeholder="오늘의 일기를 작성해주세요..."
        />
        <div className="flex justify-end space-x-2">
          <button
            onClick={handleSaveDiary}
            className="px-4 py-2 bg-slate-900 text-white rounded-lg flex items-center hover:bg-slate-800 transition duration-150 ease-in-out">
            <Save className="mr-2" size={18} />
            저장하기
          </button>
          <button
            onClick={handleAnalyzeDiary}
            className="px-4 py-2 bg-sky-600 text-white rounded-lg flex items-center hover:bg-sky-700 transition duration-150 ease-in-out">
            <BarChart2 className="mr-2" size={18} />
            분석하기
          </button>
        </div>
      </div>

      {analysisResult && (
        <div className="mt-6 bg-white rounded-xl p-6 shadow-md max-w-2xl mx-auto">
          <h3 className="text-lg font-bold mb-2 flex items-center">
            <BarChart2 className="mr-2" />
            감정 분석 결과
          </h3>
          <p className="text-gray-700">{analysisResult}</p>
        </div>
      )}
    </main>
  );
}
