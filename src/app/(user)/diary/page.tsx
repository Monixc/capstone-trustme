"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import WeeklyCalendar from "@/components/WeeklyCalender";
import { Save, BarChart2, Edit } from "lucide-react";

const moodEmojis = ["😊", "😃", "😐", "😔", "😡", "☀️", "⛅", "🌇", "🌙", "🌕"];

export default function DiaryPage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [showMoodSelector, setShowMoodSelector] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [savedDiary, setSavedDiary] = useState<{
    title: string;
    content: string;
    mood: string | null;
  } | null>(null);

  const titleInputRef = useRef<HTMLInputElement>(null);
  const contentTextareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    loadDiaryForDate(new Date());
  }, []);

  const loadDiaryForDate = useCallback((date: Date) => {
    const hasDiary = Math.random() > 0.5;
    if (hasDiary) {
      setSavedDiary({
        title: `${date.toLocaleDateString()} 일기`,
        content: "이날의 일기 내용입니다...",
        mood: moodEmojis[Math.floor(Math.random() * moodEmojis.length)],
      });
    } else {
      setSavedDiary(null);
    }
    if (titleInputRef.current) titleInputRef.current.value = "";
    if (contentTextareaRef.current) contentTextareaRef.current.value = "";
    setSelectedMood(null);
  }, []);

  const handleDateClick = useCallback(
    (date: Date) => {
      setSelectedDate(date);
      setAnalysisResult(null);
      loadDiaryForDate(date);
    },
    [loadDiaryForDate]
  );

  const handleSaveDiary = useCallback(() => {
    const title = titleInputRef.current?.value || "";
    const content = contentTextareaRef.current?.value || "";

    if (content.trim() === "") {
      setShowWarning(true);
      return;
    }
    setShowWarning(false);
    console.log("일기 저장:", { title, content, selectedMood });
    setSavedDiary({
      title,
      content,
      mood: selectedMood,
    });
  }, [selectedMood]);

  const handleAnalyzeDiary = useCallback(() => {
    const contentToAnalyze = savedDiary
      ? savedDiary.content
      : contentTextareaRef.current?.value || "";
    if (!contentToAnalyze || contentToAnalyze.trim() === "") {
      setShowWarning(true);
      return;
    }
    setShowWarning(false);
    setAnalysisResult("일기 분석 결과가 여기에 표시됩니다.");
  }, [savedDiary]);

  const handleEdit = useCallback(() => {
    if (titleInputRef.current)
      titleInputRef.current.value = savedDiary?.title || "";
    if (contentTextareaRef.current)
      contentTextareaRef.current.value = savedDiary?.content || "";
    setSelectedMood(savedDiary?.mood || null);
    setSavedDiary(null);
  }, [savedDiary]);

  const DiaryInput = () => (
    <>
      <input
        ref={titleInputRef}
        type="text"
        defaultValue=""
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
            <div className="absolute right-0 mt-2 bg-white rounded-lg shadow-md p-2">
              <div
                className="flex flex-wrap space-x-2"
                style={{ width: "250px" }}>
                {moodEmojis.map((emoji, index) => (
                  <React.Fragment key={emoji}>
                    {index % 5 === 0 && index !== 0 && (
                      <div className="w-full h-2" />
                    )}
                    <button
                      onClick={() => {
                        setSelectedMood(emoji);
                        setShowMoodSelector(false);
                      }}
                      className="text-2xl hover:bg-gray-100 rounded-full p-1">
                      {emoji}
                    </button>
                  </React.Fragment>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <textarea
        ref={contentTextareaRef}
        className="w-full h-64 p-4 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-slate-900"
        defaultValue=""
        placeholder="오늘의 일기를 작성해주세요..."
        onChange={() => setShowWarning(false)}
      />
      {showWarning && <p className="text-red-500 mb-2">내용을 입력해주세요.</p>}
    </>
  );

  return (
    <main className="p-4 bg-white min-h-screen">
      <div className="mb-6">
        <WeeklyCalendar
          onDateClick={handleDateClick}
          selectedDate={selectedDate}
        />
      </div>

      <div className="bg-white rounded-xl p-6 shadow-md max-w-2xl mx-auto">
        {savedDiary ? (
          <>
            <h2 className="text-2xl font-bold mb-2">{savedDiary.title}</h2>
            <div className="flex items-center justify-between mb-4">
              <p className="text-gray-600">
                {selectedDate.toLocaleDateString("ko-KR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <span className="text-2xl">{savedDiary.mood}</span>
            </div>
            <p className="mb-4 whitespace-pre-wrap">{savedDiary.content}</p>
          </>
        ) : (
          <DiaryInput />
        )}
        <div className="flex justify-end space-x-2">
          {savedDiary ? (
            <button
              onClick={handleEdit}
              className="px-4 py-2 bg-slate-900 text-white rounded-lg flex items-center hover:bg-slate-800 transition duration-150 ease-in-out">
              <Edit className="mr-2" size={18} />
              수정하기
            </button>
          ) : (
            <button
              onClick={handleSaveDiary}
              className="px-4 py-2 bg-slate-900 text-white rounded-lg flex items-center hover:bg-slate-800 transition duration-150 ease-in-out">
              <Save className="mr-2" size={18} />
              저장하기
            </button>
          )}
          <button
            onClick={handleAnalyzeDiary}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg flex items-center hover:bg-purple-900 transition duration-150 ease-in-out">
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
