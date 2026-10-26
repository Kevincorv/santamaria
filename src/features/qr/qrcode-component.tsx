import React, { useRef, useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { Download, Printer, Check } from 'lucide-react'

export interface QRCodeProps {
  value: string
  title?: string
  subtitle?: string
  size?: number
  className?: string
  showPlaque?: boolean
  /** Muestra los botones de descarga e impresión. */
  showActions?: boolean
}

const slugify = (text: string): string =>
  text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

/**
 * Código QR con descarga en PNG y SVG y vista imprimible con nombre del lugar.
 * La URL debe ser la canónica del sitio (ver `canonicalUrl` en data/site.ts),
 * nunca una dirección local.
 */
export const QRCodeComponent: React.FC<QRCodeProps> = ({
  value,
  title = 'Santa María de Fe',
  subtitle = 'Misiones · Paraguay',
  size = 180,
  className = '',
  showPlaque = false,
  showActions = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [copied, setCopied] = useState(false)
  const filename = `qr-${slugify(title)}`

  const downloadSVG = () => {
    const svg = containerRef.current?.querySelector('svg')
    if (!svg) return
    const svgData = new XMLSerializer().serializeToString(svg)
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' })
    const svgUrl = URL.createObjectURL(svgBlob)
    const link = document.createElement('a')
    link.href = svgUrl
    link.download = `${filename}.svg`
    link.click()
    URL.revokeObjectURL(svgUrl)
  }

  const downloadPNG = () => {
    const svg = containerRef.current?.querySelector('svg')
    if (!svg) return
    const svgData = new XMLSerializer().serializeToString(svg)
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' })
    const url = URL.createObjectURL(svgBlob)
    const img = new Image()
    img.onload = () => {
      const scale = 6
      const canvas = document.createElement('canvas')
      canvas.width = size * scale
      canvas.height = size * scale
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      URL.revokeObjectURL(url)
      canvas.toBlob((blob) => {
        if (!blob) return
        const pngUrl = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = pngUrl
        link.download = `${filename}.png`
        link.click()
        URL.revokeObjectURL(pngUrl)
      }, 'image/png')
    }
    img.src = url
  }

  const copyUrl = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div
        ref={containerRef}
        className={`bg-white p-3 rounded-xl shadow-sm border border-[#E5E3DC] ${
          showPlaque ? 'print-area' : ''
        }`}
      >
        {showPlaque && (
          <div className="text-center mb-3 px-2">
            <p className="font-serif text-base font-bold text-[#102D2B] leading-tight">{title}</p>
            <p className="text-[11px] text-gray-500 uppercase tracking-wider">{subtitle}</p>
          </div>
        )}
        <QRCodeSVG value={value} size={size} level="M" marginSize={2} />
        {showPlaque && (
          <p className="text-[10px] text-gray-500 text-center mt-3 break-all px-2 max-w-[240px]">
            {value}
          </p>
        )}
      </div>

      {showActions && (
        <div className="mt-3 flex flex-wrap items-center justify-center gap-2 print:hidden">
          <button
            onClick={downloadPNG}
            className="inline-flex items-center gap-1.5 rounded-full bg-[#18685A] hover:bg-[#22806d] px-4 py-2 text-xs font-semibold text-white transition-colors"
          >
            <Download className="w-3.5 h-3.5" /> PNG
          </button>
          <button
            onClick={downloadSVG}
            className="inline-flex items-center gap-1.5 rounded-full border border-[#18685A] text-[#18685A] hover:bg-[#18685A]/10 px-4 py-2 text-xs font-semibold transition-colors"
          >
            <Download className="w-3.5 h-3.5" /> SVG
          </button>
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 rounded-full border border-[#E5E3DC] bg-white text-gray-600 hover:border-gray-400 px-4 py-2 text-xs font-semibold transition-colors"
          >
            <Printer className="w-3.5 h-3.5" /> Imprimir
          </button>
          <button
            onClick={copyUrl}
            className="inline-flex items-center gap-1.5 rounded-full border border-[#E5E3DC] bg-white text-gray-600 hover:border-gray-400 px-4 py-2 text-xs font-semibold transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Download className="w-3.5 h-3.5" />}
            {copied ? 'Copiada' : 'Copiar URL'}
          </button>
        </div>
      )}
    </div>
  )
}
