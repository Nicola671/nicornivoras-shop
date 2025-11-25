"use client"

import { useState, useEffect } from 'react'
import { Plant, Size } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { X } from 'lucide-react'
import Image from 'next/image'

interface PlantFormProps {
  plant: Plant | null
  onSave: (plant: Plant) => void
  onCancel: () => void
}

const AVAILABLE_SIZES: Size[] = ['S', 'M', 'L', 'XL', 'XXL']

// Categorías predefinidas basadas en las especies más comunes
const CATEGORIES = [
  'Dionaea',
  'Drosera',
  'Nepenthes',
  'Sarracenia',
  'Pinguicula',
  'Utricularia',
  'Darlingtonia',
  'Cephalotus',
  'Heliamphora',
  'Otra'
]

export default function PlantForm({ plant, onSave, onCancel }: PlantFormProps) {
  const [formData, setFormData] = useState<Partial<Plant>>({
    name: '',
    scientificName: '',
    description: '',
    price: 0,
    category: '',
    stock: 1,
    images: [],
    availableSizes: [],
    featured: false
  })

  const [imageFiles, setImageFiles] = useState<File[]>([])
  const [imagePreviews, setImagePreviews] = useState<string[]>([])
  const [isUploading, setIsUploading] = useState(false)

  useEffect(() => {
    if (plant) {
      setFormData(plant)
      setImagePreviews(plant.images)
    } else {
      setFormData({
        name: '',
        scientificName: '',
        description: '',
        price: 0,
        category: '',
        stock: 1,
        images: [],
        availableSizes: [],
        featured: false
      })
      setImagePreviews([])
      setImageFiles([])
    }
  }, [plant])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: name === 'price' || name === 'stock' ? Number(value) : value })
  }

  const handleCategoryChange = (value: string) => {
    setFormData({ ...formData, category: value })
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData({ ...formData, featured: checked })
  }

  const handleSizeToggle = (size: Size) => {
    const currentSizes = formData.availableSizes || []
    const sizeExists = currentSizes.find(s => s.size === size)

    if (sizeExists) {
      // Remover el tamaño
      const newSizes = currentSizes.filter(s => s.size !== size)
      setFormData({ ...formData, availableSizes: newSizes })
    } else {
      // Agregar el tamaño con un precio por defecto
      const basePrice = formData.price || 0
      const newSizes = [...currentSizes, { size, price: basePrice }]
      setFormData({ ...formData, availableSizes: newSizes })
    }
  }

  const handleSizePriceChange = (size: Size, price: number) => {
    const currentSizes = formData.availableSizes || []
    const newSizes = currentSizes.map(s =>
      s.size === size ? { ...s, price } : s
    )
    setFormData({ ...formData, availableSizes: newSizes })
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    const newFiles = Array.from(files)
    setImageFiles(prev => [...prev, ...newFiles])

    // Crear previews
    newFiles.forEach(file => {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreviews(prev => [...prev, reader.result as string])
      }
      reader.readAsDataURL(file)
    })
  }

  const removeImage = (index: number) => {
    setImagePreviews(prev => prev.filter((_, i) => i !== index))
    setImageFiles(prev => prev.filter((_, i) => i !== index))
  }

  const uploadToImgBB = async (file: File): Promise<string> => {
    const formData = new FormData()
    formData.append('image', file)

    // Usando ImgBB API (necesitarás una API key gratuita de imgbb.com)
    // Por ahora, voy a usar un servicio temporal. En producción, deberías usar tu propia solución
    const response = await fetch('https://api.imgbb.com/1/upload?key=YOUR_API_KEY', {
      method: 'POST',
      body: formData
    })

    if (!response.ok) {
      throw new Error('Error al subir imagen')
    }

    const data = await response.json()
    return data.data.url
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsUploading(true)

    try {
      let imageUrls = [...imagePreviews]

      // Si hay nuevas imágenes para subir (archivos locales)
      if (imageFiles.length > 0) {
        const formData = new FormData()
        imageFiles.forEach(file => {
          formData.append('images', file)
        })

        const uploadResponse = await fetch('/api/upload', {
          method: 'POST',
          body: formData
        })

        if (!uploadResponse.ok) {
          throw new Error('Error al subir imágenes')
        }

        const { urls } = await uploadResponse.json()

        // Combinar URLs existentes (si estamos editando) con las nuevas
        const existingUrls = plant?.images.filter(url => imagePreviews.includes(url)) || []
        imageUrls = [...existingUrls, ...urls]
      }

      onSave({ ...formData, images: imageUrls } as Plant)
    } catch (error) {
      console.error('Error al procesar imágenes:', error)
      alert('Error al procesar las imágenes. Por favor, intenta de nuevo.')
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Nombre *</Label>
          <Input
            id="name"
            name="name"
            value={formData.name || ''}
            onChange={handleChange}
            required
            placeholder="Ej: Venus Atrapamoscas"
          />
        </div>

        <div>
          <Label htmlFor="scientificName">Nombre Científico *</Label>
          <Input
            id="scientificName"
            name="scientificName"
            value={formData.scientificName || ''}
            onChange={handleChange}
            required
            placeholder="Ej: Dionaea muscipula"
          />
        </div>

        <div>
          <Label htmlFor="category">Categoría *</Label>
          <Select value={formData.category || ''} onValueChange={handleCategoryChange}>
            <SelectTrigger>
              <SelectValue placeholder="Selecciona una categoría" />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map(cat => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="price">Precio ($) *</Label>
          <Input
            id="price"
            name="price"
            type="number"
            value={formData.price || ''}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
          />
        </div>

        <div>
          <Label htmlFor="stock">Stock *</Label>
          <Input
            id="stock"
            name="stock"
            type="number"
            value={formData.stock || ''}
            onChange={handleChange}
            required
            min="0"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="description">Descripción</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description || ''}
          onChange={handleChange}
          rows={4}
          placeholder="Describe las características de la planta..."
        />
      </div>

      <div>
        <Label htmlFor="images">Imágenes</Label>
        <div className="space-y-4">
          <Input
            id="images"
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="cursor-pointer"
          />

          {imagePreviews.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {imagePreviews.map((preview, index) => (
                <div key={index} className="relative group">
                  <div className="relative h-32 w-full rounded-lg overflow-hidden border-2 border-gray-200">
                    <Image
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <p className="text-sm text-gray-500">
            Puedes seleccionar múltiples imágenes. La primera será la imagen principal.
          </p>
        </div>
      </div>

      <div>
        <Label className="mb-3 block">Tamaños Disponibles y Precios *</Label>
        <div className="space-y-3">
          {AVAILABLE_SIZES.map(size => {
            const sizeOption = formData.availableSizes?.find(s => s.size === size)
            const isChecked = !!sizeOption

            return (
              <div key={size} className="flex items-center gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`size-${size}`}
                    checked={isChecked}
                    onCheckedChange={() => handleSizeToggle(size)}
                  />
                  <label
                    htmlFor={`size-${size}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer min-w-[40px]"
                  >
                    {size}
                  </label>
                </div>

                {isChecked && (
                  <div className="flex items-center gap-2">
                    <Label htmlFor={`price-${size}`} className="text-sm">Precio:</Label>
                    <Input
                      id={`price-${size}`}
                      type="number"
                      value={sizeOption?.price || 0}
                      onChange={(e) => handleSizePriceChange(size, Number(e.target.value))}
                      className="w-32"
                      min="0"
                      step="0.01"
                    />
                  </div>
                )}
              </div>
            )
          })}
        </div>
        <p className="text-sm text-gray-500 mt-2">
          Selecciona los tamaños disponibles y asigna un precio a cada uno.
        </p>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="featured"
          checked={formData.featured}
          onCheckedChange={handleCheckboxChange}
        />
        <label
          htmlFor="featured"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
        >
          ⭐ Marcar como destacada
        </label>
      </div>

      <div className="flex justify-end space-x-2 pt-4 border-t">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isUploading}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isUploading}>
          {isUploading ? 'Guardando...' : 'Guardar Planta'}
        </Button>
      </div>
    </form>
  )
}
