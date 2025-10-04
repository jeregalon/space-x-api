import { useEffect, useState } from "react"
import useOnScreen from "../hooks/useOnScreen"
import useCachedAsset from "../hooks/useCachedAsset"
import { FaRocket, FaSkullCrossbones } from "react-icons/fa"
import { formatCustomDate, getRocketById } from "../services/functions"

function extractYouTubeId(url) {
  const match = url.match(/(?:youtu\.be\/|v=)([A-Za-z0-9_-]+)/)
  return match ? match[1] : null
}

export default function LaunchesCard({
  rocketID,
  article,
  date,
  details,
  patch,
  success,
  webcast,
}) {
  const [ref, visible] = useOnScreen({ rootMargin: "150px" })
  const [rocketName, setRocketName] = useState("")
  const [error, setError] = useState(null)
  const [videoSrc, setVideoSrc] = useState(null)

  // 🚀 Cargar nombre del cohete
  useEffect(() => {
    async function fetchRocket() {
      try {
        setError(null)
        const rocketData = await getRocketById(rocketID)
        setRocketName(rocketData?.name || "")
      } catch (e) {
        setError(e.message)
      }
    }
    if (rocketID) fetchRocket()
  }, [rocketID])

  // 🧩 Cachear el parche de misión y thumbnail del webcast
  const videoId = webcast ? extractYouTubeId(webcast) : null
  const patchUrl = useCachedAsset(patch, visible)
  const thumbnailUrl = useCachedAsset(
    videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : null,
    visible
  )

  // 🎥 Cargar video solo la primera vez que es visible
  useEffect(() => {
    if (visible && webcast && !videoSrc) {
      setVideoSrc(webcast.replace("watch?v=", "embed/"))
    }
  }, [visible, webcast, videoSrc])

  return (
    <div
      ref={ref}
      className="flex flex-col mt-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden max-w-md"
    >
      {/* Imagen del parche */}
      <div className="bg-gray-100 flex items-center justify-center h-48">
        {visible ? (
          patchUrl ? (
            <img
              src={patchUrl}
              alt="Mission patch"
              loading="lazy"
              className="h-32 object-contain transition-transform duration-500 hover:scale-105"
            />
          ) : patch ? (
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
          <div className="h-32 w-32 bg-gray-200 animate-pulse rounded" />
        )}
      </div>

      {/* Contenido */}
      <div className="flex flex-col justify-between p-5 flex-1">
        <div>
          <p className="text-sm text-gray-500 mb-1">{formatCustomDate(date)}</p>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Cohete: {error ? error : rocketName}
          </h2>
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
            {details || "Sin detalles disponibles."}
          </p>
        </div>

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

        {/* Video */}
        {webcast && (
          <div className="aspect-video mb-4 rounded-lg overflow-hidden">
            <iframe
              src={videoSrc || ""}
              title="Webcast"
              allowFullScreen
              loading="lazy"
              className={`w-full h-full transition-opacity duration-500 ${
                videoSrc ? "opacity-100" : "opacity-0"
              }`}
            ></iframe>
          </div>
        )}

        {/* Miniatura del video */}
        {!visible && thumbnailUrl && (
          <img
            src={thumbnailUrl}
            alt="Video thumbnail"
            className="rounded-lg mb-4 w-full object-cover"
          />
        )}

        {/* Artículo */}
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
