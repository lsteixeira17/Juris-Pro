import React from 'react'

const base = 'w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500'

export const Textarea = React.forwardRef(function Textarea({ className = '', ...props }, ref) {
  return <textarea ref={ref} className={`${base} ${className}`.trim()} {...props} />
})

Textarea.displayName = 'Textarea'

export default Textarea
