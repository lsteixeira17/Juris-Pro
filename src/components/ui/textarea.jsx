import React from 'react'

export const Textarea = ({ className = '', ...props }) => {
  return <textarea className={`border rounded-md px-2 py-1 ${className}`} {...props} />
}

export default Textarea
