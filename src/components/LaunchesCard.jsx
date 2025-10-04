import { useEffect, useRef, useState } from "react"
import { FaRocket, FaSkullCrossbones } from "react-icons/fa"

// 👇 Hook reutilizable para detectar si el elemento está visible en pantalla
function useOnScreen(options) {
  const ref = useRef()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true)
        observer.unobserve(entry.target) // Deja de observar una vez visible
      }
    }, options)

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [options])

  return [ref, isVisible]
}

// 👇 Componente principal
export default function LaunchesCard({
  rocket,
  article,
  date,
  details,
  patch,
  success,
  webcast,
}) {
  // Usamos el hook para saber cuándo cargar imagen y video
  const [ref, visible] = useOnScreen({ rootMargin: "150px" })

  return (
    <div
      ref={ref}
      className="flex flex-col bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden max-w-md"
    >
      {/* Imagen del parche */}
      <div className="bg-gray-100 flex items-center justify-center h-48">
        {visible ? (
          patch ? (
            <img
              src={patch}
              alt="Mission patch"
              loading="lazy"
              className="h-32 object-contain transition-transform duration-500 hover:scale-105"
            />
          ) : (
            <div className="text-gray-400 italic">Sin imagen</div>
          )
        ) : (
          // Skeleton loader mientras no está visible
          <div className="h-32 w-32 bg-gray-200 animate-pulse rounded" />
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
              <FaRocket className="text-green-600 w-5 h-5 animate-bounce" />
              <span className="text-green-700 font-medium">Exitoso</span>
            </>
          ) : (
            <>
              <FaSkullCrossbones className="text-red-600 w-5 h-5 rotate-12" />
              <span className="text-red-700 font-medium">Fallido</span>
            </>
          )}
        </div>

        {/* Video integrado (solo se carga cuando es visible) */}
        {visible && webcast && (
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
