"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import WeeklyCalendar from "@/components/WeeklyCalender";
import { Save, BarChart2, Edit } from "lucide-react";

const moodEmojis = ["😊", "😃", "😐", "😔", "😡", "☀️", "⛅", "🌇", "🌙", "🌕"];

export default function DiaryPage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [diaryTitle, setDiaryTitle] = useState("");
  const [diaryContent, setDiaryContent] = useState("");
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
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    // 페이지 로드 시 오늘 날짜의 일기 내용을 불러오는 로직
    loadDiaryForDate(new Date());
  }, []);

  const loadDiaryForDate = (date: Date) => {
    // 여기에서 실제로 해당 날짜의 일기를 불러오는 로직을 구현
    // 지금은 임시로 랜덤하게 일기가 있거나 없는 상태 구현
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
    setDiaryTitle("");
    setDiaryContent("");
    setSelectedMood(null);
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setAnalysisResult(null);
    loadDiaryForDate(date);
  };

  const handleSaveDiary = () => {
    if (diaryContent.trim() === "") {
      setShowWarning(true);
      return;
    }
    setShowWarning(false);
    // 일기 저장 로직 구현
    console.log("일기 저장:", {
      title: diaryTitle,
      content: diaryContent,
      mood: selectedMood,
    });
    setSavedDiary({
      title: diaryTitle,
      content: diaryContent,
      mood: selectedMood,
    });
  };

  const handleAnalyzeDiary = () => {
    const contentToAnalyze = savedDiary ? savedDiary.content : diaryContent;
    if (!contentToAnalyze || contentToAnalyze.trim() === "") {
      setShowWarning(true);
      return;
    }
    setShowWarning(false);
    // 실제 API 연동 전 임시 분석 결과
    setAnalysisResult("일기 분석 결과가 여기에 표시됩니다.");
  };

  const handleEdit = () => {
    setDiaryTitle(savedDiary?.title || "");
    setDiaryContent(savedDiary?.content || "");
    setSelectedMood(savedDiary?.mood || null);
    setSavedDiary(null);
  };

  const handleTitleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setDiaryTitle(e.target.value);
    },
    []
  );

  const handleContentChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setDiaryContent(e.target.value);
      setShowWarning(false);
    },
    []
  );

  useEffect(() => {
    if (titleInputRef.current) {
      titleInputRef.current.focus();
      const length = titleInputRef.current.value.length;
      titleInputRef.current.setSelectionRange(length, length);
    }
  }, [diaryTitle]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
      const length = textareaRef.current.value.length;
      textareaRef.current.setSelectionRange(length, length);
    }
  }, [diaryContent]);

  const DiaryInput = () => (
    <>
      <input
        ref={titleInputRef}
        type="text"
        value={diaryTitle}
        onChange={handleTitleChange}
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
        ref={textareaRef}
        className="w-full h-64 p-4 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-slate-900"
        value={diaryContent}
        onChange={handleContentChange}
        placeholder="오늘의 일기를 작성해주세요..."
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
