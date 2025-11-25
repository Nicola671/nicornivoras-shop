'use client'

import { Facebook, Instagram, Phone } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="glass-effect border-t mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold text-primary mb-4">Nicornivoras</h3>
            <p className="text-muted-foreground">
              Tu tienda especializada en plantas carnívoras de calidad.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-primary mb-4">Contacto</h3>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Phone className="h-4 w-4" />
              <span>223 616 0926</span>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-primary mb-4">Redes Sociales</h3>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/nicornivoras?igsh=Yng5cjAwajN5Y3U5"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram className="h-5 w-5" />
                <span>Instagram</span>
              </a>
              <a
                href="https://www.facebook.com/share/17fik6nYUu/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Facebook className="h-5 w-5" />
                <span>Facebook</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© 2024 Nicornivoras. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
