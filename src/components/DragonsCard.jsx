import { useState } from "react"
import { formatCustomDate } from "../services/functions"
import { FaDragon } from "react-icons/fa"
import { ToggleSwitch } from "./ToggleSwitch"
import Card from "./Card"

// 🐉 Componente principal
export default function DragonsCard({
  name,
  active,
  description,
  diameterInMeters,
  diameterInFeet,
  crewCapacity,
  dryMassInKg,
  dryMassInLb,
  firstFlight,
  image,
  wikipedia
}) {
  // Estados para los switches
  const [useFeet, setUseFeet] = useState(false)
  const [useLb, setUseLb] = useState(false)

  // Valores dinámicos según los switches
  const diameter = useFeet ? `${diameterInFeet} ft` : `${diameterInMeters} m`
  const mass = useLb ? `${dryMassInLb} lb` : `${dryMassInKg} kg`
  const formattedDate = firstFlight ? formatCustomDate(firstFlight) : "—"

  return (
    <Card
      title={name}
      article={wikipedia}
      details={description}
    >
      <div className="flex justify-between">
        {/* Imagen de la cápsula */}
        <div className="h-100 rounded-lg">
          {image ? (
            <img
              src={image}
              alt={`${name} capsule`}
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
            <span
              className={`px-3 py-1 text-sm font-medium rounded-full ${
                active
                  ? "bg-purple-100 text-purple-700"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {active ? "Activa" : "Inactiva"}
            </span>
          </div>

          {/* Fecha de primer vuelo */}
          <p className="text-sm text-gray-500 mb-4">
            Primer vuelo: <span className="font-medium">{formattedDate}</span>
          </p>      

          {/* Datos técnicos */}
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-800">
            {/* Switches de unidad */}
            <ToggleSwitch
              className={"flex items-center gap-2"}
              checked={useFeet}
              onChange={setUseFeet}
              labelLeft="Metros"
              labelRight="Pies"
            />
            <ToggleSwitch
              className={"flex items-center gap-2"}
              checked={useLb}
              onChange={setUseLb}
              labelLeft="Kg"
              labelRight="Lb"
            />
            <div className="flex flex-col">
              <span className="font-medium text-gray-500">Capacidad:</span>
              <span>{crewCapacity} tripulantes</span>
            </div>
            <div className="flex flex-col">
              <span className="font-medium text-gray-500">Diámetro:</span>
              <span>{diameter}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-medium text-gray-500">Masa (en seco):</span>
              <span>{mass}</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
    
  )
}
