import React, { useState, createContext, useContext, useEffect, useRef } from 'react'

const SelectContext = createContext(null)

export const Select = ({ children, value, onValueChange }) => {
  const [open, setOpen] = useState(false)
  const ctx = { value, onValueChange, open, setOpen }
  return <SelectContext.Provider value={ctx}>{children}</SelectContext.Provider>
}

export const SelectTrigger = React.forwardRef(function SelectTrigger({ className = '', children, placeholder }, ref) {
  const ctx = useContext(SelectContext)
  if (!ctx) return null
  const { value, setOpen } = ctx
  return (
    <button
      ref={ref}
      type="button"
      onClick={() => setOpen(o => !o)}
      className={`flex items-center justify-between border rounded-md px-3 py-2 text-sm bg-white ${className}`.trim()}
    >
      <span>{value || placeholder}</span>
    </button>
  )
})

export const SelectValue = ({ placeholder }) => {
  const ctx = useContext(SelectContext)
  if (!ctx) return null
  return <span>{ctx.value || placeholder}</span>
}

export const SelectContent = ({ children, className = '' }) => {
  const ctx = useContext(SelectContext)
  if (!ctx) return null
  const { open } = ctx
  return open ? <div className={`mt-2 bg-white border rounded-md shadow-sm ${className}`}>{children}</div> : null
}

export const SelectItem = ({ children, value }) => {
  const ctx = useContext(SelectContext)
  if (!ctx) return null
  const { onValueChange, setOpen } = ctx
  const handleClick = () => {
    onValueChange && onValueChange(value)
    setOpen(false)
  }
  return (
    <button type="button" onClick={handleClick} className="w-full text-left px-3 py-2 hover:bg-gray-50">
      {children}
    </button>
  )
}

export default Select
