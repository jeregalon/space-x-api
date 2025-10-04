import { FaRocket, FaSkullCrossbones } from "react-icons/fa"

export default function LaunchesCard({
  rocket,
  article,
  date,
  details,
  patch,
  success,
  webcast,
}) {
    // console.log(patch)
  return (
    <div className="flex flex-col bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden max-w-md">
      {/* Imagen del logo o parche */}
      <div className="bg-gray-100 flex items-center justify-center h-48">
        {patch ? (
          <img
            src={patch}
            alt="Mission patch"
            className="h-32 object-contain"
          />
        ) : (
          <div className="text-gray-400 italic">Sin imagen</div>
        )}
      </div>

      {/* Contenido principal */}
      <div className="flex flex-col justify-between p-5 flex-1">
        <div>
          <p className="text-sm text-gray-500 mb-1">{date}</p>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Cohete: {rocket}
          </h2>
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
            {details || "Sin detalles disponibles."}
          </p>
        </div>

        {/* Estado de éxito */}
        <div className="flex items-center gap-2 mb-4">
          {success ? (
            <>
              <FaRocket className="text-green-600 w-5 h-5" />
              <span className="text-green-700 font-medium">Exitoso</span>
            </>
          ) : (
            <>
              <FaSkullCrossbones className="text-red-600 w-5 h-5" />
              <span className="text-red-700 font-medium">Fallido</span>
            </>
          )}
        </div>

        {/* Video integrado */}
        {webcast && (
          <div className="aspect-video mb-4 rounded-lg overflow-hidden">
            <iframe
              src={webcast.replace("watch?v=", "embed/")}
              title="Webcast"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
        )}

        {/* Enlace al artículo */}
        {article && (
          <a
            href={article}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 font-medium text-sm self-start transition-colors"
          >
            Leer artículo →
          </a>
        )}
      </div>
    </div>
  )
}
