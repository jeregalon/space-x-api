import { useState } from "react"
import { formatCustomDate } from "../services/functions"
import { FaRocket } from "react-icons/fa"
import { ToggleSwitch } from "./ToggleSwitch"
import Card from "./Card"

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
  image,
  wikipedia,
  description
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
    <Card
      title={name}
      article={wikipedia}
      details={description}
    >
      <div className="flex justify-between">
        {/* Imagen del cohete */}
        <div className="h-100 rounded-lg">
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

        <div className="flex flex-col w-full">

          {/* Contenido principal */}
          <div className="p-6 flex flex-col flex-1">
            {/* Encabezado */}
            <div className="flex items-center justify-between mb-4">
              <span
                className={`px-3 py-1 text-lg font-medium rounded-full ${
                  active
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {active ? "Activo" : "Inactivo"}
              </span>
            </div>

            {/* Fecha de primer vuelo */}
            <p className="text-gray-500 mb-4">
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
                <p className="font-medium text-gray-500">Etapas:</p>
                <p>{stages}</p>
              </div>
              <div className="flex flex-col">
                <p className="font-medium text-gray-500">Altura:</p>
                <p>{height}</p>
              </div>
              <div className="flex flex-col">
                <p className="font-medium text-gray-500">Diámetro:</p>
                <p>{diameter}</p>
              </div>
              <div className="flex flex-col">
                <p className="font-medium text-gray-500">Masa:</p>
                <p>{mass}</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      
    </Card>
  )
}