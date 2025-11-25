
'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { LogOut, ShieldCheck } from 'lucide-react'
import SearchAndFilter from './SearchAndFilter'
import { useSession, signOut } from 'next-auth/react'

interface HeaderProps {
  onSearch: (query: string) => void;
  onFilter: (species: string | null) => void;
}

export default function Header({ onSearch, onFilter }: HeaderProps) {
  const { data: session, status } = useSession()

  return (
    <header 
      className="sticky top-0 z-50 w-full border-b animate-slide-in relative"
      style={{
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.7)), url(https://i.postimg.cc/1RDNqXdt/images-1.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        zIndex: 9999
      }}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-3 sm:px-4 relative z-10">
        <Link href="/" className="flex items-center space-x-2 sm:space-x-3">
          <div className="relative h-10 w-10 sm:h-12 sm:w-12">
            <Image
              src="https://i.postimg.cc/brTLvrhR/Whats-App-Image-2025-11-05-at-23-13-14-removebg-preview.png"
              alt="Nicornivoras Logo"
              fill
              className="object-contain"
            />
          </div>
          <span className="text-lg sm:text-2xl font-bold text-white drop-shadow-lg">Nicornivoras</span>
        </Link>
        
        <nav className="flex items-center gap-2 sm:gap-4">
          <SearchAndFilter onSearch={onSearch} onFilter={onFilter} />
          <Link href="/">
            <Button variant="ghost" size="sm" className="text-xs sm:text-sm text-white hover:text-white hover:bg-white/20">
              <span className="hidden sm:inline">Inicio</span>
              <span className="sm:hidden">🏪</span>
            </Button>
          </Link>
          
          {status === 'authenticated' ? (
            <>
              <Link href="/admin">
                <Button variant="ghost" size="sm" className="text-xs sm:text-sm text-white hover:text-white hover:bg-white/20">
                  <ShieldCheck className="h-3 w-3 sm:h-4 sm:w-4 sm:mr-2" />
                  <span className="hidden sm:inline">Admin</span>
                </Button>
              </Link>
              <Button variant="outline" size="sm" onClick={() => signOut()} className="text-xs sm:text-sm text-white border-white hover:bg-white/20 hover:text-white">
                <LogOut className="h-3 w-3 sm:h-4 sm:w-4 sm:mr-2" />
                <span className="hidden sm:inline">Salir</span>
              </Button>
            </>
          ) : (
            <Link href="/login">
              <Button variant="default" size="sm" className="text-xs sm:text-sm bg-white/20 text-white hover:bg-white/30 border-white">
                <span className="hidden sm:inline">Iniciar Sesión</span>
                <span className="sm:hidden">🔐</span>
              </Button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  )
}
