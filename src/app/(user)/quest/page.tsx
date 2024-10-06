"use client";

import React, { useState, useEffect } from "react";
import { Plus, ChevronDown, ChevronUp, X, AlertTriangle } from "lucide-react";

interface Quest {
  id: number;
  title: string;
  completed: boolean;
  description: string;
}

const initialQuests: Quest[] = [
  {
    id: 1,
    title: "시간 지연하기",
    completed: false,
    description:
      "확인하고 싶은 충동이 들 때 5분간 기다려보세요. 이는 불안 감정이 자연스럽게 감소하는 것을 경험하게 해줍니다. 시간이 지날수록 불안이 줄어드는 것을 관찰하세요.",
  },
  {
    id: 2,
    title: "단계별로 노출하기",
    completed: false,
    description:
      "불안한 상황에 조금씩 노출되어 적응해 나가세요. 가장 덜 불안한 상황부터 시작하여 점진적으로 더 불안한 상황에 도전하세요. 각 단계에서 충분히 적응할 때까지 반복합니다.",
  },
  {
    id: 3,
    title: "대체 활동하기",
    completed: false,
    description:
      "확인 대신 다른 활동으로 주의를 돌려보세요. 좋아하는 취미활동이나 운동을 하는 것이 도움이 될 수 있습니다. 이는 강박적 사고에서 벗어나는 데 도움을 줍니다.",
  },
  {
    id: 4,
    title: "감정 기록하기",
    completed: false,
    description:
      "불안한 감정이 들 때마다 기록해보세요. 언제, 어디서, 어떤 상황에서 불안이 생겼는지, 그 강도는 어떠한지 적어보세요. 이를 통해 불안 패턴을 파악하고 관리할 수 있습니다.",
  },
  {
    id: 5,
    title: "함께하기",
    completed: false,
    description:
      "친구나 가족과 함께 활동하며 불안을 줄여보세요. 지지적인 환경에서 ERP 연습을 하면 더 효과적일 수 있습니다. 함께하는 사람에게 당신의 목표와 진행 상황을 공유해보세요.",
  },
];

export default function QuestPage() {
  const [quests, setQuests] = useState<Quest[]>(initialQuests);
  const [experience, setExperience] = useState(0);
  const [expandedQuest, setExpandedQuest] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newQuest, setNewQuest] = useState({ title: "", description: "" });

  useEffect(() => {
    const storedQuests = localStorage.getItem("quests");
    const storedExperience = localStorage.getItem("experience");
    if (storedQuests) setQuests(JSON.parse(storedQuests));
    if (storedExperience) setExperience(Number(storedExperience));
  }, []);

  useEffect(() => {
    localStorage.setItem("quests", JSON.stringify(quests));
    localStorage.setItem("experience", experience.toString());
  }, [quests, experience]);

  const toggleQuest = (id: number) => {
    setQuests(
      quests.map((quest) =>
        quest.id === id ? { ...quest, completed: true } : quest
      )
    );
    if (!quests.find((q) => q.id === id)?.completed) {
      setExperience((exp) => exp + 10);
    }
  };

  const addQuest = () => {
    if (newQuest.title && newQuest.description) {
      const newQuestItem: Quest = {
        id: Date.now(),
        title: newQuest.title,
        completed: false,
        description: newQuest.description,
      };
      setQuests([...quests, newQuestItem]);
      setNewQuest({ title: "", description: "" });
      setIsModalOpen(false);
    }
  };

  const toggleDescription = (id: number) => {
    setExpandedQuest(expandedQuest === id ? null : id);
  };

  return (
    <main className="p-4 bg-white min-h-screen">
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">경험치</h2>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-slate-900 h-2.5 rounded-full"
            style={{ width: `${experience % 100}%` }}></div>
        </div>
        <p className="text-sm mt-1">레벨 {Math.floor(experience / 100) + 1}</p>
      </div>

      <h1 className="text-2xl font-bold mb-4">오늘의 퀘스트</h1>

      <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4 rounded-r-lg">
        <div className="flex items-center">
          <AlertTriangle className="mr-2" />
          <p className="font-bold">주의</p>
        </div>
        <p className="mt-2">
          본 퀘스트는 노출반응예방치료(ERP)를 기반으로 제시되는 것입니다. 이는
          일반적인 가이드라인이며, 개인의 상황에 따라 효과가 다를 수 있습니다.
          심각한 증상이 있다면 반드시 전문가와 상담하시기 바랍ㄴ니다.
        </p>
      </div>

      <ul className="space-y-4">
        {quests.map((quest) => (
          <li
            key={quest.id}
            className="bg-white p-4 rounded-lg shadow cursor-pointer"
            onClick={() => toggleDescription(quest.id)}>
            <div className="flex items-center justify-between">
              <div className="flex items-center flex-grow">
                <input
                  type="checkbox"
                  checked={quest.completed}
                  onChange={(e) => {
                    e.stopPropagation();
                    if (!quest.completed) {
                      toggleQuest(quest.id);
                    }
                  }}
                  className="mr-3"
                  disabled={quest.completed}
                />
                <span className={quest.completed ? "line-through" : ""}>
                  {quest.title}
                </span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleDescription(quest.id);
                }}
                className="ml-2 flex-shrink-0">
                {expandedQuest === quest.id ? <ChevronUp /> : <ChevronDown />}
              </button>
            </div>
            {expandedQuest === quest.id && (
              <p className="mt-2 text-gray-600">{quest.description}</p>
            )}
          </li>
        ))}
      </ul>

      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-20 right-4 w-14 h-14 bg-slate-900 text-white rounded-full shadow-lg flex items-center justify-center">
        <Plus size={24} />
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50">
          <div className="bg-white w-full max-w-[480px] rounded-t-2xl p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">새 퀘스트 추가</h3>
              <button onClick={() => setIsModalOpen(false)}>
                <X size={24} />
              </button>
            </div>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="퀘스트 제목"
                value={newQuest.title}
                onChange={(e) =>
                  setNewQuest({ ...newQuest, title: e.target.value })
                }
                className="w-full p-2 border rounded-lg"
              />
              <textarea
                placeholder="퀘스트 설명"
                value={newQuest.description}
                onChange={(e) =>
                  setNewQuest({ ...newQuest, description: e.target.value })
                }
                className="w-full p-2 border rounded-lg h-24"
              />
              <button
                onClick={addQuest}
                className="w-full bg-slate-900 text-white p-2 rounded-lg">
                퀘스트 추가
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
