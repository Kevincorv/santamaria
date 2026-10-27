import { MessageCircle } from 'lucide-react'
import { TOURISM_WHATSAPP } from '../../data/site'

/**
 * Botón flotante del WhatsApp turístico central.
 * Solo aparece cuando VITE_TOURISM_WHATSAPP está configurado con un número
 * confirmado; si no, no se muestra ningún contacto inventado.
 */
export const TourismWhatsAppButton = () => {
  if (!TOURISM_WHATSAPP) return null

  return (
    <a
      href={`https://wa.me/${TOURISM_WHATSAPP}?text=${encodeURIComponent(
        'Hola, escribo desde el portal Santa María de Fe Digital. Quisiera consultar sobre la visita.'
      )}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-3 shadow-lg transition-colors"
      aria-label="Escribir al WhatsApp turístico de Santa María de Fe"
    >
      <MessageCircle className="w-5 h-5" aria-hidden="true" />
      <span className="text-sm font-semibold hidden sm:inline">WhatsApp turístico</span>
    </a>
  )
}
