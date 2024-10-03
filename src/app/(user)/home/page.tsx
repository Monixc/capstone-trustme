"use client";

import ChecklistItem from "@/components/ChecklistItem";
import WeeklyCalendar from "@/components/WeeklyCalender";
import { useState } from "react";
import { Plus, X } from "lucide-react";

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
  const [checkedItems, setCheckedItems] = useState<boolean[][]>([
    defaultChecklist.map(() => false),
  ]);

  const addItemToChecklist = (checklistIndex: number) => {
    if (newItem.trim()) {
      const updatedChecklists = [...checklists];
      updatedChecklists[checklistIndex] = [
        ...updatedChecklists[checklistIndex],
        newItem.trim(),
      ];
      setChecklists(updatedChecklists);

      const updatedCheckedItems = [...checkedItems];
      updatedCheckedItems[checklistIndex] = [
        ...updatedCheckedItems[checklistIndex],
        false,
      ];
      setCheckedItems(updatedCheckedItems);

      setNewItem("");
    }
  };

  const addNewChecklist = () => {
    setChecklists([...checklists, []]);
    setChecklistTitles([
      ...checklistTitles,
      `체크리스트 ${checklistTitles.length + 1}`,
    ]);
    setCheckedItems([...checkedItems, []]);
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

  const handleItemToggle = (checklistIndex: number, itemIndex: number) => {
    const updatedCheckedItems = [...checkedItems];
    updatedCheckedItems[checklistIndex][itemIndex] =
      !updatedCheckedItems[checklistIndex][itemIndex];
    setCheckedItems(updatedCheckedItems);
  };

  const handleItemEdit = (
    checklistIndex: number,
    itemIndex: number,
    newLabel: string
  ) => {
    const updatedChecklists = [...checklists];
    updatedChecklists[checklistIndex][itemIndex] = newLabel;
    setChecklists(updatedChecklists);
  };

  const handleItemDelete = (checklistIndex: number, itemIndex: number) => {
    const updatedChecklists = [...checklists];
    updatedChecklists[checklistIndex].splice(itemIndex, 1);
    setChecklists(updatedChecklists);

    const updatedCheckedItems = [...checkedItems];
    updatedCheckedItems[checklistIndex].splice(itemIndex, 1);
    setCheckedItems(updatedCheckedItems);
  };

  return (
    <main className="p-4 bg-gray-100">
      <WeeklyCalendar />
      <div className="mt-4 space-y-4">
        {checklists.map((checklist, checklistIndex) => (
          <div
            key={checklistIndex}
            className="bg-white rounded-xl p-4 shadow-md">
            {editingTitle === checklistIndex ? (
              <input
                type="text"
                value={checklistTitles[checklistIndex]}
                onChange={(e) =>
                  handleTitleChange(checklistIndex, e.target.value)
                }
                onBlur={handleTitleBlur}
                className="text-lg font-bold mb-2 w-full focus:outline-none focus:ring-2 focus:ring-slate-900 rounded px-2 py-1"
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
              <ChecklistItem
                key={itemIndex}
                label={item}
                isChecked={checkedItems[checklistIndex][itemIndex]}
                onToggle={() => handleItemToggle(checklistIndex, itemIndex)}
                onEdit={(newLabel) =>
                  handleItemEdit(checklistIndex, itemIndex, newLabel)
                }
                onDelete={() => handleItemDelete(checklistIndex, itemIndex)}
              />
            ))}
            <div className="flex mt-2">
              <input
                type="text"
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                placeholder="새 항목 추가"
                className="flex-grow border rounded-l-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
              <button
                onClick={() => addItemToChecklist(checklistIndex)}
                className="bg-slate-900 text-white px-4 py-2 rounded-r-lg hover:bg-slate-800 transition duration-150 ease-in-out">
                <Plus size={18} />
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
