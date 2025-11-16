import React from 'react'

export const Button = ({ children, variant, size, className = '', ...props }) => {
  const base = 'inline-flex items-center justify-center rounded-md px-3 py-1.5'
  const variants = {
    ghost: 'bg-transparent',
    outline: 'border',
    secondary: 'bg-blue-600 text-white',
    destructive: 'bg-red-600 text-white'
  }
  return (
    <button className={`${base} ${variants[variant] || ''} ${className}`} {...props}>
      {children}
    </button>
  )
}

export default Button
