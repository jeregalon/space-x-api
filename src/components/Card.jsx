import { formatCustomDate } from "../services/functions"

export default function Card({
    children,
    title, 
    article, 
    date, 
    details
}) {
  return (
    <div className="[&_h1]:text-xl [&_p]:text-base flex flex-col justify-between w-[70vw] my-6 bg-[#fff] opacity-80 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2 line-clamp-2">
          {title}
        </h2>
        <p className="text-gray-600 text-base line-clamp-3 mb-4">
          {details}
        </p>
      </div>

      {children}

      <div className="flex items-center justify-between text-gray-500">
        <p>{`${date 
            ? formatCustomDate(date)
            : ""
        }`}</p>
        <a href={article} target="_blank" rel="noopener noreferrer">
            Leer más →
        </a>
      </div>
    </div>
  )
}
