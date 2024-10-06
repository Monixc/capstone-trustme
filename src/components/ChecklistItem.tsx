import React, { useState } from "react";
import { useSwipeable } from "react-swipeable";
import { Edit2, Trash2 } from "lucide-react";

interface ChecklistItemProps {
  label: string;
  isChecked: boolean;
  onToggle: () => void;
  onEdit: (newLabel: string) => void;
  onDelete: () => void;
}

const ChecklistItem: React.FC<ChecklistItemProps> = ({
  label,
  isChecked,
  onToggle,
  onEdit,
  onDelete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedLabel, setEditedLabel] = useState(label);
  const [isSwipedOpen, setIsSwipedOpen] = useState(false);

  const handlers = useSwipeable({
    onSwipedLeft: () => setIsSwipedOpen(true),
    onSwipedRight: () => setIsSwipedOpen(false),
    trackMouse: true,
  });

  const handleEdit = () => {
    if (isEditing) {
      onEdit(editedLabel);
    }
    setIsEditing(!isEditing);
    setIsSwipedOpen(false);
  };

  const handleDelete = () => {
    onDelete();
    setIsSwipedOpen(false);
  };

  return (
    <div className="relative overflow-hidden mb-2">
      <div
        {...handlers}
        className={`flex items-center bg-white rounded-lg p-3 shadow-sm transition-transform duration-300 ease-in-out ${
          isSwipedOpen ? "-translate-x-24" : ""
        }`}>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={onToggle}
          className="form-checkbox h-5 w-5 text-sky-600 rounded-full transition duration-150 ease-in-out mr-3"
          aria-label={`체크리스트 항목: ${label}`}
        />
        {isEditing ? (
          <input
            type="text"
            value={editedLabel}
            onChange={(e) => setEditedLabel(e.target.value)}
            className="flex-grow text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 rounded px-2 py-1"
            autoFocus
            onBlur={handleEdit}
            onKeyPress={(e) => e.key === "Enter" && handleEdit()}
          />
        ) : (
          <span
            className={`text-sm flex-grow ${
              isChecked ? "line-through text-gray-500" : "text-gray-700"
            }`}>
            {label}
          </span>
        )}
      </div>
      {isSwipedOpen && (
        <div className="absolute top-0 right-0 h-full flex">
          <button
            onClick={handleEdit}
            className="bg-sky-500 text-white px-3 flex items-center justify-center">
            <Edit2 size={18} />
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-3 flex items-center justify-center">
            <Trash2 size={18} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ChecklistItem;
