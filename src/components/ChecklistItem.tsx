import React from "react";

interface ChecklistItemProps {
  label: string;
  isChecked: boolean;
  onToggle: () => void;
}

const ChecklistItem: React.FC<ChecklistItemProps> = ({
  label,
  isChecked,
  onToggle,
}) => {
  return (
    <div className="flex items-center mb-2">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={onToggle}
        className="form-checkbox h-5 w-5 text-sky-600 transition duration-150 ease-in-out mr-2"
        aria-label={`체크리스트 항목: ${label}`}
      />
      <span
        className={`text-sm ${
          isChecked ? "line-through text-gray-500" : "text-gray-700"
        }`}>
        {label}
      </span>
    </div>
  );
};

export default ChecklistItem;
