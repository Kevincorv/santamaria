import { ReactNode } from 'react'

export interface CardProps {
  className?: string
  children: ReactNode
}

export const Card: React.FC<CardProps> = ({ className, children }) => (
  <div className="rounded-lg border bg-white shadow-sm {className}">
    {children}
  </div>
)