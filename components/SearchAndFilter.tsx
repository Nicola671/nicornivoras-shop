
'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { MoreVertical, Search } from 'lucide-react'

const plantSpecies = [
  'Droseras',
  'Nepenthes',
  'Utricularia',
  'Sarracenias',
  'Venus Atrapamoscas',
  'Darlingtonia californica',
  'Cephalotus Folliularis',
]

interface SearchAndFilterProps {
  onSearch: (query: string) => void
  onFilter: (species: string | null) => void
}

export default function SearchAndFilter({ onSearch, onFilter }: SearchAndFilterProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    onSearch(e.target.value)
  }

  const handleFilterClick = (species: string | null) => {
    onFilter(species)
    setIsDropdownOpen(false)
  }

  return (
    <div className="flex items-center gap-2 sm:gap-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Buscar plantas..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="pl-10 pr-4 py-2 text-sm rounded-full"
        />
      </div>
      <div className="relative">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="text-white hover:text-white hover:bg-white/20"
        >
          <MoreVertical className="h-5 w-5" />
        </Button>
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg z-60">
            <div className="py-1">
              <button
                onClick={() => handleFilterClick(null)}
                className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700"
              >
                Todas
              </button>
              {plantSpecies.map((species) => (
                <button
                  key={species}
                  onClick={() => handleFilterClick(species)}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  {species}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
