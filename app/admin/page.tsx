"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { Plant } from '@/lib/types'
import PlantsTable from '@/components/admin/PlantsTable'
import PlantForm from '@/components/admin/PlantForm'

export default function AdminPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [plants, setPlants] = useState<Plant[]>([])
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null)
  const [isFormVisible, setIsFormVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const fetchPlants = async () => {
    try {
      const response = await fetch('/api/plants')
      if (response.ok) {
        const data = await response.json()
        setPlants(data)
      }
    } catch (error) {
      console.error('Error fetching plants:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    } else if (status === 'authenticated') {
      fetchPlants()
    }
  }, [status, router])

  const handleEdit = (plant: Plant) => {
    setSelectedPlant(plant)
    setIsFormVisible(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de que quieres eliminar esta planta?')) return

    try {
      const response = await fetch(`/api/plants/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setPlants(plants.filter(p => p.id !== id))
      } else {
        alert('Error al eliminar la planta')
      }
    } catch (error) {
      console.error('Error deleting plant:', error)
      alert('Error al eliminar la planta')
    }
  }

  const handleSave = async (plant: Plant) => {
    try {
      const isEditing = !!plant.id
      const url = isEditing ? `/api/plants/${plant.id}` : '/api/plants'
      const method = isEditing ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(plant),
      })

      if (response.ok) {
        await fetchPlants() // Recargar lista
        setIsFormVisible(false)
        setSelectedPlant(null)
      } else {
        const errorData = await response.json()
        alert(`Error al guardar: ${errorData.error || 'Desconocido'}`)
      }
    } catch (error) {
      console.error('Error saving plant:', error)
      alert('Error al guardar la planta')
    }
  }

  const handleAddNew = () => {
    setSelectedPlant(null)
    setIsFormVisible(true)
  }

  if (status === 'loading' || isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen carnivorous-bg">
        <div className="glass-effect p-8 rounded-lg">
          Cargando...
        </div>
      </div>
    )
  }

  if (status === 'unauthenticated') {
    return null
  }

  return (
    <div className="flex flex-col min-h-screen carnivorous-bg">
      <Header onSearch={() => { }} onFilter={() => { }} />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="glass-effect rounded-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-primary">Panel de Administración</h1>
            <Button onClick={handleAddNew}>Agregar Nueva Planta</Button>
          </div>

          {isFormVisible ? (
            <PlantForm
              plant={selectedPlant}
              onSave={handleSave}
              onCancel={() => setIsFormVisible(false)}
            />
          ) : (
            <PlantsTable
              plants={plants}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}