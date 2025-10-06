import { useState } from "react"
import { formatCustomDate } from "../services/functions"
import { FaRocket } from "react-icons/fa"
import { ToggleSwitch } from "./ToggleSwitch"

// 🔹 Componente principal
export default function RocketsCard({
  name,
  firstFlight,
  active,
  stages,
  heightInMeters,
  heightInFeet,
  diameterInMeters,
  diameterInFeet,
  massInKg,
  massInLb,
  image
}) {
  // Estados para los switches
  const [useFeet, setUseFeet] = useState(false)
  const [useLb, setUseLb] = useState(false)

  // Formatear la fecha del primer vuelo
  const formattedDate = firstFlight ? formatCustomDate(firstFlight) : "—"

  // Unidades dinámicas según la selección
  const height = useFeet ? `${heightInFeet} ft` : `${heightInMeters} m`
  const diameter = useFeet ? `${diameterInFeet} ft` : `${diameterInMeters} m`
  const mass = useLb ? `${massInLb} lb` : `${massInKg} kg`

  return (
    <div className="flex flex-col mt-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden max-w-md">
      {/* Imagen del cohete */}
      <div className="bg-gray-100 flex items-center justify-center h-52">
        {image ? (
          <img
            src={image}
            alt={`${name} rocket`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
          />
        ) : (
          <div className="text-gray-400 italic">Sin imagen</div>
        )}
      </div>

      {/* Contenido principal */}
      <div className="p-6 flex flex-col flex-1">
        {/* Encabezado */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <FaRocket
              className={`w-6 h-6 ${
                active ? "text-green-600 animate-pulse" : "text-gray-400"
              }`}
            />
            <h2 className="text-xl font-semibold text-gray-800">{name}</h2>
          </div>
          <span
            className={`px-3 py-1 text-sm font-medium rounded-full ${
              active
                ? "bg-green-100 text-green-700"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            {active ? "Activo" : "Inactivo"}
          </span>
        </div>

        {/* Fecha de primer vuelo */}
        <p className="text-sm text-gray-500 mb-4">
          Primer vuelo: <span className="font-medium">{formattedDate}</span>
        </p>

        {/* Switches de unidad */}
        <div className="flex items-center justify-between mb-5 text-sm text-gray-700">
          <ToggleSwitch
            checked={useFeet}
            onChange={setUseFeet}
            labelLeft="Metros"
            labelRight="Pies"
          />
          <ToggleSwitch
            checked={useLb}
            onChange={setUseLb}
            labelLeft="Kg"
            labelRight="Lb"
          />
        </div>

        {/* Datos técnicos */}
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-800">
          <div className="flex flex-col">
            <span className="font-medium text-gray-500">Etapas:</span>
            <span>{stages}</span>
          </div>
          <div className="flex flex-col">
            <span className="font-medium text-gray-500">Altura:</span>
            <span>{height}</span>
          </div>
          <div className="flex flex-col">
            <span className="font-medium text-gray-500">Diámetro:</span>
            <span>{diameter}</span>
          </div>
          <div className="flex flex-col">
            <span className="font-medium text-gray-500">Masa:</span>
            <span>{mass}</span>
          </div>
        </div>
      </div>
    </div>
  )
}