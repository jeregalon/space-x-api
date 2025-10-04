import { useEffect, useState } from "react"

// 🔹 Inicializa cache en memoria global (en el window para persistir entre renders)
if (!window.launchCacheMemory) {
  window.launchCacheMemory = new Map()
}

/**
 * Hook para obtener y cachear un recurso remoto (imagen, thumbnail, etc)
 * @param {string} url - URL del recurso remoto
 * @param {boolean} shouldLoad - Si true, intenta cargar el recurso (ej: cuando el elemento es visible)
 * @returns {string|null} - URL local del recurso cacheado o null si no está disponible aún
 */
export default function useCachedAsset(url, shouldLoad) {
  const [cachedUrl, setCachedUrl] = useState(null)

  useEffect(() => {
    if (!shouldLoad || !url) return

    let isMounted = true

    async function cacheAsset() {
      if (!("caches" in window)) return

      try {
        const cache = await caches.open("launches-cache-v1")

        // 1️⃣ Verificar memoria en runtime
        if (window.launchCacheMemory.has(url)) {
          if (isMounted) setCachedUrl(window.launchCacheMemory.get(url))
          return
        }

        // 2️⃣ Verificar si ya está cacheado por Service Worker
        const cached = await cache.match(url)
        if (cached) {
          const blob = await cached.blob()
          const objUrl = URL.createObjectURL(blob)
          if (isMounted) setCachedUrl(objUrl)
          window.launchCacheMemory.set(url, objUrl)
          return
        }

        // 3️⃣ Si no está cacheado, lo descarga y lo guarda
        const resp = await fetch(url, { mode: "cors" })
        if (resp.ok) {
          cache.put(url, resp.clone())
          const blob = await resp.blob()
          const objUrl = URL.createObjectURL(blob)
          if (isMounted) setCachedUrl(objUrl)
          window.launchCacheMemory.set(url, objUrl)
        }
      } catch (err) {
        console.error("Error cacheando recurso:", err)
      }
    }

    cacheAsset()

    // Limpieza al desmontar
    return () => {
      isMounted = false
      if (cachedUrl && !window.launchCacheMemory.has(url)) {
        URL.revokeObjectURL(cachedUrl)
      }
    }
  }, [url, shouldLoad])

  return cachedUrl
}
