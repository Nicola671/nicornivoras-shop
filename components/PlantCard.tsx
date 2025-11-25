'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Plant } from '@/lib/types'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatPrice } from '@/lib/utils'

interface PlantCardProps {
  plant: Plant
}

export default function PlantCard({ plant }: PlantCardProps) {
  return (
    <Link href={`/plant/${plant.id}`}>
      <Card className="overflow-hidden card-hover cursor-pointer h-full animate-scale-in">
        <div className="relative h-48 sm:h-56 w-full overflow-hidden">
          <Image
            src={plant.images[0]}
            alt={plant.name}
            fill
            className="object-cover transition-transform duration-500 hover:scale-110"
          />
          {plant.featured && (
            <Badge className="absolute top-2 right-2 animate-fade-in" variant="default">
              ⭐ Destacada
            </Badge>
          )}
        </div>
        <CardHeader className="pb-3">
          <CardTitle className="text-base sm:text-lg">{plant.name}</CardTitle>
          <p className="text-xs sm:text-sm text-muted-foreground italic">{plant.scientificName}</p>
        </CardHeader>
        <CardContent className="pb-3">
          <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">
            {plant.description}
          </p>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <span className="text-xl sm:text-2xl font-bold text-primary">
            {plant.availableSizes.length > 0
              ? `${formatPrice(Math.min(...plant.availableSizes.map(s => s.price)))} - ${formatPrice(Math.max(...plant.availableSizes.map(s => s.price)))}`
              : formatPrice(plant.price)
            }
          </span>
          <div className="flex gap-1 flex-wrap">
            {plant.availableSizes.map((sizeOption) => (
              <Badge key={sizeOption.size} variant="outline" className="text-xs">
                {sizeOption.size}
              </Badge>
            ))}
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}
