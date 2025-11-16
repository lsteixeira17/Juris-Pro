import React from 'react'

const sizeMap = {
  sm: 'px-2 py-1 text-sm',
  md: 'px-3 py-1.5 text-sm',
  lg: 'px-4 py-2 text-base'
}

const variantMap = {
  default: 'bg-blue-600 text-white hover:bg-blue-700',
  ghost: 'bg-transparent hover:bg-gray-100',
  outline: 'border border-gray-200 bg-white hover:bg-gray-50',
  secondary: 'bg-slate-600 text-white hover:bg-slate-700',
  destructive: 'bg-red-600 text-white hover:bg-red-700'
}

export const Button = React.forwardRef(function Button(
  { children, variant = 'default', size = 'md', className = '', ...props },
  ref
) {
  const base = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2'
  const sizeCls = sizeMap[size] || sizeMap.md
  const variantCls = variantMap[variant] || variantMap.default
  const classes = `${base} ${sizeCls} ${variantCls} ${className}`.trim()

  return (
    <button ref={ref} className={classes} {...props}>
      {children}
    </button>
  )
})

Button.displayName = 'Button'

// Export memoized default to avoid unnecessary re-renders when props are stable
export default React.memo(Button)
