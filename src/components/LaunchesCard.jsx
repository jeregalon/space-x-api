import { useEffect, useState } from "react"
import useOnScreen from "../hooks/useOnScreen"
import useCachedAsset from "../hooks/useCachedAsset"
import { FaRocket, FaSkullCrossbones } from "react-icons/fa"
import { formatCustomDate, getRocketById } from "../services/functions"
import Card from "./Card"

function extractYouTubeId(url) {
  const match = url.match(/(?:youtu\.be\/|v=)([A-Za-z0-9_-]+)/)
  return match ? match[1] : null
}

export default function LaunchesCard({
  name,
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
    <Card
      title={name}
      article={article}
      date={date}
    >
      <div
        ref={ref}
      >
        <div className="flex justify-between">
          {/*Patch*/}
          <div className="w-48 h-48">
            {visible ? (
              patchUrl ? (
                <img
                  src={patchUrl}
                  alt="Mission patch"
                  loading="lazy"
                  className="h-full object-contain transition-transform duration-500 hover:scale-105"
                />
              ) : patch ? (
                <img
                  src={patch}
                  alt="Mission patch"
                  loading="lazy"
                  className="h-full object-contain transition-transform duration-500 hover:scale-105"
                />
              ) : (
                <div className="text-gray-400 italic">Sin imagen</div>
              )
            ) : (
              <div className="h-32 w-32 bg-gray-200 animate-pulse rounded" />
            )}
          </div>

          <div className="flex flex-col w-full p-6">
            <h1>{`Cohete: ${error ? error : rocketName}`}</h1>

            <div className="flex items-center gap-2 mt-4">
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

            <div>
              <p className="line-clamp-3 mt-2">
                {details || "Sin detalles disponibles."}
              </p>
            </div>
          </div>          
        </div>
        
        <div className="flex flex-col justify-between p-5 flex-1">
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
        </div>
      </div>
    </Card>
  )
}
