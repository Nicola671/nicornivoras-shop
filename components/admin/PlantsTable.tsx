"use client"

import { Plant } from '@/lib/types'
import { Button } from '@/components/ui/button'

interface PlantsTableProps {
  plants: Plant[]
  onEdit: (plant: Plant) => void
  onDelete: (id: string) => void
}

export default function PlantsTable({ plants, onEdit, onDelete }: PlantsTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Nombre</th>
            <th className="py-2 px-4 border-b">Especie</th>
            <th className="py-2 px-4 border-b">Precio</th>
            <th className="py-2 px-4 border-b">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {plants.map(plant => (
            <tr key={plant.id}>
              <td className="py-2 px-4 border-b">{plant.name}</td>
              <td className="py-2 px-4 border-b">{plant.scientificName}</td>
              <td className="py-2 px-4 border-b">${plant.price}</td>
              <td className="py-2 px-4 border-b">
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={() => onEdit(plant)}>Editar</Button>
                  <Button variant="destructive" size="sm" onClick={() => onDelete(plant.id)}>Eliminar</Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
