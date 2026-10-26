import React, { useState } from 'react'
import { ImageOff } from 'lucide-react'

interface SmartImageProps {
  src?: string
  alt: string
  className?: string
  imgClassName?: string
  /** Carga diferida (por defecto sí). */
  lazy?: boolean
  /** Texto del estado de respaldo cuando no hay foto. */
  fallbackNote?: string
}

/**
 * Imagen con carga diferida, transición de aparición y respaldo elegante
 * cuando la foto no existe o falla al cargar. Nunca muestra imágenes rotas.
 */
export const SmartImage: React.FC<SmartImageProps> = ({
  src,
  alt,
  className = '',
  imgClassName = '',
  lazy = true,
  fallbackNote = 'Fotografía pendiente de incorporar',
}) => {
  const [failed, setFailed] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const showImage = Boolean(src) && !failed

  return (
    <div className={`relative overflow-hidden bg-gradient-to-br from-[#1c4a42] to-[#102D2B] ${className}`}>
      {showImage ? (
        <img
          src={src}
          alt={alt}
          loading={lazy ? 'lazy' : 'eager'}
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={`w-full h-full object-cover transition-opacity duration-700 ${
            loaded ? 'opacity-100' : 'opacity-0'
          } ${imgClassName}`}
        />
      ) : (
        <div
          role="img"
          aria-label={alt}
          className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4 text-center"
        >
          <ImageOff className="w-6 h-6 text-emerald-200/70" aria-hidden="true" />
          <span className="text-[10px] uppercase tracking-wider text-emerald-100/80 leading-snug">
            {fallbackNote}
          </span>
        </div>
      )}
    </div>
  )
}
