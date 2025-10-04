import { formatCustomDate } from "../services/functions"

export default function HistoryCard({ title, article, date, details }) {
  return (
    <div className="flex flex-col justify-between w-full max-w-sm h-60 mt-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-2">
          {title}
        </h2>
        <p className="text-gray-600 text-sm line-clamp-3 mb-4">
          {details}
        </p>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-500">
        <p>{formatCustomDate(date)}</p>
        <a href={article} target="_blank" rel="noopener noreferrer">
            Leer más →
        </a>
      </div>
    </div>
  )
}
