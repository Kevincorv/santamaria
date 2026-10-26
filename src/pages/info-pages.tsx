import React from 'react'
import { Header } from '../components/layout/header'
import { Footer } from '../components/layout/footer'
import { Download, Shield, Info, Check, Smartphone, Globe, Share2 } from 'lucide-react'
import { useNewInstallPrompt } from '../hooks/use-pwa'

export const InstalarPage: React.FC = () => {
  const { promptInstall, canInstall, isStandalone } = useNewInstallPrompt()

  return (
    <div className="min-h-screen bg-[#F7F4ED] text-[#202724] flex flex-col font-sans">
      <Header />
      <main className="flex-1 max-w-3xl mx-auto px-4 py-14 w-full">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E5E3DC] shadow-sm text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#102D2B] text-emerald-300 flex items-center justify-center mx-auto mb-6 shadow-md">
            <Smartphone className="w-8 h-8" />
          </div>
          <span className="text-xs uppercase tracking-wider font-semibold text-[#28685A]">
            Aplicación Web Progresiva (PWA)
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#102D2B] mt-1 mb-4">
            Instalá Santa María de Fe Digital
          </h1>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-8 max-w-xl mx-auto">
            Accedé a toda la información histórica, catálogo de lugares, mapas interactivos y lectura de códigos QR directamente desde tu pantalla de inicio, con rendimiento ultrarrápido y soporte sin conexión.
          </p>

          {isStandalone ? (
            <div className="p-4 bg-emerald-50 text-emerald-900 border border-emerald-200 rounded-2xl text-sm font-medium mb-6">
              ✓ ¡Ya estás usando la aplicación en modo instalado!
            </div>
          ) : (
            <div className="space-y-4 mb-8">
              <button
                onClick={() => promptInstall()}
                className="py-3.5 px-8 bg-[#102D2B] hover:bg-[#183D38] text-white text-sm font-semibold rounded-xl shadow-lg transition-all inline-flex items-center gap-2"
              >
                <Download className="w-4 h-4 text-emerald-300" />
                Instalar ahora en este dispositivo
              </button>
            </div>
          )}

          {/* Instructions for iOS and Android */}
          <div className="text-left bg-[#F7F4ED] rounded-2xl p-6 border border-[#E5E3DC] mt-8 text-xs text-gray-700 space-y-4">
            <h2 className="font-serif text-base font-bold text-[#102D2B]">
              Instrucciones según tu sistema operativo:
            </h2>
            <div>
              <span className="font-bold text-gray-900 block">En iPhone / iPad (Safari):</span>
              <p className="text-gray-600 mt-0.5">
                Tocá el botón <strong>Compartir</strong> (ícono de caja con flecha arriba) en la barra inferior de Safari y seleccioná <strong>"Añadir a pantalla de inicio"</strong>.
              </p>
            </div>
            <div>
              <span className="font-bold text-gray-900 block">En Android (Chrome):</span>
              <p className="text-gray-600 mt-0.5">
                Tocá los tres puntos del menú superior derecho y elegí <strong>"Instalar aplicación"</strong> o <strong>"Añadir a pantalla principal"</strong>.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export const AcercaDePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F7F4ED] text-[#202724] flex flex-col font-sans">
      <Header />
      <main className="flex-1 max-w-4xl mx-auto px-4 py-14 w-full">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E5E3DC] shadow-sm">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-semibold mb-3">
            <Info className="w-4 h-4 text-emerald-700" /> Iniciativa Comunitaria
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#102D2B] tracking-tight mb-4">
            Acerca de Santa María de Fe Digital
          </h1>
          <div className="prose text-gray-700 text-sm sm:text-base leading-relaxed space-y-4">
            <p>
              <strong>Santa María de Fe Digital</strong> es una plataforma pública diseñada para preservar, difundir y valorizar el patrimonio histórico, arquitectónico y natural de la reducción jesuítico-guaraní de Santa María de Fe, ubicada en el Departamento de Misiones, República del Paraguay.
            </p>
            <p>
              El proyecto integra señalética física inteligente mediante placas con códigos QR distribuidas en los monumentos de la ciudad, un mapa georreferenciado de alta precisión con rutas y un sistema de acceso universal a través de la web instalable (PWA).
            </p>
            <h2 className="font-serif text-2xl font-bold text-[#102D2B] pt-4">Nuestros Pilares</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Rigor histórico:</strong> Información documentada sobre la fundación de 1647, el legado de Emmanuel Berthot, el sabio Aimé Bonpland y el prócer José Agustín Molas.</li>
              <li><strong>Turismo Comunitario Sostenible:</strong> Fomento del modelo vivencial Hotel de Pueblo, apoyando a posadas familiares y emprendedores gastronómicos.</li>
              <li><strong>Acceso Inclusivo:</strong> Diseño optimizado para cualquier dispositivo móvil y conexiones de baja velocidad.</li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export const PrivacidadPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F7F4ED] text-[#202724] flex flex-col font-sans">
      <Header />
      <main className="flex-1 max-w-4xl mx-auto px-4 py-14 w-full">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E5E3DC] shadow-sm">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-semibold mb-3">
            <Shield className="w-4 h-4 text-emerald-700" /> Transparencia y Seguridad
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#102D2B] tracking-tight mb-4">
            Política de Privacidad
          </h1>
          <div className="prose text-gray-700 text-sm sm:text-base leading-relaxed space-y-4">
            <p>
              En Santa María de Fe Digital respetamos tu privacidad. Esta aplicación está concebida como una herramienta abierta de libre acceso para la ciudadanía y los turistas:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Sin registro obligatorio:</strong> No requerimos crear cuentas ni ingresar datos personales para consultar la guía, los mapas ni escanear los códigos QR.</li>
              <li><strong>Geolocalización:</strong> Tu ubicación geográfica en el mapa interactivo se solicita exclusivamente bajo tu consentimiento expreso y se procesa localmente en tu dispositivo para orientarte en la ciudad; no se almacena en ningún servidor.</li>
              <li><strong>Almacenamiento local:</strong> Utilizamos almacenamiento local únicamente para recordar tus preferencias de instalación de la aplicación.</li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
