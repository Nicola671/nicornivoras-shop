'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PlantCard from '@/components/PlantCard'
import { Plant } from '@/lib/types'

export default function Home() {
  const [plants, setPlants] = useState<Plant[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSpecies, setSelectedSpecies] = useState<string | null>(null)

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const response = await fetch('/api/plants');

        if (!response.ok) {
          console.error('API error:', response.status, response.statusText);
          setPlants([]);
          return;
        }

        const data = await response.json();

        // Verificar que data sea un array
        if (Array.isArray(data)) {
          setPlants(data);
        } else {
          console.error('API returned non-array data:', data);
          setPlants([]);
        }
      } catch (error) {
        console.error('Error fetching plants:', error);
        setPlants([]);
      }
    };

    fetchPlants();
  }, [])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  const handleFilter = (species: string | null) => {
    setSelectedSpecies(species)
  }

  const filteredPlants = plants.filter((plant) => {
    const searchMatch = plant.name.toLowerCase().includes(searchQuery.toLowerCase())
    const speciesMatch = selectedSpecies ? plant.category === selectedSpecies : true
    return searchMatch && speciesMatch
  })

  return (
    <div className="min-h-screen carnivorous-bg">
      <Header onSearch={handleSearch} onFilter={handleFilter} />

      <main className="container mx-auto px-4 py-6 sm:py-8">
        {/* Hero Section */}
        <section
          className="relative rounded-lg overflow-hidden p-8 sm:p-12 md:p-16 mb-8 sm:mb-12 text-center animate-fade-in"
          style={{
            backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.6)), url(https://i.postimg.cc/MZgz0mhQ/pexels-liana-laur-2111099376-29494251.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '300px'
          }}
        >
          {/* Content */}
          <div className="relative z-10">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 sm:mb-4 drop-shadow-lg">
              Bienvenido a Nicornivoras
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-2xl mx-auto drop-shadow-md">
              Descubre nuestra fascinante colección de plantas carnívoras.
              Especies únicas y cuidadas con dedicación para tu hogar.
            </p>
          </div>
        </section>

        {/* All Plants Section */}
        <section>
          <div
            className="rounded-lg p-6 sm:p-8 mb-4 sm:mb-6 animate-slide-in relative overflow-hidden"
            style={{
              backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.6)), url(https://i.postimg.cc/MpLkx6q3/S-purps2.webp)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2 drop-shadow-lg">
              🌿 Todas las Plantas
            </h2>
            <p className="text-sm sm:text-base text-white/90 drop-shadow-md">
              Explora nuestra colección completa
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredPlants.map((plant, index) => (
              <div key={plant.id} className={`animate-fade-in stagger-${Math.min(index + 1, 6)}`}>
                <PlantCard plant={plant} />
              </div>
            ))}
          </div>
        </section>

        {filteredPlants.length === 0 && (
          <div className="glass-effect rounded-lg p-12 text-center">
            <p className="text-lg text-muted-foreground">
              No hay plantas que coincidan con tu búsqueda.
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
