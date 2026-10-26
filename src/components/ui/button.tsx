import { ReactNode } from 'react'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'ghost'
  size?: 'default' | 'sm' | 'lg' | 'icon'
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'default',
  size = 'default',
  asChild = false,
  className,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none'

  const variantClasses = {
    default: 'bg-green-700 text-white hover:bg-green-800',
    secondary: 'bg-white text-green-700 border border-green-700 hover:bg-gray-50',
    destructive: 'bg-red-500 text-white hover:bg-red-600',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50',
    ghost: 'hover:bg-gray-100 hover:text-gray-900'
  }

  const sizeClasses = {
    default: 'py-2 px-4',
    sm: 'py-1.5 px-3',
    lg: 'py-3 px-6',
    icon: 'h-10 w-10'
  }

  return (
    <button
      className={[
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className
      ].filter(Boolean).join(' ')}
      {...props}
    >
      {asChild ? children : (
        <span className="flex items-center gap-2">
          {children}
          {size !== 'icon' && <span className="relative -mt.5 h-5 w-5" />}
        </span>
      )}
    </button>
  )
}