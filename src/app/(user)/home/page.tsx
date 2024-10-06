"use client";

import ChecklistItem from "@/components/ChecklistItem";
import WeeklyCalendar from "@/components/WeeklyCalender";
import { useState } from "react";
import { Plus, MoreVertical, PaintBucket, Trash2 } from "lucide-react";

const defaultChecklist = [
  "문",
  "가스레인지",
  "냉장고",
  "창문",
  "수도",
  "콘센트",
];

const slateColors = [
  "bg-slate-300",
  "bg-slate-400",
  "bg-slate-500",
  "bg-slate-600",
  "bg-slate-700",
];

export default function HomePage() {
  const [checklists, setChecklists] = useState([defaultChecklist]);
  const [newItem, setNewItem] = useState("");
  const [checklistTitles, setChecklistTitles] = useState(["체크리스트 1"]);
  const [editingTitle, setEditingTitle] = useState<number | null>(null);
  const [checkedItems, setCheckedItems] = useState<boolean[][]>([
    defaultChecklist.map(() => false),
  ]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [checklistColors, setChecklistColors] = useState<string[]>([
    slateColors[0],
  ]);
  const [openPopupIndex, setOpenPopupIndex] = useState<number | null>(null);

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

  const handleMoreClick = (index: number) => {
    setOpenPopupIndex(openPopupIndex === index ? null : index);
  };

  const handleColorChange = (index: number, color: string) => {
    const updatedColors = [...checklistColors];
    updatedColors[index] = color;
    setChecklistColors(updatedColors);
    setOpenPopupIndex(null);
  };

  const addNewChecklist = () => {
    setChecklists([...checklists, []]);
    setChecklistTitles([
      ...checklistTitles,
      `체크리스트 ${checklistTitles.length + 1}`,
    ]);
    setCheckedItems([...checkedItems, []]);
    setChecklistColors([...checklistColors, slateColors[0]]);
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

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    // 여기에 선택된 날짜에 따른 체크리스트 로드 로직을 추가
    console.log("선택된 날짜:", date);
  };

  const handleDeleteChecklist = (index: number) => {
    const updatedChecklists = [...checklists];
    updatedChecklists.splice(index, 1);
    setChecklists(updatedChecklists);

    const updatedTitles = [...checklistTitles];
    updatedTitles.splice(index, 1);
    setChecklistTitles(updatedTitles);

    const updatedCheckedItems = [...checkedItems];
    updatedCheckedItems.splice(index, 1);
    setCheckedItems(updatedCheckedItems);

    const updatedColors = [...checklistColors];
    updatedColors.splice(index, 1);
    setChecklistColors(updatedColors);

    setOpenPopupIndex(null);
  };

  return (
    <main className="p-4 bg-gray-100">
      <WeeklyCalendar
        onDateClick={handleDateClick}
        selectedDate={selectedDate}
      />
      <div className="mt-4 space-y-4">
        {checklists.map((checklist, checklistIndex) => (
          <div
            key={checklistIndex}
            className="bg-white rounded-xl p-4 shadow-md relative overflow-hidden">
            <div
              className={`absolute left-0 top-0 bottom-0 w-3 ${checklistColors[checklistIndex]} rounded-l-xl`}></div>
            <div className="ml-4">
              <div className="flex justify-between items-center mb-2 relative">
                {editingTitle === checklistIndex ? (
                  <input
                    type="text"
                    value={checklistTitles[checklistIndex]}
                    onChange={(e) =>
                      handleTitleChange(checklistIndex, e.target.value)
                    }
                    onBlur={handleTitleBlur}
                    className="text-lg font-bold w-full focus:outline-none focus:ring-2 focus:ring-slate-900 rounded px-2 py-1"
                    autoFocus
                  />
                ) : (
                  <h2
                    className="text-lg font-bold cursor-pointer"
                    onClick={() => handleTitleClick(checklistIndex)}>
                    {checklistTitles[checklistIndex]}
                  </h2>
                )}
                <div className="relative">
                  <button
                    onClick={() => handleMoreClick(checklistIndex)}
                    className="text-gray-500 hover:text-gray-700">
                    <MoreVertical size={20} />
                  </button>
                  {openPopupIndex === checklistIndex && (
                    <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-md shadow-lg z-50">
                      <div className="py-1">
                        <div className="px-4 py-2 text-sm text-gray-700">
                          <p className="mb-2 flex items-center">
                            <PaintBucket size={16} className="mr-2" />
                            색상 변경
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {slateColors.map((color, colorIndex) => (
                              <button
                                key={colorIndex}
                                onClick={() =>
                                  handleColorChange(checklistIndex, color)
                                }
                                className={`w-6 h-6 rounded-full ${color}`}
                              />
                            ))}
                          </div>
                          <button
                            onClick={() =>
                              handleDeleteChecklist(checklistIndex)
                            }
                            className="flex items-center text-red-500 mt-4 hover:text-red-700 w-full">
                            <Trash2 size={16} className="mr-2" />
                            체크리스트 삭제
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
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
