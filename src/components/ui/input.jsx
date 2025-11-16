import React from 'react'

export const Input = ({ className = '', ...props }) => {
  return <input className={`border rounded-md px-2 py-1 ${className}`} {...props} />
}

export default Input
