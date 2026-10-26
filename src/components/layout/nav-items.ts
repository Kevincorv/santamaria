import { ReactNode } from 'react'
import { Menu } from 'lucide-react'

export interface NavItem {
  title: string
  href: string
  icon?: ReactNode
}

export const navItems: NavItem[] = [
  { title: 'Inicio', href: '/' },
  { title: 'Lugares', href: '/lugares' },
  { title: 'Mapa', href: '/mapa' },
  { title: 'Historia', href: '/historia' },
  { title: 'Hospedajes', href: '/hospedajes' },
  { title: 'Gastronomía', href: '/gastronomia' },
  { title: 'Eventos', href: '/eventos' },
  { title: 'Recorridos', href: '/recorridos' },
]