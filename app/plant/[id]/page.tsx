'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plant, sizeLabels } from '@/lib/types'
import { formatPrice } from '@/lib/utils'
import { Phone, Instagram, Facebook, ArrowLeft } from 'lucide-react'

export default function PlantDetailPage() {
  const params = useParams()
  const [plant, setPlant] = useState<Plant | null>(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedSize, setSelectedSize] = useState<string | null>(null)

  useEffect(() => {
    const fetchPlant = async () => {
      const plantId = params?.id
      if (!plantId) {
        setIsLoading(false)
        return
      }

      try {
        const response = await fetch(`/api/plants/${plantId}`)
        if (response.ok) {
          const data = await response.json()
          setPlant(data)
        } else {
          setPlant(null)
        }
      } catch (error) {
        console.error('Error fetching plant:', error)
        setPlant(null)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPlant()
  }, [params])

  if (isLoading) {
    return (
      <div className="min-h-screen carnivorous-bg">
        <Header onSearch={() => { }} onFilter={() => { }} />
        <main className="container mx-auto px-4 py-16">
          <div className="glass-effect rounded-lg p-12 text-center">
            <p className="text-lg text-muted-foreground">Cargando...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!plant) {
    return (
      <div className="min-h-screen carnivorous-bg">
        <Header onSearch={() => { }} onFilter={() => { }} />
        <main className="container mx-auto px-4 py-16">
          <div className="glass-effect rounded-lg p-12 text-center">
            <p className="text-lg text-muted-foreground">Planta no encontrada</p>
            <Link href="/">
              <Button className="mt-4">Volver a la tienda</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen carnivorous-bg">
      <Header onSearch={() => { }} onFilter={() => { }} />

      <main className="container mx-auto px-4 py-8">
        <Link href="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a la tienda
          </Button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Image Gallery */}
          <div className="space-y-3 sm:space-y-4 animate-fade-in">
            <Card className="overflow-hidden">
              <div className="relative h-64 sm:h-80 md:h-96 w-full group">
                <Image
                  src={plant.images[selectedImage]}
                  alt={plant.name}
                  fill
                  className="object-cover transition-transform duration-300"
                />
                {plant.featured && (
                  <Badge className="absolute top-3 right-3 sm:top-4 sm:right-4" variant="default">
                    ⭐ Destacada
                  </Badge>
                )}

                {/* Navigation Arrows for Mobile */}
                {plant.images.length > 1 && (
                  <>
                    <button
                      onClick={() => setSelectedImage((prev) => (prev === 0 ? plant.images.length - 1 : prev - 1))}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-all opacity-0 group-hover:opacity-100 sm:opacity-100"
                      aria-label="Imagen anterior"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      onClick={() => setSelectedImage((prev) => (prev === plant.images.length - 1 ? 0 : prev + 1))}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-all opacity-0 group-hover:opacity-100 sm:opacity-100"
                      aria-label="Imagen siguiente"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>

                    {/* Image counter */}
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
                      {selectedImage + 1} / {plant.images.length}
                    </div>
                  </>
                )}
              </div>
            </Card>

            {/* Thumbnail Gallery */}
            {plant.images.length > 1 && (
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                {plant.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`image-gallery-thumbnail relative h-16 sm:h-20 rounded-lg overflow-hidden border-2 ${selectedImage === index
                      ? 'active border-primary'
                      : 'border-transparent'
                      }`}
                  >
                    <Image
                      src={image}
                      alt={`${plant.name} - ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Plant Details */}
          <div className="space-y-4 sm:space-y-6 animate-slide-in">
            <Card className="glass-effect">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl sm:text-3xl">{plant.name}</CardTitle>
                <p className="text-base sm:text-lg text-muted-foreground italic">
                  {plant.scientificName}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="secondary">{plant.category}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 sm:space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Descripción</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {plant.description}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Tamaños y Precios</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {plant.availableSizes.map((sizeOption) => (
                      <button
                        key={sizeOption.size}
                        onClick={() => setSelectedSize(sizeOption.size)}
                        className={`p-4 rounded-lg border-2 transition-all ${selectedSize === sizeOption.size
                            ? 'border-primary bg-primary/10'
                            : 'border-gray-200 hover:border-primary/50'
                          }`}
                      >
                        <div className="flex justify-between items-center">
                          <div className="text-left">
                            <div className="font-semibold text-lg">{sizeOption.size}</div>
                            <div className="text-sm text-muted-foreground">{sizeLabels[sizeOption.size]}</div>
                          </div>
                          <div className="text-2xl font-bold text-primary">
                            ${sizeOption.price}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                  {selectedSize && (
                    <div className="mt-4 p-4 bg-primary/5 rounded-lg">
                      <p className="text-sm text-muted-foreground">
                        Tamaño seleccionado: <span className="font-semibold text-primary">{selectedSize}</span>
                      </p>
                      <p className="text-2xl font-bold text-primary mt-1">
                        ${plant.availableSizes.find(s => s.size === selectedSize)?.price}
                      </p>
                    </div>
                  )}
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-xl font-semibold mb-4">Información de Contacto</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <Phone className="h-5 w-5 text-primary" />
                      <a href="tel:2236160926" className="hover:text-primary transition-colors">
                        223 616 0926
                      </a>
                    </div>

                    <div className="flex items-center gap-3">
                      <a
                        href="https://www.instagram.com/nicornivoras?igsh=Yng5cjAwajN5Y3U5"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Instagram className="h-5 w-5" />
                        <span>@nicornivoras</span>
                      </a>
                    </div>

                    <div className="flex items-center gap-3">
                      <a
                        href="https://www.facebook.com/share/17fik6nYUu/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Facebook className="h-5 w-5" />
                        <span>Nicornivoras</span>
                      </a>
                    </div>
                  </div>

                  <div className="mt-6">
                    <a
                      href="https://wa.me/5492236160926"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <Button className="w-full" size="lg">
                        💬 Contactar por WhatsApp
                      </Button>
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
