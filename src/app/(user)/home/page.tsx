"use client";

import ChecklistItem from "@/components/ChecklistItem";
import WeeklyCalendar from "@/components/WeeklyCalender";
import { useState } from "react";

const defaultChecklist = [
  "문",
  "가스레인지",
  "냉장고",
  "창문",
  "수도",
  "콘센트",
];

export default function HomePage() {
  const [checklists, setChecklists] = useState([defaultChecklist]);
  const [newItem, setNewItem] = useState("");
  const [checklistTitles, setChecklistTitles] = useState(["체크리스트 1"]);
  const [editingTitle, setEditingTitle] = useState<number | null>(null);

  const addItemToChecklist = (checklistIndex: number) => {
    if (newItem.trim()) {
      const updatedChecklists = [...checklists];
      updatedChecklists[checklistIndex] = [
        ...updatedChecklists[checklistIndex],
        newItem.trim(),
      ];
      setChecklists(updatedChecklists);
      setNewItem("");
    }
  };

  const addNewChecklist = () => {
    setChecklists([...checklists, []]);
    setChecklistTitles([
      ...checklistTitles,
      `체크리스트 ${checklistTitles.length + 1}`,
    ]);
  };

  const handleTitleClick = (index: number) => {
    setEditingTitle(index);
  };

  const handleTitleChange = (index: number, newTitle: string) => {
    const updatedTitles = [...checklistTitles];
    updatedTitles[index] = newTitle;
    setChecklistTitles(updatedTitles);
  };

  const handleTitleBlur = () => {
    setEditingTitle(null);
  };

  return (
    <main className="p-4">
      <WeeklyCalendar />
      <div className="mt-4">
        {checklists.map((checklist, checklistIndex) => (
          <div
            key={checklistIndex}
            className="bg-white shadow-md rounded-lg p-4 mb-4">
            {editingTitle === checklistIndex ? (
              <input
                type="text"
                value={checklistTitles[checklistIndex]}
                onChange={(e) =>
                  handleTitleChange(checklistIndex, e.target.value)
                }
                onBlur={handleTitleBlur}
                className="text-lg font-bold mb-2 w-full"
                autoFocus
              />
            ) : (
              <h2
                className="text-lg font-bold mb-2 cursor-pointer"
                onClick={() => handleTitleClick(checklistIndex)}>
                {checklistTitles[checklistIndex]}
              </h2>
            )}
            {checklist.map((item, itemIndex) => (
              <ChecklistItem key={itemIndex} label={item} />
            ))}
            <div className="flex mt-2">
              <input
                type="text"
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                placeholder="새 항목 추가"
                className="flex-grow border rounded-l px-2 py-1"
              />
              <button
                onClick={() => addItemToChecklist(checklistIndex)}
                className="bg-sky-500 text-white px-4 py-1 rounded-r">
                추가
              </button>
            </div>
          </div>
        ))}
        <button
          onClick={addNewChecklist}
          className="w-full bg-gray-200 text-gray-700 py-2 rounded-lg mt-4">
          새 체크리스트 추가
        </button>
      </div>
    </main>
  );
}
