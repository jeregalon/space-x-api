export function ToggleSwitch({ checked, onChange, labelLeft, labelRight }) {
  return (
    <div className="flex items-center gap-2">
      <span>{labelLeft}</span>
      <button
        onClick={() => onChange(!checked)}
        className={`relative w-10 h-5 rounded-full transition-colors duration-300 ${
          checked ? "bg-blue-500" : "bg-gray-300"
        }`}
      >
        <span
          className={`absolute top-[2px] left-[2px] w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform duration-300 ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
      <span>{labelRight}</span>
    </div>
  )
}