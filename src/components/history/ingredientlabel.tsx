interface IngredientLabelProps {
  label: string;
  count: number;
  color: string;
  textColor: string;
  borderColor: string;
  icon: "allergen" | "warning" | "check";
}

export default function IngredientLabel({
  label,
  count,
  color,
  textColor,
  borderColor,
  icon,
}: IngredientLabelProps) {
  return (
    <div
      className={`flex items-center justify-between rounded-full border px-4 py-2 text-sm ${borderColor}`}
    >
      <div className="flex items-center">
        {icon === "allergen" && (
          <span className="mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-yellow-600"
            >
              <path d="M8.3 10a.7.7 0 0 1-.626-1.079L11.4 3a.7.7 0 0 1 1.198-.043L16.3 8.9a.7.7 0 0 1-.572 1.1H8.3z" />
              <rect x="3" y="14" width="7" height="7" rx="1" />
              <circle cx="17.5" cy="17.5" r="3.5" />
            </svg>
          </span>
        )}
        {icon === "warning" && (
          <span className="mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-red-600"
            >
              <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
              <path d="M12 9v4" />
              <path d="M12 17h.01" />
            </svg>
          </span>
        )}
        {icon === "check" && (
          <span className="mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-green-600"
            >
              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
          </span>
        )}
        <span className={`font-medium ${textColor}`}>{label}</span>
      </div>
      <div className="ml-3 flex items-center">
        <span
          className={`inline-flex h-8 w-8 items-center justify-center rounded-full ${color} font-bold text-white`}
        >
          {count}
        </span>
      </div>
    </div>
  );
}
